"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  ArrowRight,
  User,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";

const LoginPage = () => {
  const [role, setRole] = useState("STUDENT");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Welcome back! Logging in as ${role}`);
      // In real app: router.push('/dashboard')
    }, 1500);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50/50 py-12 px-4">
      <Toaster position="top-center" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        {/* Logo/Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-3xl shadow-xl shadow-blue-600/20 mb-6">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">CGEC Portal</h1>
          <p className="text-gray-500 mt-2 text-lg">
            Secure Access for Students & Faculty
          </p>
        </div>

        {/* Role Switcher */}
        <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 flex mb-8">
          <button
            onClick={() => setRole("STUDENT")}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl font-bold transition-all ${
              role === "STUDENT"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            <User className="w-5 h-5" />
            <span>Student</span>
          </button>
          <button
            onClick={() => setRole("FACULTY")}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl font-bold transition-all ${
              role === "FACULTY"
                ? "bg-blue-900 text-white shadow-lg shadow-blue-900/20"
                : "text-gray-500 hover:text-blue-900"
            }`}
          >
            <ShieldCheck className="w-5 h-5" />
            <span>Faculty</span>
          </button>
        </div>

        {/* Form */}
        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  placeholder="name@cgec.org.in"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-600 font-bold hover:underline"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 disabled:bg-blue-300 group"
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-500">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-blue-600 font-bold hover:underline"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>

        {/* Support */}
        <p className="text-center mt-10 text-gray-400 text-sm">
          Protected by CGEC Security System. <br />
          Need help?{" "}
          <Link
            href="/contact"
            className="text-gray-600 hover:text-blue-600 underline"
          >
            Contact IT Support
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
