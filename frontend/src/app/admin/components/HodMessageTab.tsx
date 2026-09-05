"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  UserCheck,
  Edit,
  Trash2,
  UploadCloud,
  Loader2,
  X,
  Save,
  Quote,
  ExternalLink,
  Plus,
  CheckCircle2,
  AlertCircle,
  Building2,
  Camera,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { API_URL } from "@/lib/constants";

export interface HodMessageItem {
  id: string;
  department: string;
  name: string;
  designation: string;
  message: string;
  image?: string | null;
  imagePublicId?: string | null;
  updatedAt?: string;
}

const DEPARTMENTS = [
  { code: "CSE", name: "Computer Science & Engineering", slug: "cse" },
  { code: "ECE", name: "Electronics & Communication Engineering", slug: "ece" },
  { code: "EE", name: "Electrical Engineering", slug: "ee" },
  { code: "ME", name: "Mechanical Engineering", slug: "me" },
  { code: "CE", name: "Civil Engineering", slug: "ce" },
  { code: "BSH", name: "Basic Science & Humanities", slug: "bsh" },
];

interface HodMessageTabProps {
  adminToken: string | null;
}

export default function HodMessageTab({ adminToken }: HodMessageTabProps) {
  const [messages, setMessages] = useState<Record<string, HodMessageItem>>({});
  const [selectedDept, setSelectedDept] = useState("CSE");
  const [loading, setLoading] = useState(false);

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    department: "CSE",
    name: "",
    designation: "Head of the Department",
    message: "",
    image: "",
    imagePublicId: "",
  });

  const fetchHodMessages = useCallback(async () => {
    if (!adminToken) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/hod-message`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        const data: HodMessageItem[] = await res.json();
        const map: Record<string, HodMessageItem> = {};
        data.forEach((item) => {
          map[item.department.toUpperCase()] = item;
        });
        setMessages(map);
      }
    } catch {
      toast.error("Failed to load HOD messages");
    } finally {
      setLoading(false);
    }
  }, [adminToken]);

  useEffect(() => {
    fetchHodMessages();
  }, [fetchHodMessages]);

  const openCreateOrEditModal = (deptCode: string) => {
    const existing = messages[deptCode.toUpperCase()];
    if (existing) {
      setFormData({
        department: existing.department,
        name: existing.name,
        designation: existing.designation || "Head of the Department",
        message: existing.message,
        image: existing.image || "",
        imagePublicId: existing.imagePublicId || "",
      });
    } else {
      setFormData({
        department: deptCode,
        name: "",
        designation: "Head of the Department",
        message: "",
        image: "",
        imagePublicId: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !adminToken) return;

    setUploadingImage(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "hod");

    try {
      toast.loading("Uploading HOD photo to Cloudinary...", { id: "hod-upload" });
      const res = await fetch(`${API_URL}/admin/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${adminToken}` },
        body: fd,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setFormData((prev) => ({
          ...prev,
          image: data.url,
          imagePublicId: data.publicId || "",
        }));
        toast.success("Photo uploaded successfully!", { id: "hod-upload" });
      } else {
        toast.error(data.message || "Failed to upload photo", { id: "hod-upload" });
      }
    } catch {
      toast.error("Network error during photo upload", { id: "hod-upload" });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminToken) return;

    if (!formData.name.trim()) {
      toast.error("Please enter the HOD's name");
      return;
    }
    if (!formData.message.trim()) {
      toast.error("Please enter the HOD message");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/admin/hod-message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(`HOD Message for ${formData.department} saved successfully!`);
        setIsModalOpen(false);
        fetchHodMessages();
      } else {
        toast.error(data.message || "Failed to save HOD message");
      }
    } catch {
      toast.error("Network error while saving HOD message");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (deptCode: string) => {
    if (!adminToken) return;
    if (!confirm(`Are you sure you want to delete the HOD message for ${deptCode}?`)) {
      return;
    }

    try {
      toast.loading("Deleting HOD message...", { id: "delete-hod" });
      const res = await fetch(`${API_URL}/admin/hod-message/${deptCode}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(`HOD message for ${deptCode} deleted`, { id: "delete-hod" });
        fetchHodMessages();
      } else {
        toast.error(data.message || "Failed to delete HOD message", { id: "delete-hod" });
      }
    } catch {
      toast.error("Network error while deleting HOD message", { id: "delete-hod" });
    }
  };

  const activeDeptInfo = DEPARTMENTS.find((d) => d.code === selectedDept) || DEPARTMENTS[0];
  const currentMessage = messages[selectedDept.toUpperCase()];

  return (
    <div className="space-y-8">
      {/* Top Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Academic Leadership</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Department HOD Messages
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
            Manage the Head of Department (HOD) welcome messages and official photos displayed on each academic department portal.
          </p>
        </div>

        <button
          onClick={() => openCreateOrEditModal(selectedDept)}
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
        >
          {currentMessage ? <Edit className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span>{currentMessage ? `Edit ${selectedDept} HOD Message` : `Add ${selectedDept} HOD Message`}</span>
        </button>
      </div>

      {/* Department Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {DEPARTMENTS.map((dept) => {
          const isSelected = selectedDept === dept.code;
          const hasMessage = Boolean(messages[dept.code]);

          return (
            <button
              key={dept.code}
              onClick={() => setSelectedDept(dept.code)}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer border ${
                isSelected
                  ? "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/30 scale-102"
                  : "bg-slate-900/90 hover:bg-slate-800 text-slate-300 border-slate-800 hover:border-slate-700"
              }`}
            >
              <span>{dept.code}</span>
              <span
                className={`w-2 h-2 rounded-full ${
                  hasMessage ? "bg-emerald-400 shadow-sm shadow-emerald-400" : "bg-slate-600"
                }`}
                title={hasMessage ? "Message published" : "Not yet configured"}
              />
            </button>
          );
        })}
      </div>

      {/* Main Focus Card: Selected Department HOD Message */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-800 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-1">
              <Building2 className="w-4 h-4" />
              <span>Department of {activeDeptInfo.name}</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              HOD Message for {activeDeptInfo.code}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/academics/${activeDeptInfo.slug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
            >
              <span>View Public Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            {currentMessage && (
              <button
                onClick={() => handleDelete(activeDeptInfo.code)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 text-xs font-semibold border border-rose-500/30 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center gap-3 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            <p className="text-sm font-medium">Loading department details...</p>
          </div>
        ) : currentMessage ? (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* HOD Photo */}
            <div className="w-full sm:w-56 shrink-0 mx-auto lg:mx-0">
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-slate-800 border-2 border-slate-700/80 shadow-lg">
                {currentMessage.image ? (
                  <Image
                    src={currentMessage.image}
                    alt={currentMessage.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 gap-2 p-4 text-center">
                    <Camera className="w-10 h-10 text-slate-600" />
                    <span className="text-xs font-semibold">No photo uploaded</span>
                  </div>
                )}
              </div>
              <button
                onClick={() => openCreateOrEditModal(selectedDept)}
                className="mt-3 w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold border border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Change Photo</span>
              </button>
            </div>

            {/* HOD Details & Message */}
            <div className="flex-1 space-y-4">
              <div>
                <h4 className="text-2xl font-black text-white tracking-tight">
                  {currentMessage.name}
                </h4>
                <p className="text-blue-400 font-bold text-sm mt-0.5">
                  {currentMessage.designation}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Department of {activeDeptInfo.name} ({activeDeptInfo.code})
                </p>
              </div>

              {/* Message Box */}
              <div className="relative bg-slate-950/80 border border-slate-800 rounded-2xl p-6 shadow-inner">
                <Quote className="w-8 h-8 text-blue-500/30 absolute top-4 right-4 pointer-events-none" />
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line relative z-10 italic">
                  {currentMessage.message}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => openCreateOrEditModal(selectedDept)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Message Content</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-950/60 border border-dashed border-slate-800 rounded-2xl p-12 text-center space-y-4 max-w-lg mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto border border-blue-500/20">
              <UserCheck className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-white font-bold text-lg">
                No HOD Message Published for {activeDeptInfo.code}
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed">
                The public portal currently shows a placeholder. Add the HOD&apos;s photo, name, and welcome message to publish it immediately.
              </p>
            </div>
            <button
              onClick={() => openCreateOrEditModal(selectedDept)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Publish {activeDeptInfo.code} HOD Message</span>
            </button>
          </div>
        )}
      </div>

      {/* All Departments Overview Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span>All Departments Status Overview</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 font-semibold">
            {Object.keys(messages).length} / {DEPARTMENTS.length} Configured
          </span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {DEPARTMENTS.map((dept) => {
            const msg = messages[dept.code];
            const isSelected = selectedDept === dept.code;

            return (
              <div
                key={dept.code}
                onClick={() => setSelectedDept(dept.code)}
                className={`bg-slate-900 border rounded-2xl p-5 flex flex-col justify-between transition-all cursor-pointer ${
                  isSelected
                    ? "border-blue-500/80 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500/50"
                    : "border-slate-800 hover:border-slate-700 hover:bg-slate-850"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-white font-black text-xs">
                      {dept.code}
                    </span>
                    {msg ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Published</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                        <AlertCircle className="w-3 h-3" />
                        <span>Empty</span>
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-white mb-2 line-clamp-1">
                    {dept.name}
                  </h4>

                  {msg ? (
                    <div className="flex items-start gap-3 my-3">
                      <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-slate-800 shrink-0 border border-slate-700">
                        {msg.image ? (
                          <Image
                            src={msg.image}
                            alt={msg.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-500 text-[10px]">
                            N/A
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-200 truncate">{msg.name}</p>
                        <p className="text-[11px] text-blue-400 truncate">{msg.designation}</p>
                        <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 italic">
                          &ldquo;{msg.message}&rdquo;
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 my-4 italic">
                      No HOD message published for this department.
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-400">Click to focus</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openCreateOrEditModal(dept.code);
                    }}
                    className="text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Edit className="w-3 h-3" />
                    <span>{msg ? "Edit" : "Set"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal for Creating or Editing HOD Message */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white">
                  {messages[formData.department] ? "Edit" : "Set"} HOD Message
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Update the welcome message and photo for Department of {formData.department}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Department Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Department
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500"
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept.code} value={dept.code}>
                      {dept.code} — {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* HOD Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  HOD Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Debasis Das"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Designation */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Designation / Role
                </label>
                <input
                  type="text"
                  placeholder="e.g. Professor & Head of the Department"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Photo Upload Section */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  HOD Photo
                </label>

                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  {/* Photo Preview Thumbnail */}
                  <div className="relative w-24 aspect-[3/4] rounded-xl bg-slate-950 border border-slate-700 overflow-hidden shrink-0 flex items-center justify-center">
                    {formData.image ? (
                      <Image
                        src={formData.image}
                        alt="HOD Preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Camera className="w-8 h-8 text-slate-600" />
                    )}
                  </div>

                  <div className="flex-1 space-y-3 w-full">
                    <div className="flex items-center gap-3">
                      <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 hover:text-blue-300 border border-blue-500/30 font-bold text-xs cursor-pointer transition-colors">
                        {uploadingImage ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Uploading Photo...</span>
                          </>
                        ) : (
                          <>
                            <UploadCloud className="w-4 h-4" />
                            <span>Upload Photo from Device</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploadingImage}
                          className="hidden"
                        />
                      </label>

                      {formData.image && (
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, image: "", imagePublicId: "" })}
                          className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-semibold transition-colors"
                        >
                          Remove Photo
                        </button>
                      )}
                    </div>

                    <input
                      type="text"
                      placeholder="Or paste an image URL (https://...)"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* HOD Message Content */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    HOD Welcome Message *
                  </label>
                  <span className="text-[11px] text-slate-500">
                    {formData.message.length} characters
                  </span>
                </div>
                <textarea
                  rows={6}
                  required
                  placeholder="Write the HOD's welcome message, department vision, student mentorship philosophy, and academic goals..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white text-sm leading-relaxed focus:outline-none focus:border-blue-500 resize-y"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Tip: Line breaks and paragraphs are preserved when displayed on the department portal.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-sm font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || uploadingImage}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save HOD Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
