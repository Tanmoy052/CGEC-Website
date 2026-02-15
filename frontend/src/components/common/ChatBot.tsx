"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Hello! I'm CGEC Assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI Response (In real app, call your backend/AI API)
    setTimeout(() => {
      let botResponse =
        "I'm not sure about that. Please contact the college office at +91 03582-233040.";

      const lowerInput = input.toLowerCase();
      if (lowerInput.includes("admission")) {
        botResponse =
          "Admission for 2025 is starting soon. Keep an eye on the Notice Board for WBJEE counselling updates.";
      } else if (
        lowerInput.includes("departments") ||
        lowerInput.includes("courses")
      ) {
        botResponse =
          "CGEC offers B.Tech in CSE, ECE, EE, ME, and CE. Which department are you interested in?";
      } else if (lowerInput.includes("placement")) {
        botResponse =
          "Our T&P Cell is very active. Companies like TCS, Cognizant, and Wipro regularly visit our campus.";
      } else if (
        lowerInput.includes("location") ||
        lowerInput.includes("where")
      ) {
        botResponse =
          "We are located in Harinchawra, Ghughumari, Cooch Behar, West Bengal 736170.";
      }

      setMessages((prev) => [...prev, { role: "bot", content: botResponse }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 text-white rounded-full shadow-2xl shadow-blue-600/40 flex items-center justify-center z-50 group"
      >
        <MessageSquare className="w-8 h-8 group-hover:rotate-12 transition-transform" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-24 right-6 w-[400px] h-[550px] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden z-50"
          >
            {/* Header */}
            <div className="bg-blue-600 p-6 flex justify-between items-center">
              <div className="flex items-center space-x-3 text-white">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">CGEC Smart Assistant</h3>
                  <p className="text-xs text-blue-100">
                    Online | Powered by AI
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    "flex items-start space-x-2 max-w-[85%]",
                    msg.role === "user"
                      ? "ml-auto flex-row-reverse space-x-reverse"
                      : "",
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                      msg.role === "user"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-600",
                    )}
                  >
                    {msg.role === "user" ? (
                      <User className="w-5 h-5" />
                    ) : (
                      <Bot className="w-5 h-5" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "p-4 rounded-2xl text-sm leading-relaxed",
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : "bg-gray-100 text-gray-800 rounded-tl-none",
                    )}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex items-center space-x-2 text-gray-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-xs">Assistant is typing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about admission, departments..."
                  className="w-full pl-4 pr-12 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-sm"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 disabled:bg-gray-300 transition-all shadow-lg shadow-blue-600/20"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
