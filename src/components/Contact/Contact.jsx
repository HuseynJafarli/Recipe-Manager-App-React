import React, { useState } from "react";
import axios from "axios";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/messages", formData);
      setResponseMessage("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" }); 
    } catch (error) {
      console.error(error);
      setResponseMessage("Failed to send the message. Try again later.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-[calc(100vh-270px)] flex flex-col items-center">
      <header className="bg-blue-700 text-white py-4 w-full shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Contact Us</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 flex-grow">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Send a Message
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                id="floating_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_name"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Your Name
              </label>
            </div>
            {/* Email */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_email"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Your Email
              </label>
            </div>
            {/* Subject */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                id="floating_subject"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_subject"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Subject
              </label>
            </div>
            {/* Message */}
            <div className="relative z-0 w-full mb-5 group">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                id="floating_message"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                rows="4"
                required
              ></textarea>
              <label
                htmlFor="floating_message"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Your Message
              </label>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
            >
              Send Message
            </button>
          </form>
          {responseMessage && (
            <p className="mt-4 text-center text-sm text-gray-700">
              {responseMessage}
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
