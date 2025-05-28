import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import aboutImg from "../assets/about.jpg";
const About = () => {
  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <section className="px-4 py-16 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-black sm:text-5xl">
            About CodeCrew
          </h1>
          <p className="mt-4 text-lg text-gray-600">
          A Platform for Developers to Connect and Collaborate
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src={aboutImg}
              alt="Developers"
              className="rounded-xl shadow-lg"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4 text-yellow-500">
              Connect. Collaborate. Create.
            </h2>
            <p className="text-gray-700 text-lg mb-4">
              CodeCrew is a community-driven platform where developers from around the world come together to share ideas, collaborate on projects, and build meaningful connections. Whether you’re a frontend wizard, a backend genius, or just starting your journey, CodeCrew is the place for you.
            </p>

            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>🤝 Match with like-minded developers</li>
              <li>💡 Collaborate on real-world projects</li>
              <li>📚 Learn and grow together</li>
              <li>🚀 Build your network and career</li>
            </ul>

            <p className="mt-6 text-gray-600">
              We believe that innovation thrives in communities — and CodeCrew is your home to grow, connect, and launch ideas with passionate developers like you.
            </p>
          </div>
        </div>
      </section>  
      <Footer/>  
    </div>
    
  );
};

export default About;
