"use client";

import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

const ContactPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="bg-white pt-2 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Title */}
        <h1 className="text-[32px] font-normal text-[#005a8d] mb-4">
          Contact Us
        </h1>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Address */}
          <div className="flex flex-col space-y-2">
            <MapPin className="w-4 h-4 text-gray-800" />
            <h3 className="text-lg font-normal text-[#005a8d]">Address</h3>
            <div className="text-[15px] font-bold text-gray-900 leading-tight space-y-1">
              <p>Cooch Behar Government Engineering College</p>
              <p>Vill-Harinchowrah, P.O-Ghughumari</p>
              <p>Dist-Cooch Behar, West Bengal, PIN-736170</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex flex-col space-y-2">
            <Phone className="w-4 h-4 text-gray-800" />
            <h3 className="text-lg font-normal text-[#005a8d]">Phone</h3>
            <div className="text-[15px] font-bold text-gray-900 leading-tight space-y-1">
              <p>03582233041, 03582233044, 9732933357 (WhatsApp)</p>
              <p>Time 11.00 AM to 5.00 PM</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col space-y-2">
            <Mail className="w-4 h-4 text-gray-800" />
            <h3 className="text-lg font-normal text-[#005a8d]">Email</h3>
            <div className="text-[15px] font-bold text-gray-900 leading-tight">
              <p>principalofficecgec@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Section: Map and Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Google Map */}
          <div className="w-full aspect-[4/3] lg:aspect-auto lg:h-[500px] rounded shadow-sm overflow-hidden border border-gray-200">
            <iframe
              src="https://maps.google.com/maps?q=Cooch%20Behar%20Government%20Engineering%20College&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="CGEC Map"
            ></iframe>
          </div>

          {/* Contact Form */}
          <div className="bg-white">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-grow h-[1px] bg-gray-200"></div>
              <h3 className="px-6 text-[22px] font-normal text-gray-700">
                Contact By Email
              </h3>
              <div className="flex-grow h-[1px] bg-gray-200"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center">
                <label className="w-1/3 text-right text-gray-700 font-bold pr-6">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-2/3 px-3 py-2.5 border border-gray-300 rounded shadow-sm outline-none focus:border-blue-400 transition-all"
                  required
                />
              </div>

              <div className="flex items-center">
                <label className="w-1/3 text-right text-gray-700 font-bold pr-6">
                  Your E-mail
                </label>
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-2/3 px-3 py-2.5 border border-gray-300 rounded shadow-sm outline-none focus:border-blue-400 transition-all"
                  required
                />
              </div>

              <div className="flex items-center">
                <label className="w-1/3 text-right text-gray-700 font-bold pr-6">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Type Subject"
                  className="w-2/3 px-3 py-2.5 border border-gray-300 rounded shadow-sm outline-none focus:border-blue-400 transition-all"
                  required
                />
              </div>

              <div className="flex items-start">
                <label className="w-1/3 text-right text-gray-700 font-bold pr-6 pt-2">
                  Your message
                </label>
                <textarea
                  rows={4}
                  placeholder="Please enter your message here..."
                  className="w-2/3 px-3 py-2.5 border border-gray-300 rounded shadow-sm outline-none focus:border-blue-400 resize-none transition-all"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-2.5 bg-[#337ab7] hover:bg-[#286090] text-white rounded text-lg font-medium shadow-sm transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
