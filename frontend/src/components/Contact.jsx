import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Contact = () => {
  return (
    <div className="bg-gray-100 text-black min-h-screen">
      

      <section className="px-4 pt-10 pb-16 max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-black sm:text-5xl">
            Contact Us
          </h1>
          <p className="mt-3 text-lg text-gray-700">
            We’d love to hear from you! Reach out to our team for any questions, feedback, or collaboration opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Contact Form Box */}
          <form className="bg-white rounded-xl shadow-lg p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-800">Name</label>
              <input
                type="text"
                required
                className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800">Email</label>
              <input
                type="email"
                required
                className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800">Message</label>
              <textarea
                rows="5"
                required
                className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 text-black"
              ></textarea>
            </div>

            {/* <button
              type="submit"
              className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full transition-all duration-200"
            >
              Send Message
            </button> */}
            <a
  href="mailto:codecrewpvt@gmail.com"
  className="inline-block bg-yellow-300 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full transition-all duration-200"
>
  Send Message
</a>
          </form>

          {/* Contact Info Box */}
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-8 md:text-right text-black">
            <div>
              <h2 className="text-xl font-semibold">📧 Email</h2>
              <p>
                <a href="mailto:codecrewpvt@gmail.com" className="hover:underline">
                  codecrewpvt@gmail.com
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">📞 Phone</h2>
              <p>+91 7985642356</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">🏢 Address</h2>
              <p>
                CodeCrew HQ<br />
                Developer Lane, Tech City, India
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">💬 Social</h2>
              <div className="flex md:justify-end space-x-4 mt-2">
                <a href="#" className="text-blue-500 hover:text-blue-700">LinkedIn</a>
                <a href="#" className="text-blue-400 hover:text-blue-600">Twitter</a>
                <a href="#" className="text-pink-600 hover:text-pink-800">Instagram</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
