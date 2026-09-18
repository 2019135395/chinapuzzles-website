"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Instagram, Linkedin, Mail, Globe } from 'lucide-react';
import type { Metadata } from 'next';
import { useState } from "react";

// export const metadata: Metadata = {
//   title: "Contact Us",
//   description: "Get in touch with the ChinaPuzzles team. We'd love to hear from you with any questions, feedback, or collaboration ideas.",
// };

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("sent");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };


  const contacts = [
    {
      icon: <Instagram className="h-6 w-6 text-zinc-400" />,
      label: "Instagram",
      value: "@chinapuzzles",
      href: "#", // Replace with your Instagram URL
    },
    {
      icon: <Mail className="h-6 w-6 text-zinc-400" />,
      label: "Email",
      value: "info@chinapuzzles.com",
      href: "mailto:info@chinapuzzles.com",
    },
    {
      icon: <Linkedin className="h-6 w-6 text-zinc-400" />,
      label: "LinkedIn",
      value: "China Puzzles",
      href: "#", // Replace with your LinkedIn URL
    },
    {
      icon: <Globe className="h-6 w-6 text-zinc-400" />,
      label: "Website",
      value: "chinapuzzles.com",
      href: "https://chinapuzzles.com",
    },
  ];

  return (
    <MaxWidthWrapper className="mt-28 sm:mt-40 flex flex-col items-center pb-24">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl text-center font-montserrat">
          Contact Us
        </h1>
        <p className="mt-4 text-lg text-zinc-400 text-center">
          We'd love to hear from you. Here's how you can reach us.
        </p>
        <div className="mt-12 bg-zinc-800/50 rounded-2xl p-8 space-y-6">
          {contacts.map((contact, index) => (
            <div key={index} className="flex items-center">
              <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-lg bg-zinc-700">
                {contact.icon}
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-zinc-400">{contact.label}</p>
                <a 
                  href={contact.href}
                  className="text-lg font-semibold text-white hover:text-blue-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contact.value}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white text-center font-montserrat">Leave a Message</h2>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-300">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full bg-zinc-700 border-zinc-600 rounded-md shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full bg-zinc-700 border-zinc-600 rounded-md shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-zinc-300">Message</label>
              <textarea
                name="message"
                id="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                className="mt-1 block w-full bg-zinc-700 border-zinc-600 rounded-md shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-zinc-500"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </div>
            {status === 'sent' && (
              <p className="text-center text-green-400">Message sent successfully!</p>
            )}
            {status === 'error' && (
              <p className="text-center text-red-400">Something went wrong. Please try again later.</p>
            )}
          </form>
        </div>

      </div>
    </MaxWidthWrapper>
  );
};

export default ContactPage;
