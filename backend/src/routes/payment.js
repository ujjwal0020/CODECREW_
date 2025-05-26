const express = require('express');
const { userAuth } = require('../middlewares/auth');
const paymentRouter = express.Router();
const razorpayInstance = require('../utils/razorpay');
const Payment = require('../models/payment');
const User = require('../models/user');
const { membershipAmount } = require('../utils/constants');
const {validateWebhookSignature} = require('razorpay/dist/utils/razorpay-utils');

paymentRouter.post('/payment/create', userAuth, async (req,res) => {

    try {
        const order = await razorpayInstance.orders.create({
            amount: membershipAmount[req.body.membershipType] * 100, 
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
            notes: {
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                emailId: req.user.emailId,
                membershipType : req.body.membershipType,
            }
        })

        //Save it in the db
        console.log({order});

        const payment = new Payment ( {
            userId: req.user._id,
            orderId: order.id,
            status: order.status,
            amount: order.amount / 100, // Convert back to rupees
            currency: order.currency,
            receipt: order.receipt,
            notes: order.notes,
        })

        const savedPayment = await payment.save();

        //Return back my order details to frontend
        res.json({...savedPayment.toJSON(), keyId:process.env.RAZORPAY_KEY_ID});
        
    } catch (err) {
        return res.status(500).json({ msg : err.message});
    }
})

paymentRouter.post('/payment/webhook',  async (req,res) => {

    try {
     
        const webhookSignature = req.get("X-Razorpay-Signature");
    
       const isWebhookValid = validateWebhookSignature(JSON.stringify(req.body), 
        webhookSignature, 
        process.env.RAZORPAY_WEBHOOK_SECRET
    );

    if(!isWebhookValid){
        return res.status(400).json({ msg: "Invalid webhook signature" });
    }

    //Update my payment status in the db
    const paymentDetails = req.body.payload.payment.entity;

    const payment = await Payment.findOne({orderId : paymentDetails.order_id});
    payment.status = paymentDetails.status;
    await payment.save();

    const user = await User.findOne({_id: payment.userId});
    user.isPremium = true;
    user.membershipType = payment.notes.membershipType;
    await user.save();
        
        return res.status(200).json({ msg: "Webhook received successfully" });

    } catch (err) {
        return res.status(500).json({ msg : err.message});
    }
})

paymentRouter.get("/premium/verify" ,userAuth, async (req,res) => {
    const user = req.user.toJSON();
    if(user.isPremium) {
        return res.json({
            isPremium: true,
            membershipType: user.membershipType,
            message: "User is a premium member"
        });
    }
    else {
        return res.json({
            isPremium: false,
            message: "User is not a premium member"
        });
    }
})

module.exports = paymentRouter;