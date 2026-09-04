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
  ExternalLink,
  Building2,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { API_URL } from "@/lib/constants";

interface Recruiter {
  id: string;
  name: string;
  logo: string;
  logoPublicId?: string | null;
  website?: string | null;
  order: number;
}

interface RecruitersTabProps {
  adminToken: string | null;
}

export default function RecruitersTab({ adminToken }: RecruitersTabProps) {
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecruiter, setEditingRecruiter] = useState<Recruiter | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    logoPublicId: "",
    website: "",
    order: 0,
  });

  const fetchRecruiters = useCallback(async () => {
    if (!adminToken) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/recruiters`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setRecruiters(data);
      }
    } catch {
      toast.error("Failed to load recruiters");
    } finally {
      setLoading(false);
    }
  }, [adminToken]);

  useEffect(() => {
    fetchRecruiters();
  }, [fetchRecruiters]);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !adminToken) return;

    setUploadingLogo(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "recruiters");

    try {
      toast.loading("Uploading logo to Cloudinary...", { id: "logo-upload" });
      const res = await fetch(`${API_URL}/admin/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${adminToken}` },
        body: fd,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setFormData((prev) => ({
          ...prev,
          logo: data.url,
          logoPublicId: data.publicId || "",
        }));
        toast.success("Logo uploaded successfully!", { id: "logo-upload" });
      } else {
        toast.error(data.message || "Upload failed", { id: "logo-upload" });
      }
    } catch {
      toast.error("Network error during logo upload", { id: "logo-upload" });
    } finally {
      setUploadingLogo(false);
    }
  };

  const openAddModal = () => {
    setEditingRecruiter(null);
    setFormData({
      name: "",
      logo: "",
      logoPublicId: "",
      website: "",
      order: recruiters.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (rec: Recruiter) => {
    setEditingRecruiter(rec);
    setFormData({
      name: rec.name,
      logo: rec.logo,
      logoPublicId: rec.logoPublicId || "",
      website: rec.website || "",
      order: rec.order,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminToken) return;
    if (!formData.name.trim() || !formData.logo.trim()) {
      toast.error("Company Name and Logo are required");
      return;
    }

    setSubmitting(true);
    try {
      const url = editingRecruiter
        ? `${API_URL}/admin/recruiters/${editingRecruiter.id}`
        : `${API_URL}/admin/recruiters`;
      const method = editingRecruiter ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(editingRecruiter ? "Recruiter updated!" : "Recruiter added!");
        setIsModalOpen(false);
        fetchRecruiters();
      } else {
        const err = await res.json();
        toast.error(err.message || "Failed to save recruiter");
      }
    } catch {
      toast.error("Network error while saving recruiter");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!adminToken) return;
    if (!confirm(`Delete "${name}" from recruiters?`)) return;

    try {
      const res = await fetch(`${API_URL}/admin/recruiters/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        toast.success("Recruiter removed");
        setRecruiters((prev) => prev.filter((i) => i.id !== id));
      } else {
        toast.error("Failed to delete recruiter");
      }
    } catch {
      toast.error("Error deleting recruiter");
    }
  };

  const filteredRecruiters = recruiters.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-bold text-white">Our Recruiters Showcase</h2>
            </div>
            <p className="text-slate-400 text-sm">
              Manage corporate recruiters and partner companies featured on the homepage and placement portal.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Recruiter</span>
          </button>
        </div>
      </div>

      {/* Filter and Count */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <span className="font-bold text-white text-base">Partner Companies</span>
          <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-500/30">
            {recruiters.length} Companies
          </span>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search company name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center p-12 text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-3" />
          <p className="text-sm">Loading recruiters...</p>
        </div>
      ) : filteredRecruiters.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 shadow-xl">
          <Building2 className="w-12 h-12 mx-auto text-slate-600 mb-3" />
          <p className="text-base font-semibold text-white mb-1">No Recruiters Added</p>
          <p className="text-sm mb-4">Add partner companies to display their logos on the website.</p>
          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-500 cursor-pointer inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add First Recruiter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {filteredRecruiters.map((rec) => (
            <div
              key={rec.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all group"
            >
              <div>
                <div className="relative w-full h-20 bg-white rounded-xl p-3 flex items-center justify-center mb-3 overflow-hidden shadow-inner">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={rec.logo}
                    alt={rec.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="text-center">
                  <h4 className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors truncate">
                    {rec.name}
                  </h4>
                  {rec.website && (
                    <a
                      href={rec.website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-blue-400 mt-0.5 truncate max-w-full"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span className="truncate">Visit</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-800">
                <span className="text-xs text-slate-500 font-semibold">#{rec.order}</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(rec)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                    title="Edit"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(rec.id, rec.name)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-900/40 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-bold text-white">
                  {editingRecruiter ? "Edit Recruiter" : "Add Recruiter"}
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
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tata Consultancy Services"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Company Website URL
                </label>
                <input
                  type="url"
                  placeholder="https://www.tcs.com"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Company Logo (Upload to Cloudinary or URL) *
                </label>
                <div className="space-y-2">
                  <label className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-dashed border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer transition-colors text-sm">
                    {uploadingLogo ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                        <span>Uploading logo...</span>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="w-4 h-4 text-blue-400" />
                        <span>Upload Logo File to Cloudinary</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                      disabled={uploadingLogo}
                    />
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="https://... or /img/company_logo/..."
                    value={formData.logo}
                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
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
                  disabled={submitting || uploadingLogo}
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-600/30 cursor-pointer"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>{editingRecruiter ? "Update Recruiter" : "Save Recruiter"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
