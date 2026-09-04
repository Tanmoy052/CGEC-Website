"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  FileText,
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  UploadCloud,
  Loader2,
  X,
  Save,
  MessageCircle,
  GraduationCap,
  Calendar,
  Edit3,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { API_URL } from "@/lib/constants";

interface AdmissionItem {
  id: string;
  year: string;
  category: "NOTICE" | "DOCUMENT";
  title: string;
  fileUrl: string;
  filePublicId?: string | null;
  order: number;
}

interface AdmissionTabProps {
  adminToken: string | null;
  onYearChange?: (newYear: string) => void;
}

export default function AdmissionTab({ adminToken, onYearChange }: AdmissionTabProps) {
  const [items, setItems] = useState<AdmissionItem[]>([]);
  const [activeYear, setActiveYear] = useState("2025");
  const [availableYears, setAvailableYears] = useState<string[]>(["2025"]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<"ALL" | "NOTICE" | "DOCUMENT">("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Year Change Modal State
  const [isYearModalOpen, setIsYearModalOpen] = useState(false);
  const [newYearInput, setNewYearInput] = useState("");
  const [migrateItemsCheck, setMigrateItemsCheck] = useState(true);
  const [updatingYear, setUpdatingYear] = useState(false);

  // Modal State for Notice/Document Item
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdmissionItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);

  const [formData, setFormData] = useState({
    year: "2025",
    category: "NOTICE" as "NOTICE" | "DOCUMENT",
    title: "",
    fileUrl: "",
    filePublicId: "",
    order: 0,
  });

  // Config Form State
  const [configForm, setConfigForm] = useState({
    whatsappLink: "",
    contactPhone: "",
    contactEmail: "",
    officerName: "",
    officerRole: "",
    officerDesignation: "",
  });
  const [savingConfig, setSavingConfig] = useState(false);

  const fetchAdmissionData = useCallback(async (yearToFetch?: string) => {
    if (!adminToken) return;
    setLoading(true);
    try {
      const qYear = yearToFetch || activeYear;
      const res = await fetch(`${API_URL}/admin/admission?year=${qYear}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
        if (data.activeYear) {
          setActiveYear(data.activeYear);
          onYearChange?.(data.activeYear);
        }
        if (Array.isArray(data.availableYears)) {
          setAvailableYears(data.availableYears);
        }
        if (data.config) {
          setConfigForm({
            whatsappLink: data.config.whatsappLink || "",
            contactPhone: data.config.contactPhone || "",
            contactEmail: data.config.contactEmail || "",
            officerName: data.config.officerName || "",
            officerRole: data.config.officerRole || "",
            officerDesignation: data.config.officerDesignation || "",
          });
        }
      }
    } catch {
      toast.error("Failed to load admission details");
    } finally {
      setLoading(false);
    }
  }, [adminToken, activeYear, onYearChange]);

  useEffect(() => {
    fetchAdmissionData();
  }, [fetchAdmissionData]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !adminToken) return;

    setUploadingPdf(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "admission_2025");

    try {
      toast.loading("Uploading PDF to Cloudinary...", { id: "pdf-upload" });
      const res = await fetch(`${API_URL}/admin/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${adminToken}` },
        body: fd,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setFormData((prev) => ({
          ...prev,
          fileUrl: data.url,
          filePublicId: data.publicId || "",
        }));
        toast.success("PDF uploaded successfully!", { id: "pdf-upload" });
      } else {
        toast.error(data.message || "Upload failed", { id: "pdf-upload" });
      }
    } catch {
      toast.error("Network error uploading PDF", { id: "pdf-upload" });
    } finally {
      setUploadingPdf(false);
    }
  };

  const openAddModal = (cat: "NOTICE" | "DOCUMENT") => {
    setEditingItem(null);
    setFormData({
      year: activeYear,
      category: cat,
      title: "",
      fileUrl: "",
      filePublicId: "",
      order: items.filter((i) => i.category === cat).length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: AdmissionItem) => {
    setEditingItem(item);
    setFormData({
      year: item.year,
      category: item.category,
      title: item.title,
      fileUrl: item.fileUrl,
      filePublicId: item.filePublicId || "",
      order: item.order,
    });
    setIsModalOpen(true);
  };

  const handleUpdateYear = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminToken || !newYearInput.trim()) return;

    setUpdatingYear(true);
    try {
      const res = await fetch(`${API_URL}/admin/admission/year`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          currentYear: activeYear,
          newYear: newYearInput.trim(),
          migrateItems: migrateItemsCheck,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        const updatedYear = data.activeYear || newYearInput.trim();
        toast.success(data.message || `Admission year updated to ${updatedYear}!`);
        setActiveYear(updatedYear);
        onYearChange?.(updatedYear);
        setIsYearModalOpen(false);
        fetchAdmissionData(updatedYear);
      } else {
        toast.error(data.message || "Failed to update admission year");
      }
    } catch {
      toast.error("Network error while updating admission year");
    } finally {
      setUpdatingYear(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminToken) return;
    if (!formData.title.trim() || !formData.fileUrl.trim()) {
      toast.error("Title and PDF link/file are required");
      return;
    }

    setSubmitting(true);
    try {
      const url = editingItem
        ? `${API_URL}/admin/admission/items/${editingItem.id}`
        : `${API_URL}/admin/admission/items`;
      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          ...formData,
          year: formData.year || activeYear,
        }),
      });

      if (res.ok) {
        toast.success(editingItem ? "Item updated successfully!" : "Item added successfully!");
        setIsModalOpen(false);
        fetchAdmissionData();
      } else {
        const err = await res.json();
        toast.error(err.message || "Failed to save item");
      }
    } catch {
      toast.error("Network error while saving item");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!adminToken) return;
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;

    try {
      const res = await fetch(`${API_URL}/admin/admission/items/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        toast.success("Deleted successfully");
        setItems((prev) => prev.filter((i) => i.id !== id));
      } else {
        toast.error("Failed to delete");
      }
    } catch {
      toast.error("Error deleting item");
    }
  };

  const handleConfigSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminToken) return;

    setSavingConfig(true);
    try {
      const res = await fetch(`${API_URL}/admin/admission/config`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ year: activeYear, ...configForm }),
      });

      if (res.ok) {
        toast.success("Admission contact configuration updated!");
      } else {
        toast.error("Failed to update configuration");
      }
    } catch {
      toast.error("Network error saving configuration");
    } finally {
      setSavingConfig(false);
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesCategory = activeCategory === "ALL" || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const noticesCount = items.filter((i) => i.category === "NOTICE").length;
  const docsCount = items.filter((i) => i.category === "DOCUMENT").length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Admission Module
              </span>
              <button
                onClick={() => {
                  setNewYearInput(activeYear);
                  setIsYearModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 text-xs font-bold transition-all hover:scale-105 cursor-pointer shadow-sm"
                title="Click to edit/change admission academic year"
              >
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                <span>Academic Year: {activeYear}</span>
                <Edit3 className="w-3 h-3 text-blue-300 ml-0.5" />
              </button>

              {availableYears.length > 1 && (
                <div className="flex items-center gap-1 text-xs text-slate-400 ml-2">
                  <span className="text-[11px]">View Year:</span>
                  <select
                    value={activeYear}
                    onChange={(e) => {
                      const sel = e.target.value;
                      setActiveYear(sel);
                      onYearChange?.(sel);
                      fetchAdmissionData(sel);
                    }}
                    className="bg-slate-950 border border-slate-700 text-white rounded-lg px-2 py-0.5 text-xs focus:outline-none focus:border-blue-500 font-bold"
                  >
                    {availableYears.map((y) => (
                      <option key={y} value={y}>
                        {y} {y === activeYear ? "(Active)" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-blue-400 shrink-0" />
              <h2 className="text-xl font-bold text-white">Admission {activeYear} Portal Control</h2>
            </div>
            <p className="text-slate-400 text-sm mt-0.5">
              Manage all official notices, admission documents, forms, and candidate contact info for {activeYear}.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => {
                setNewYearInput(activeYear);
                setIsYearModalOpen(true);
              }}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-300 font-semibold text-sm border border-slate-700 shadow-md transition-all cursor-pointer hover:border-blue-500/40"
              title="Change the active admission year (e.g. 2026, 2027)"
            >
              <Calendar className="w-4 h-4 text-blue-400" />
              <span>Change Year ({activeYear})</span>
            </button>
            <button
              onClick={() => openAddModal("NOTICE")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Notice</span>
            </button>
            <button
              onClick={() => openAddModal("DOCUMENT")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Document / Form</span>
            </button>
          </div>
        </div>

        {/* Quick Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-6 border-t border-slate-800">
          <button
            onClick={() => setActiveCategory("ALL")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === "ALL"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "bg-slate-800 text-slate-300 hover:text-white"
            }`}
          >
            All Items ({items.length})
          </button>
          <button
            onClick={() => setActiveCategory("NOTICE")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === "NOTICE"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "bg-slate-800 text-slate-300 hover:text-white"
            }`}
          >
            Notices ({noticesCount})
          </button>
          <button
            onClick={() => setActiveCategory("DOCUMENT")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === "DOCUMENT"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "bg-slate-800 text-slate-300 hover:text-white"
            }`}
          >
            Documents & Forms ({docsCount})
          </button>
        </div>
      </div>

      {/* Items Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            <span>Admission Documents & Notices Table</span>
          </h3>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by subject or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          {loading ? (
            <div className="flex flex-col items-center justify-center p-12 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-3" />
              <p className="text-sm">Loading admission items...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <FileText className="w-12 h-12 mx-auto text-slate-600 mb-3" />
              <p className="text-base font-semibold text-white mb-1">No items found</p>
              <p className="text-sm">Add notices or documents to display them on the live Admission page.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-800/80 border-b border-slate-700 text-slate-300 font-semibold">
                    <th className="py-3.5 px-4 w-16 text-center">#</th>
                    <th className="py-3.5 px-4 w-32">Type</th>
                    <th className="py-3.5 px-4">Subject / Title</th>
                    <th className="py-3.5 px-4 w-40">File / Download</th>
                    <th className="py-3.5 px-4 text-right w-24">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {filteredItems.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 text-center text-slate-400 font-medium">
                        {item.order || idx + 1}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            item.category === "NOTICE"
                              ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                              : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          }`}
                        >
                          {item.category === "NOTICE" ? "Notice" : "Document"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-white">
                        {item.title}
                      </td>
                      <td className="py-3.5 px-4">
                        <a
                          href={item.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-semibold hover:underline"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Download</span>
                        </a>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(item)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id, item.title)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-900/40 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Admission Contact & WhatsApp Configuration Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-emerald-400" />
            <span>Admission WhatsApp Group & Assistance Contact Details</span>
          </h3>
          <p className="text-slate-400 text-sm mt-1">
            These details appear at the top and bottom banner of the public Admission 2025 page.
          </p>
        </div>

        <form onSubmit={handleConfigSave} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              WhatsApp Group Invite Link
            </label>
            <input
              type="text"
              placeholder="https://chat.whatsapp.com/..."
              value={configForm.whatsappLink}
              onChange={(e) => setConfigForm({ ...configForm, whatsappLink: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Contact Phone Number
            </label>
            <input
              type="text"
              placeholder="e.g. 9475445190"
              value={configForm.contactPhone}
              onChange={(e) => setConfigForm({ ...configForm, contactPhone: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Contact Email ID
            </label>
            <input
              type="email"
              placeholder="e.g. admission@cgec.org.in"
              value={configForm.contactEmail}
              onChange={(e) => setConfigForm({ ...configForm, contactEmail: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              In-Charge Officer Name
            </label>
            <input
              type="text"
              placeholder="e.g. Dr. Sushovan Chatterjee"
              value={configForm.officerName}
              onChange={(e) => setConfigForm({ ...configForm, officerName: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Officer Role / Designation
            </label>
            <input
              type="text"
              placeholder="e.g. PI Admin, Admission (2025)"
              value={configForm.officerRole}
              onChange={(e) => setConfigForm({ ...configForm, officerRole: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="md:col-span-2 flex justify-end pt-3">
            <button
              type="submit"
              disabled={savingConfig}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-sm shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
            >
              {savingConfig ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Contact Info</span>
            </button>
          </div>
        </form>
      </div>

      {/* Item Modal (Add/Edit) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-bold text-white">
                  {editingItem ? "Edit Admission Item" : "Add Admission Item"}
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
                  Item Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as "NOTICE" | "DOCUMENT" })}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="NOTICE">Admission Notice</option>
                  <option value="DOCUMENT">Admission Document / Form</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Subject / Document Title *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="e.g. Reporting Notice for 1st year student 2025"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Upload PDF to Cloudinary OR Paste URL *
                </label>
                <div className="space-y-2">
                  <label className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-dashed border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer transition-colors text-sm">
                    {uploadingPdf ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                        <span>Uploading file...</span>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="w-4 h-4 text-blue-400" />
                        <span>Choose PDF File to Upload</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={uploadingPdf}
                    />
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="/admission/2025/filename.pdf or https://res.cloudinary.com/..."
                    value={formData.fileUrl}
                    onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
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
                  disabled={submitting || uploadingPdf}
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-600/30 cursor-pointer"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>{editingItem ? "Update Item" : "Save Item"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Admission Academic Year Modal */}
      {isYearModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-scaleUp">
            <div className="flex items-center justify-between p-5 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-white text-base">Edit Admission Academic Year</h3>
              </div>
              <button
                onClick={() => setIsYearModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateYear} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Current Active Year
                </label>
                <div className="px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-300 font-mono flex items-center justify-between">
                  <span>{activeYear}</span>
                  <span className="text-[11px] font-sans text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Active
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  New Academic Year *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2026 or 2027"
                  value={newYearInput}
                  onChange={(e) => setNewYearInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 font-bold"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Updates sidebar tab (&quot;Admission {newYearInput.trim() || activeYear}&quot;), portal titles, and website navigation.
                </p>
              </div>

              <div className="flex items-start gap-2.5 pt-2">
                <input
                  type="checkbox"
                  id="migrate-items"
                  checked={migrateItemsCheck}
                  onChange={(e) => setMigrateItemsCheck(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
                />
                <label htmlFor="migrate-items" className="text-xs text-slate-300 cursor-pointer select-none leading-relaxed">
                  Carry over existing admission documents and notices to the new academic year ({newYearInput.trim() || "new year"})
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsYearModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updatingYear || !newYearInput.trim()}
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-600/30 cursor-pointer"
                >
                  {updatingYear ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>Save &amp; Update Year</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
