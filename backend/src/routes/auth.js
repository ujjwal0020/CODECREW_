// const express = require("express");
// const User = require("../models/user");
// const { validateSignUpData } = require("../utils/validation");
// const bcrypt = require("bcrypt");

// const authRouter = express.Router();

// //SignUp Api
// authRouter.post("/signup", async (req,res) => {
//     try{
//     //Validating the data
//     validateSignUpData(req);

//     const {firstName, lastName, emailId, password} = req.body;

//     //Encrypting the password
//     const passwordHash = await bcrypt.hash(password, 10);

//     //Creating a new instance of User model
//     const user = new User({
//         firstName,
//         lastName,
//         emailId,
//         password: passwordHash
//     });
//     //Saving the user to the database
//     await user.save();
//     res.send("User added successfully")
//     }
//     catch(err) {
//         res.status(400).send("ERROR :  " + err.message);
//     }   
// });

// //Login Api
// authRouter.post("/login", async (req,res) => {
//     const {emailId, password} = req.body;

//     try{
//         const user = await User.findOne({emailId : emailId});
//         if(!user){
//             throw new Error("Invalid emailId");
//         } 
//         const isPasswordValid = await user.validatePassword(password);
//         if(!isPasswordValid){
//             throw new Error("Password is incorrect");
//         } else {
//             const token = await user.getJWT();
//             res.cookie("token", token,{expires: new Date(Date.now() + 1000*60*60*24*7),
//             });
//             res.send("Login successful");
//         }
//     } catch(err){
//         res.status(400).send("ERROR : " + err.message);

//     }
// });

// //Logout API
// authRouter.post("/logout", async(req,res) => {
//     res.cookie("token", null, {expires: new Date(Date.now())});
//     res.send("Logged out successfully");
// });

// module.exports = authRouter;

const express = require("express");
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

// ✅ SignUp API
authRouter.post("/signup", async (req, res) => {
  try {
    // Validate input
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create and save new user
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.status(201).send("User added successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// ✅ Login API
authRouter.post("/login", async (req, res) => {
  const { emailId, password } = req.body;

  try {
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid emailId");
    }

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error("Password is incorrect");
    }

    const token = await user.getJWT();

    // ✅ Set cookie securely for cross-origin (Render frontend + backend)
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,           // important on HTTPS (Render uses HTTPS)
      sameSite: "None",       // must be 'None' for cross-origin
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
    });

    res.status(200).send("Login successful");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// ✅ Logout API
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    expires: new Date(Date.now()),
  });
  res.send("Logged out successfully");
});

module.exports = authRouter;
