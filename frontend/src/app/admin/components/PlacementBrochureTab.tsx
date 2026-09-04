"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  FileText,
  Plus,
  Search,
  Edit,
  Trash2,
  UploadCloud,
  Loader2,
  X,
  Save,
  ExternalLink,
  CheckCircle2,
  FileCheck,
  FileType,
  FileSpreadsheet,
  FileImage,
  Presentation,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { API_URL } from "@/lib/constants";

export interface PlacementBrochure {
  id: string;
  title: string;
  description?: string | null;
  academicYear?: string | null;
  fileUrl: string;
  filePublicId?: string | null;
  fileType?: string | null;
  fileName?: string | null;
  fileSize?: string | null;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface PlacementBrochureTabProps {
  adminToken: string | null;
}

export default function PlacementBrochureTab({ adminToken }: PlacementBrochureTabProps) {
  const [brochures, setBrochures] = useState<PlacementBrochure[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrochure, setEditingBrochure] = useState<PlacementBrochure | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    academicYear: "2025-2026",
    fileUrl: "",
    filePublicId: "",
    fileType: "pdf",
    fileName: "",
    fileSize: "",
    isActive: true,
    order: 0,
  });

  const fetchBrochures = useCallback(async () => {
    if (!adminToken) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/brochures`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setBrochures(data);
      }
    } catch {
      toast.error("Failed to load placement brochures");
    } finally {
      setLoading(false);
    }
  }, [adminToken]);

  useEffect(() => {
    fetchBrochures();
  }, [fetchBrochures]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !adminToken) return;

    // Detect extension - Only PDF format supported
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    if (ext !== "pdf" && file.type !== "application/pdf") {
      toast.error("Only PDF files (.pdf) are supported for the Placement Brochure.");
      return;
    }

    setUploadingFile(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "brochures");

    try {
      toast.loading("Uploading brochure to Cloudinary CDN...", { id: "brochure-upload" });
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
          fileType: "pdf",
          fileName: data.originalName || file.name,
          fileSize: data.formattedSize || `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          title: prev.title || file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
        }));
        toast.success(`Brochure uploaded successfully (${ext.toUpperCase()})!`, { id: "brochure-upload" });
      } else {
        toast.error(data.message || "Upload failed", { id: "brochure-upload" });
      }
    } catch {
      toast.error("Cloudinary upload network error", { id: "brochure-upload" });
    } finally {
      setUploadingFile(false);
    }
  };

  const openCreateModal = () => {
    setEditingBrochure(null);
    setFormData({
      title: "CGEC Placement Brochure 2025-26",
      description: "Official Training & Placement Brochure for Cooch Behar Government Engineering College detailing department rosters, recruiter highlights, and hiring guidelines.",
      academicYear: "2025-2026",
      fileUrl: "",
      filePublicId: "",
      fileType: "pdf",
      fileName: "",
      fileSize: "",
      isActive: true,
      order: 0,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: PlacementBrochure) => {
    setEditingBrochure(item);
    setFormData({
      title: item.title,
      description: item.description || "",
      academicYear: item.academicYear || "2025-2026",
      fileUrl: item.fileUrl,
      filePublicId: item.filePublicId || "",
      fileType: item.fileType || "pdf",
      fileName: item.fileName || "",
      fileSize: item.fileSize || "",
      isActive: item.isActive,
      order: item.order || 0,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitting(true);
    try {
      const url = editingBrochure
        ? `${API_URL}/admin/brochures/${editingBrochure.id}`
        : `${API_URL}/admin/brochures`;
      const method = editingBrochure ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(editingBrochure ? "Brochure updated successfully" : "Brochure added successfully");
        setIsModalOpen(false);
        fetchBrochures();
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to save brochure");
      }
    } catch {
      toast.error("Network error while saving brochure");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSetActive = async (item: PlacementBrochure) => {
    if (item.isActive) return; // already active
    try {
      const res = await fetch(`${API_URL}/admin/brochures/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ isActive: true }),
      });
      if (res.ok) {
        toast.success(`"${item.title}" is now the active Placement Brochure on the website!`);
        fetchBrochures();
      }
    } catch {
      toast.error("Failed to update active brochure");
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This will also remove the file from Cloudinary.`)) {
      return;
    }

    try {
      const res = await fetch(`${API_URL}/admin/brochures/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        toast.success("Brochure deleted successfully");
        fetchBrochures();
      } else {
        toast.error("Failed to delete brochure");
      }
    } catch {
      toast.error("Network error while deleting brochure");
    }
  };

  const getFileIcon = (type?: string | null) => {
    const t = (type || "").toLowerCase();
    if (t.includes("pdf")) return <FileText className="w-6 h-6 text-rose-400" />;
    if (t.includes("doc")) return <FileType className="w-6 h-6 text-blue-400" />;
    if (t.includes("ppt")) return <Presentation className="w-6 h-6 text-amber-400" />;
    if (["jpg", "jpeg", "png", "webp", "gif"].includes(t)) return <FileImage className="w-6 h-6 text-emerald-400" />;
    return <FileSpreadsheet className="w-6 h-6 text-purple-400" />;
  };

  const filteredBrochures = brochures.filter((b) =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (b.academicYear && b.academicYear.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (b.fileType && b.fileType.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Placement Module
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Hero Section CTA Button
            </span>
          </div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            Placement Brochure Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Upload and manage official Placement Brochures (PDF format only). The active brochure opens in full-screen browser view and is linked directly from the Home page hero button.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] shrink-0"
        >
          <Plus className="w-4 h-4" />
          Upload New Brochure
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, year, or type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="text-xs text-slate-400 font-medium self-end sm:self-center">
          Total Brochures: <span className="text-white font-bold">{brochures.length}</span>
        </div>
      </div>

      {/* Brochure Cards Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          <p className="text-sm text-slate-400">Loading placement brochures...</p>
        </div>
      ) : filteredBrochures.length === 0 ? (
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center">
          <FileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white mb-1">No Brochures Found</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
            {searchQuery ? "No brochures match your search query." : "No placement brochures have been uploaded yet. Click below to add the first brochure."}
          </p>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold transition-all"
          >
            <Plus className="w-4 h-4" />
            Upload First Brochure
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBrochures.map((b) => (
            <div
              key={b.id}
              className={`relative bg-slate-900/80 rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between ${
                b.isActive
                  ? "border-emerald-500/50 shadow-lg shadow-emerald-500/5 ring-1 ring-emerald-500/30"
                  : "border-slate-800 hover:border-slate-700"
              }`}
            >
              <div>
                {/* Active Indicator & File Type Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                      {b.fileType || "FILE"}
                    </span>
                    {b.fileSize && (
                      <span className="text-[11px] text-slate-400 font-medium">
                        {b.fileSize}
                      </span>
                    )}
                  </div>

                  {b.isActive ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" />
                      Active / Hero CTA
                    </span>
                  ) : (
                    <button
                      onClick={() => handleSetActive(b)}
                      className="text-xs font-semibold text-slate-400 hover:text-blue-400 px-2 py-0.5 rounded-md hover:bg-slate-800 transition-colors"
                      title="Set as the active brochure linked on the Home page hero"
                    >
                      Make Active
                    </button>
                  )}
                </div>

                {/* File Icon & Title */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 shrink-0">
                    {getFileIcon(b.fileType)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base leading-snug line-clamp-2">
                      {b.title}
                    </h3>
                    {b.academicYear && (
                      <p className="text-xs text-blue-400 font-semibold mt-0.5">
                        Academic Year: {b.academicYear}
                      </p>
                    )}
                  </div>
                </div>

                {/* Description */}
                {b.description && (
                  <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                    {b.description}
                  </p>
                )}

                {/* File Name */}
                {b.fileName && (
                  <div className="bg-slate-950/60 rounded-lg px-3 py-1.5 border border-slate-800/80 mb-4 flex items-center justify-between text-xs text-slate-400">
                    <span className="truncate max-w-[200px]" title={b.fileName}>
                      {b.fileName}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase">{b.fileType}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                {b.fileUrl ? (
                  <a
                    href="/placement/brochure.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 rounded-lg text-xs font-bold transition-colors border border-blue-500/20"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Preview Full View
                  </a>
                ) : (
                  <span className="text-[11px] text-slate-500 italic">No file attached</span>
                )}

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(b)}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                    title="Edit Brochure"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(b.id, b.title)}
                    className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors"
                    title="Delete Brochure"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload & Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                {editingBrochure ? "Edit Placement Brochure" : "Upload Placement Brochure"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
              {/* File Upload Box */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300">
                  Brochure PDF File <span className="text-slate-500 font-normal">(Optional — PDF format only)</span>
                </label>

                <div className="border-2 border-dashed border-slate-700 hover:border-blue-500/50 bg-slate-950/60 rounded-xl p-5 text-center transition-colors">
                  <input
                    type="file"
                    id="brochure-file-input"
                    className="hidden"
                    accept=".pdf,application/pdf"
                    onChange={handleFileUpload}
                    disabled={uploadingFile}
                  />
                  <label
                    htmlFor="brochure-file-input"
                    className="cursor-pointer flex flex-col items-center justify-center gap-2"
                  >
                    {uploadingFile ? (
                      <>
                        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                        <p className="text-xs font-semibold text-blue-400">Uploading PDF to Cloudinary CDN...</p>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="w-8 h-8 text-slate-400" />
                        <div>
                          <p className="text-xs font-bold text-white">
                            Click to select brochure PDF from your device
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Adobe PDF format only (.pdf, Max 15MB)
                          </p>
                        </div>
                      </>
                    )}
                  </label>
                </div>

                {/* Uploaded File Info Preview */}
                {formData.fileUrl && (
                  <div className="bg-blue-950/30 border border-blue-500/20 rounded-xl p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <FileCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate">
                          {formData.fileName || "Uploaded PDF"}
                        </p>
                        <p className="text-[10px] text-blue-300 font-medium">
                          PDF {formData.fileSize ? `• ${formData.fileSize}` : ""}
                        </p>
                      </div>
                    </div>
                    <a
                      href="/placement/brochure.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-400 hover:text-blue-300 font-semibold underline shrink-0 ml-2"
                    >
                      Preview PDF
                    </a>
                  </div>
                )}
              </div>

              {/* Direct File URL Input (Optional) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">
                  File URL <span className="text-slate-500 font-normal">(Optional — paste link or upload above)</span>
                </label>
                <input
                  type="text"
                  placeholder="https://res.cloudinary.com/... or https://cgec.org.in/... (optional)"
                  value={formData.fileUrl}
                  onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>

              {/* Title & Academic Year */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    Brochure Title <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CGEC Placement Brochure 2025-26"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    Academic Year
                  </label>
                  <input
                    type="text"
                    placeholder="2025-2026"
                    value={formData.academicYear}
                    onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Description</label>
                <textarea
                  rows={3}
                  placeholder="Short summary of brochure contents, department highlights, batch size, etc."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              {/* Active Checkbox */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="active-brochure-checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                />
                <label htmlFor="active-brochure-checkbox" className="text-xs font-semibold text-slate-300 cursor-pointer">
                  Set as Active Brochure (Linked on Home Page Hero &quot;Placement Brochure&quot; button)
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || uploadingFile}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      {editingBrochure ? "Update Brochure" : "Save Brochure"}
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
