"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  UploadCloud,
  Loader2,
  X,
  Save,
  Quote,
  Award,
} from "lucide-react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { API_URL } from "@/lib/constants";

interface LeaderMessage {
  id: string;
  name: string;
  role: string;
  dept?: string | null;
  message: string;
  image: string;
  imagePublicId?: string | null;
  order: number;
}

interface LeadershipTabProps {
  adminToken: string | null;
}

export default function LeadershipTab({ adminToken }: LeadershipTabProps) {
  const [leaders, setLeaders] = useState<LeaderMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLeader, setEditingLeader] = useState<LeaderMessage | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    dept: "",
    message: "",
    image: "",
    imagePublicId: "",
    order: 0,
  });

  const fetchLeaders = useCallback(async () => {
    if (!adminToken) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/leadership`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setLeaders(data);
      }
    } catch {
      toast.error("Failed to load leadership messages");
    } finally {
      setLoading(false);
    }
  }, [adminToken]);

  useEffect(() => {
    fetchLeaders();
  }, [fetchLeaders]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !adminToken) return;

    setUploadingImage(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "leadership");

    try {
      toast.loading("Uploading photo to Cloudinary...", { id: "photo-upload" });
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
        toast.success("Photo uploaded successfully!", { id: "photo-upload" });
      } else {
        toast.error(data.message || "Upload failed", { id: "photo-upload" });
      }
    } catch {
      toast.error("Network error during photo upload", { id: "photo-upload" });
    } finally {
      setUploadingImage(false);
    }
  };

  const openAddModal = () => {
    setEditingLeader(null);
    setFormData({
      name: "",
      role: "",
      dept: "",
      message: "",
      image: "",
      imagePublicId: "",
      order: leaders.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (leader: LeaderMessage) => {
    setEditingLeader(leader);
    setFormData({
      name: leader.name,
      role: leader.role,
      dept: leader.dept || "",
      message: leader.message,
      image: leader.image,
      imagePublicId: leader.imagePublicId || "",
      order: leader.order,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminToken) return;
    if (!formData.name.trim() || !formData.role.trim() || !formData.message.trim() || !formData.image.trim()) {
      toast.error("Name, Role, Message and Photo are required");
      return;
    }

    setSubmitting(true);
    try {
      const url = editingLeader
        ? `${API_URL}/admin/leadership/${editingLeader.id}`
        : `${API_URL}/admin/leadership`;
      const method = editingLeader ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(editingLeader ? "Leader message updated!" : "Leader message added!");
        setIsModalOpen(false);
        fetchLeaders();
      } else {
        const err = await res.json();
        toast.error(err.message || "Failed to save message");
      }
    } catch {
      toast.error("Network error while saving");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!adminToken) return;
    if (!confirm(`Delete message from "${name}"?`)) return;

    try {
      const res = await fetch(`${API_URL}/admin/leadership/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        toast.success("Leader message deleted");
        setLeaders((prev) => prev.filter((i) => i.id !== id));
      } else {
        toast.error("Failed to delete message");
      }
    } catch {
      toast.error("Error deleting leader message");
    }
  };

  const filteredLeaders = leaders.filter((l) => {
    const q = searchQuery.toLowerCase();
    return (
      l.name.toLowerCase().includes(q) ||
      l.role.toLowerCase().includes(q) ||
      (l.dept && l.dept.toLowerCase().includes(q)) ||
      l.message.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-bold text-white">Messages From Our Leadership</h2>
            </div>
            <p className="text-slate-400 text-sm">
              Manage the leadership carousel cards shown on the homepage (Principal, HODs, and faculty leadership).
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Leader Message</span>
          </button>
        </div>
      </div>

      {/* Filter and Count */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <span className="font-bold text-white text-base">Active Leaders</span>
          <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-500/30">
            {leaders.length} Cards
          </span>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search leader by name, role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Grid of Cards */}
      {loading ? (
        <div className="flex flex-col items-center justify-center p-12 text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-3" />
          <p className="text-sm">Loading leadership messages...</p>
        </div>
      ) : filteredLeaders.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 shadow-xl">
          <Award className="w-12 h-12 mx-auto text-slate-600 mb-3" />
          <p className="text-base font-semibold text-white mb-1">No Leaders Found</p>
          <p className="text-sm mb-4">Add leader messages to display them on the homepage carousel.</p>
          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-500 cursor-pointer inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add First Leader
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLeaders.map((leader) => (
            <div
              key={leader.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-blue-500/30 bg-slate-800 flex-shrink-0">
                      <Image
                        src={leader.image}
                        alt={leader.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base group-hover:text-blue-400 transition-colors">
                        {leader.name}
                      </h4>
                      <p className="text-xs text-blue-300 font-medium">{leader.role}</p>
                      {leader.dept && (
                        <p className="text-xs text-slate-400">{leader.dept}</p>
                      )}
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-xs font-semibold">
                    #{leader.order}
                  </span>
                </div>

                <div className="relative bg-slate-800/50 rounded-xl p-3 mb-4 border border-slate-800">
                  <Quote className="w-4 h-4 text-slate-600 mb-1" />
                  <p className="text-xs text-slate-300 leading-relaxed italic line-clamp-4">
                    &quot;{leader.message}&quot;
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  onClick={() => openEditModal(leader)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 hover:text-blue-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(leader.id, leader.name)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-red-900/40 text-red-400 hover:text-red-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-bold text-white">
                  {editingLeader ? "Edit Leader Message" : "Add Leader Message"}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Leader Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Sushovan Chatterjee"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Role / Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Principal & Associate Professor"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Department
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mechanical Engineering"
                    value={formData.dept}
                    onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Photo (Upload to Cloudinary or Paste URL) *
                </label>
                <div className="space-y-2">
                  <label className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-dashed border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer transition-colors text-sm">
                    {uploadingImage ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                        <span>Uploading photo...</span>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="w-4 h-4 text-blue-400" />
                        <span>Upload Photo to Cloudinary</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="/img/Faculty/... or https://res.cloudinary.com/..."
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Message / Quote *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Enter the leader's inspiring message or vision..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Display Order
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || uploadingImage}
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-600/30 cursor-pointer"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>{editingLeader ? "Update Leader" : "Save Leader"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
