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
  Sparkles,
  Calendar,
  MapPin,
  QrCode,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowRight,
  Layers,
  Flame,
} from "lucide-react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { API_URL } from "@/lib/constants";

export interface HeroSlideItem {
  id: string;
  title: string;
  subtitle?: string | null;
  description: string;
  badge?: string | null;
  badgeColor?: string | null;
  bgImage: string;
  bgImagePublicId?: string | null;
  primaryBtnText?: string | null;
  primaryBtnLink?: string | null;
  secondaryBtnText?: string | null;
  secondaryBtnLink?: string | null;
  eventDate?: string | null;
  venue?: string | null;
  qrCodeImage?: string | null;
  qrCodePublicId?: string | null;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface HeroSlidesTabProps {
  adminToken: string | null;
}

const BADGE_PRESETS = [
  { label: "Hackathon Event", color: "purple" },
  { label: "Tech Fest 2026", color: "cyan" },
  { label: "Special Announcement", color: "amber" },
  { label: "Workshop & Seminar", color: "blue" },
  { label: "Cultural Extravaganza", color: "rose" },
  { label: "Admission Alert", color: "emerald" },
];

const COLOR_OPTIONS = [
  { id: "blue", label: "Blue / Royal" },
  { id: "purple", label: "Purple / Neon" },
  { id: "cyan", label: "Cyan / Cyber" },
  { id: "emerald", label: "Emerald / Green" },
  { id: "amber", label: "Amber / Warning" },
  { id: "rose", label: "Rose / Crimson" },
];

export default function HeroSlidesTab({ adminToken }: HeroSlidesTabProps) {
  const [slides, setSlides] = useState<HeroSlideItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "ACTIVE" | "INACTIVE">("ALL");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlideItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingBg, setUploadingBg] = useState(false);
  const [uploadingQr, setUploadingQr] = useState(false);

  // Delete Confirmation Modal
  const [slideToDelete, setSlideToDelete] = useState<HeroSlideItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    badge: "Special Announcement",
    badgeColor: "blue",
    bgImage: "",
    bgImagePublicId: "",
    primaryBtnText: "Register Now",
    primaryBtnLink: "",
    secondaryBtnText: "Learn More",
    secondaryBtnLink: "",
    eventDate: "",
    venue: "",
    qrCodeImage: "",
    qrCodePublicId: "",
    order: 0,
    isActive: true,
  });

  const fetchSlides = useCallback(async () => {
    if (!adminToken) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/hero-slides`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setSlides(data);
      }
    } catch {
      toast.error("Failed to load hero slides");
    } finally {
      setLoading(false);
    }
  }, [adminToken]);

  useEffect(() => {
    fetchSlides();
  }, [fetchSlides]);

  // Upload background image to Cloudinary
  const handleBgImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !adminToken) return;

    setUploadingBg(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "hero_banners");

    try {
      toast.loading("Uploading banner background...", { id: "bg-upload" });
      const res = await fetch(`${API_URL}/admin/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${adminToken}` },
        body: fd,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setFormData((prev) => ({
          ...prev,
          bgImage: data.url,
          bgImagePublicId: data.publicId || "",
        }));
        toast.success("Banner background uploaded successfully!", { id: "bg-upload" });
      } else {
        toast.error(data.message || "Upload failed", { id: "bg-upload" });
      }
    } catch {
      toast.error("Network error during banner upload", { id: "bg-upload" });
    } finally {
      setUploadingBg(false);
    }
  };

  // Upload QR code to Cloudinary
  const handleQrUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !adminToken) return;

    setUploadingQr(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "hero_qr_codes");

    try {
      toast.loading("Uploading QR code...", { id: "qr-upload" });
      const res = await fetch(`${API_URL}/admin/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${adminToken}` },
        body: fd,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setFormData((prev) => ({
          ...prev,
          qrCodeImage: data.url,
          qrCodePublicId: data.publicId || "",
        }));
        toast.success("QR Code uploaded successfully!", { id: "qr-upload" });
      } else {
        toast.error(data.message || "Upload failed", { id: "qr-upload" });
      }
    } catch {
      toast.error("Network error during QR code upload", { id: "qr-upload" });
    } finally {
      setUploadingQr(false);
    }
  };

  const openAddModal = () => {
    setEditingSlide(null);
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      badge: "Hackathon Event",
      badgeColor: "purple",
      bgImage: "",
      bgImagePublicId: "",
      primaryBtnText: "Register Now",
      primaryBtnLink: "",
      secondaryBtnText: "Explore Event",
      secondaryBtnLink: "",
      eventDate: "",
      venue: "",
      qrCodeImage: "",
      qrCodePublicId: "",
      order: 0,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (slide: HeroSlideItem) => {
    setEditingSlide(slide);
    setFormData({
      title: slide.title,
      subtitle: slide.subtitle || "",
      description: slide.description,
      badge: slide.badge || "Special Announcement",
      badgeColor: slide.badgeColor || "blue",
      bgImage: slide.bgImage,
      bgImagePublicId: slide.bgImagePublicId || "",
      primaryBtnText: slide.primaryBtnText || "",
      primaryBtnLink: slide.primaryBtnLink || "",
      secondaryBtnText: slide.secondaryBtnText || "",
      secondaryBtnLink: slide.secondaryBtnLink || "",
      eventDate: slide.eventDate || "",
      venue: slide.venue || "",
      qrCodeImage: slide.qrCodeImage || "",
      qrCodePublicId: slide.qrCodePublicId || "",
      order: slide.order,
      isActive: slide.isActive,
    });
    setIsModalOpen(true);
  };

  const handleToggleActive = async (slide: HeroSlideItem) => {
    if (!adminToken) return;
    try {
      const res = await fetch(`${API_URL}/admin/hero-slides/${slide.id}/toggle`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        const updated = await res.json();
        setSlides((prev) => prev.map((s) => (s.id === slide.id ? updated : s)));
        try {
          localStorage.removeItem("cgec_hero_slides_cache");
        } catch {}
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("cgec_hero_slides_updated"));
        }
        toast.success(`Slide ${updated.isActive ? "activated" : "deactivated"}!`);
      } else {
        toast.error("Failed to toggle slide status");
      }
    } catch {
      toast.error("Network error toggling status");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminToken) return;

    if (!formData.title.trim()) {
      toast.error("Please enter a slide heading");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Please enter a description");
      return;
    }
    if (!formData.bgImage) {
      toast.error("Please upload a background banner image");
      return;
    }

    setSubmitting(true);
    try {
      const url = editingSlide
        ? `${API_URL}/admin/hero-slides/${editingSlide.id}`
        : `${API_URL}/admin/hero-slides`;
      const method = editingSlide ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(editingSlide ? "Slide updated successfully!" : "Slide created successfully!");
        setIsModalOpen(false);
        try {
          localStorage.removeItem("cgec_hero_slides_cache");
        } catch {}
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("cgec_hero_slides_updated"));
        }
        fetchSlides();
      } else {
        const err = await res.json();
        toast.error(err.message || "Failed to save slide");
      }
    } catch {
      toast.error("Network error while saving slide");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!slideToDelete || !adminToken) return;
    setDeleting(true);
    try {
      const res = await fetch(`${API_URL}/admin/hero-slides/${slideToDelete.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        toast.success("Hero slide and media deleted!");
        setSlideToDelete(null);
        try {
          localStorage.removeItem("cgec_hero_slides_cache");
        } catch {}
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("cgec_hero_slides_updated"));
        }
        fetchSlides();
      } else {
        toast.error("Failed to delete slide");
      }
    } catch {
      toast.error("Network error deleting slide");
    } finally {
      setDeleting(false);
    }
  };

  const getBadgeStyle = (color?: string | null) => {
    switch (color) {
      case "purple":
        return "bg-purple-500/20 text-purple-300 border-purple-500/40";
      case "cyan":
        return "bg-cyan-500/20 text-cyan-300 border-cyan-500/40";
      case "emerald":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
      case "amber":
        return "bg-amber-500/20 text-amber-300 border-amber-500/40";
      case "rose":
        return "bg-rose-500/20 text-rose-300 border-rose-500/40";
      default:
        return "bg-blue-500/20 text-blue-300 border-blue-500/40";
    }
  };

  const filteredSlides = slides.filter((slide) => {
    const matchesSearch =
      slide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (slide.subtitle && slide.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (slide.badge && slide.badge.toLowerCase().includes(searchQuery.toLowerCase())) ||
      slide.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (statusFilter === "ACTIVE") return matchesSearch && slide.isActive;
    if (statusFilter === "INACTIVE") return matchesSearch && !slide.isActive;
    return matchesSearch;
  });

  const activeCount = slides.filter((s) => s.isActive).length;

  return (
    <div className="space-y-6">
      {/* Top Banner Information Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-purple-900/40 border border-blue-500/20 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Homepage Slider CMS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Custom Hero Banners & Events
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Create and manage bespoke slides for special occasions, upcoming hackathons, tech fests, cultural events, or emergency announcements.
              <strong className="text-blue-300 ml-1">Active custom slides automatically appear first</strong> on the homepage hero carousel.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-5 h-5" />
            <span>Create New Slide / Banner</span>
          </button>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Total Slides</span>
            <span className="text-2xl font-black text-white">{slides.length}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30">
            <span className="text-xs text-emerald-400 block mb-1">Active on Home</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-emerald-300">{activeCount}</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Draft / Inactive</span>
            <span className="text-2xl font-black text-slate-300">{slides.length - activeCount}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-blue-950/40 border border-blue-500/30">
            <span className="text-xs text-blue-400 block mb-1">Display Priority</span>
            <span className="text-xs font-semibold text-blue-200">#1 Top First</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search slides by title, badge, event..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {(["ALL", "ACTIVE", "INACTIVE"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setStatusFilter(mode)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === mode
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Slides Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400 space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <p className="text-sm">Loading custom hero slides...</p>
        </div>
      ) : filteredSlides.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800/80 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto">
            <Layers className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">No custom slides found</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              {searchQuery
                ? "No slides match your search criteria. Try a different query."
                : "The homepage currently uses the 5 default college campus slides. Create your first custom event or announcement banner to take the first slide slot!"}
            </p>
          </div>
          {!searchQuery && (
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create First Slide</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSlides.map((slide) => (
            <div
              key={slide.id}
              className={`rounded-3xl border transition-all duration-200 overflow-hidden flex flex-col justify-between ${
                slide.isActive
                  ? "bg-slate-900/90 border-slate-800 hover:border-blue-500/50 shadow-xl"
                  : "bg-slate-900/40 border-slate-800/60 opacity-75 hover:opacity-100"
              }`}
            >
              <div>
                {/* Visual Banner Preview Container */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950 border-b border-slate-800">
                  <Image
                    src={slide.bgImage}
                    alt={slide.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Cinematic dark gradients matching the hero section */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent" />

                  {/* Top Bar Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold tracking-wider bg-slate-950/80 text-white border border-white/20 backdrop-blur-md">
                        #{slide.order + 1}
                      </span>
                      {slide.badge && (
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border backdrop-blur-md flex items-center gap-1.5 ${getBadgeStyle(
                            slide.badgeColor
                          )}`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                          <span>{slide.badge}</span>
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleToggleActive(slide)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md transition-all cursor-pointer ${
                        slide.isActive
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30"
                          : "bg-slate-800/90 text-slate-400 border-slate-700 hover:text-white"
                      }`}
                      title={slide.isActive ? "Click to deactivate" : "Click to activate"}
                    >
                      {slide.isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      <span>{slide.isActive ? "Active" : "Inactive"}</span>
                    </button>
                  </div>

                  {/* Bottom Preview Overlay */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10">
                    {slide.subtitle && (
                      <p className="text-xs text-blue-300 font-semibold uppercase tracking-wider mb-1 line-clamp-1">
                        {slide.subtitle}
                      </p>
                    )}
                    <h4 className="text-lg sm:text-xl font-extrabold text-white line-clamp-2 leading-snug drop-shadow-md">
                      {slide.title}
                    </h4>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-4">
                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                    {slide.description}
                  </p>

                  {/* Event Details Chips */}
                  {(slide.eventDate || slide.venue) && (
                    <div className="flex flex-wrap gap-2 text-xs">
                      {slide.eventDate && (
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/80 text-blue-300 border border-slate-700/60">
                          <Calendar className="w-3.5 h-3.5 shrink-0" />
                          <span>{slide.eventDate}</span>
                        </div>
                      )}
                      {slide.venue && (
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/60">
                          <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                          <span className="line-clamp-1">{slide.venue}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Button & QR Info Bar */}
                  <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      {slide.primaryBtnText && (
                        <div className="px-2.5 py-1 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-300 font-semibold flex items-center gap-1">
                          <span>{slide.primaryBtnText}</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      )}
                      {slide.secondaryBtnText && (
                        <div className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-medium">
                          {slide.secondaryBtnText}
                        </div>
                      )}
                    </div>

                    {slide.qrCodeImage && (
                      <div className="flex items-center gap-1.5 text-xs text-purple-300 bg-purple-500/10 border border-purple-500/30 px-2.5 py-1 rounded-lg">
                        <QrCode className="w-3.5 h-3.5 text-purple-400" />
                        <span>QR Code Attached</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-5 py-3.5 bg-slate-950/50 border-t border-slate-800 flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-500">
                  Priority Order: <strong className="text-slate-300">#{slide.order}</strong>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(slide)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-all cursor-pointer"
                  >
                    <Edit className="w-3.5 h-3.5 text-blue-400" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => setSlideToDelete(slide)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-400 text-xs font-semibold transition-all cursor-pointer border border-rose-500/20"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl my-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/60">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {editingSlide ? "Edit Hero Slide / Banner" : "Create Custom Hero Slide"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Customize the heading, description, background image, CTA buttons, and QR code.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto custom-sidebar-scrollbar">
              {/* Category Badge & Presets */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Category Badge & Presets
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {BADGE_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          badge: preset.label,
                          badgeColor: preset.color,
                        }))
                      }
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        formData.badge === preset.label
                          ? "bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30"
                          : "bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-500"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-[11px] text-slate-400 block mb-1">Custom Badge Text</span>
                    <input
                      type="text"
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                      placeholder="e.g. HACKATHON 2026 or SPECIAL ANNOUNCEMENT"
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-400 block mb-1">Badge Color Theme</span>
                    <select
                      value={formData.badgeColor}
                      onChange={(e) => setFormData({ ...formData, badgeColor: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                    >
                      {COLOR_OPTIONS.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Main Slide Heading / Title <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. INVENTRON 2026: The Annual Flagship Hackathon"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Subtitle / Organization Tag (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="e.g. Department of Computer Science & Engineering Presents"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Slide Description / Details <span className="text-rose-400">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide an engaging description of the announcement, tracks, prize pool, or occasion details..."
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Background Banner Image Upload */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Background Banner Image <span className="text-rose-400">*</span>
                </label>
                <p className="text-xs text-slate-400">
                  Upload a high-resolution banner image (Recommended 1920x1080 or 16:9 ratio). Dark or themed wallpapers work best!
                </p>

                {formData.bgImage ? (
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 group">
                    <Image
                      src={formData.bgImage}
                      alt="Banner Preview"
                      fill
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <label className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer transition-all">
                        Change Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleBgImageUpload}
                          className="hidden"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, bgImage: "", bgImagePublicId: "" }))}
                        className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold cursor-pointer transition-all"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-2xl bg-slate-950/50 hover:bg-slate-950 cursor-pointer transition-all group">
                    {uploadingBg ? (
                      <div className="flex flex-col items-center space-y-2 text-blue-400">
                        <Loader2 className="w-8 h-8 animate-spin" />
                        <span className="text-xs font-semibold">Uploading to Cloudinary...</span>
                      </div>
                    ) : (
                      <>
                        <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:scale-110 transition-transform mb-3">
                          <UploadCloud className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-bold text-white mb-1">Click to upload banner image</p>
                        <p className="text-xs text-slate-500">Supports PNG, JPG, WEBP up to 20MB</p>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingBg}
                      onChange={handleBgImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Action Buttons Configuration */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>Call to Action (CTA) Buttons</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-300 block mb-1 font-semibold">
                      Primary Button Label
                    </label>
                    <input
                      type="text"
                      value={formData.primaryBtnText}
                      onChange={(e) => setFormData({ ...formData, primaryBtnText: e.target.value })}
                      placeholder="e.g. Register Now or Apply Online"
                      className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1 font-semibold">
                      Primary Button URL / Link
                    </label>
                    <input
                      type="text"
                      value={formData.primaryBtnLink}
                      onChange={(e) => setFormData({ ...formData, primaryBtnLink: e.target.value })}
                      placeholder="https://... or /notices/..."
                      className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1 font-semibold">
                      Secondary Button Label (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.secondaryBtnText}
                      onChange={(e) => setFormData({ ...formData, secondaryBtnText: e.target.value })}
                      placeholder="e.g. Download Rulebook or Brochure"
                      className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1 font-semibold">
                      Secondary Button URL / Link
                    </label>
                    <input
                      type="text"
                      value={formData.secondaryBtnLink}
                      onChange={(e) => setFormData({ ...formData, secondaryBtnLink: e.target.value })}
                      placeholder="https://... or /placement/brochure"
                      className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Event / Hackathon Specifics: Date, Venue, QR Code */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Event & Hackathon Details (Optional)</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-300 block mb-1 font-semibold">
                      Event Date / Timeline
                    </label>
                    <input
                      type="text"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      placeholder="e.g. Oct 24 - 26, 2026 or 15th March"
                      className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1 font-semibold">
                      Venue / Location
                    </label>
                    <input
                      type="text"
                      value={formData.venue}
                      onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                      placeholder="e.g. Main Auditorium & Central Labs"
                      className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                {/* Optional QR Code Upload */}
                <div className="pt-2">
                  <label className="text-xs text-slate-300 block mb-1 font-semibold">
                    Registration QR Code Image (Optional)
                  </label>
                  <p className="text-[11px] text-slate-400 mb-2">
                    Upload a QR code (for Google Forms, Unstop link, WhatsApp group, or brochure) to display an interactive scan widget on the live slide.
                  </p>

                  {formData.qrCodeImage ? (
                    <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-white p-1 shrink-0">
                        <Image
                          src={formData.qrCodeImage}
                          alt="QR Code"
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white truncate">QR Code Attached</p>
                        <p className="text-[10px] text-slate-400 truncate">Will render as a sleek scan card</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, qrCodeImage: "", qrCodePublicId: "" }))}
                        className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white transition-all text-xs cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-purple-500/50 cursor-pointer text-xs text-slate-300 font-semibold transition-all">
                      {uploadingQr ? (
                        <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                      ) : (
                        <QrCode className="w-4 h-4 text-purple-400" />
                      )}
                      <span>{uploadingQr ? "Uploading QR..." : "Upload QR Code Image"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingQr}
                        onChange={handleQrUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Order & Active Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
                    Display Priority Order
                  </label>
                  <p className="text-[11px] text-slate-400 mb-1.5">
                    Order 0 = Top 1st slide, 1 = 2nd slide, etc.
                  </p>
                  <input
                    type="number"
                    min={0}
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
                    Publish Status
                  </label>
                  <p className="text-[11px] text-slate-400 mb-1.5">
                    Enable or disable this banner on the homepage.
                  </p>
                  <div className="flex items-center gap-3 h-[42px]">
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, isActive: !prev.isActive }))}
                      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors cursor-pointer ${
                        formData.isActive ? "bg-emerald-600" : "bg-slate-800"
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                          formData.isActive ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                    <span className="text-xs font-bold text-white">
                      {formData.isActive ? "Active (Visible)" : "Draft (Hidden)"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/30 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving Slide...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>{editingSlide ? "Update Slide" : "Create Slide"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {slideToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-white">Delete Hero Slide?</h3>
              <p className="text-xs text-slate-400">
                Are you sure you want to delete <strong className="text-white">&ldquo;{slideToDelete.title}&rdquo;</strong>?
                This will permanently remove the slide and delete its background and QR code images from Cloudinary.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSlideToDelete(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={handleDeleteConfirm}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-lg shadow-rose-600/30 cursor-pointer disabled:opacity-50"
              >
                {deleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Slide</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
