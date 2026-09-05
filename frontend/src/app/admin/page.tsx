"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Bell,
  FlaskConical,
  Image as ImageIcon,
  LogOut,
  Plus,
  Search,
  Trash2,
  Edit,
  ExternalLink,
  Loader2,
  FileText,
  Eye,
  EyeOff,
  Mail,
  GraduationCap,
  X,
  RefreshCw,
  KeyRound,
  ShieldCheck,
  UserCheck,
  Save,
  Lock,
  Newspaper,
  Menu,
  UploadCloud,
  FileUp,
  ImagePlus,
  Receipt,
  Briefcase,
  Award,
} from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { API_URL } from "@/lib/constants";
import Image from "next/image";
import CommitteesTab from "./components/CommitteesTab";
import AdmissionTab from "./components/AdmissionTab";
import FeesTab from "./components/FeesTab";
import LeadershipTab from "./components/LeadershipTab";
import RecruitersTab from "./components/RecruitersTab";
import PlacementBrochureTab from "./components/PlacementBrochureTab";

const DEPARTMENTS = ["CSE", "ECE", "EE", "ME", "CE", "BSH"];
const SEMESTERS = ["1st Semester", "2nd Semester", "3rd Semester", "4th Semester", "5th Semester", "6th Semester", "7th Semester", "8th Semester", "All Semesters"];
const NOTICE_CATEGORIES = ["General", "Academic", "Tender", "Recruitment"];
const NOTICE_PRIORITIES = ["NORMAL", "HIGH", "URGENT"];
const GALLERY_CATEGORIES = ["Campus", "Events", "Sports", "Labs", "Cultural"];

type AdminTabType =
  | "overview"
  | "faculty"
  | "syllabus"
  | "notices"
  | "labs"
  | "gallery"
  | "wallmagazine"
  | "admission"
  | "fees"
  | "committees"
  | "leadership"
  | "recruiters"
  | "brochure"
  | "settings";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AdminRecord = Record<string, any>;

export default function AdminDashboardPage() {
  const router = useRouter();

  // Authentication State
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [adminName, setAdminName] = useState("Administrator");
  const [adminEmail, setAdminEmail] = useState("admin@cgec.org.in");
  const [activeTab, setActiveTab] = useState<AdminTabType>("overview");
  const [admissionYear, setAdmissionYear] = useState("2026");
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Stats
  const [stats, setStats] = useState({
    faculty: 0,
    notices: 0,
    syllabus: 0,
    labs: 0,
    gallery: 0,
    users: 0,
    admission: 0,
    fees: 0,
    committees: 0,
    leadership: 0,
    recruiters: 0,
    brochures: 0,
  });

  // Data Collections
  const [facultyList, setFacultyList] = useState<AdminRecord[]>([]);
  const [syllabusList, setSyllabusList] = useState<AdminRecord[]>([]);
  const [noticesList, setNoticesList] = useState<AdminRecord[]>([]);
  const [labsList, setLabsList] = useState<AdminRecord[]>([]);
  const [galleryList, setGalleryList] = useState<AdminRecord[]>([]);
  const [wallMagazineList, setWallMagazineList] = useState<AdminRecord[]>([]);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDeptFilter, setSelectedDeptFilter] = useState("ALL");

  // Modal Controls
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"faculty" | "syllabus" | "notice" | "lab" | "gallery" | "wallmagazine" | null>(null);
  const [editingItem, setEditingItem] = useState<AdminRecord | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  // Cloudinary Direct Upload Handler
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldSetter: (url: string, publicId?: string) => void,
    folderName: string,
    fieldKey: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!adminToken) {
      toast.error("Please login to upload media");
      return;
    }

    setUploadingField(fieldKey);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folderName);

    try {
      toast.loading("Uploading to Cloudinary...", { id: "upload-status" });
      const res = await fetch(`${API_URL}/admin/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        fieldSetter(data.url, data.publicId);
        toast.success("File uploaded to Cloudinary successfully!", { id: "upload-status" });
      } else {
        toast.error(data.message || "Failed to upload file", { id: "upload-status" });
      }
    } catch {
      toast.error("Network error during file upload", { id: "upload-status" });
    } finally {
      setUploadingField(null);
      // Reset input value so same file can be re-uploaded if needed
      e.target.value = "";
    }
  };

  // Admin Profile & Security Form State
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [profileSaveLoading, setProfileSaveLoading] = useState(false);

  // Form States
  const [facultyForm, setFacultyForm] = useState({
    name: "",
    designation: "",
    department: "CSE",
    email: "",
    phone: "",
    experience: "",
    specialization: "",
    qualifications: "",
    image: "",
    imagePublicId: "",
    cvLink: "",
    cvPublicId: "",
    publications: "",
  });

  const [syllabusForm, setSyllabusForm] = useState({
    department: "CSE",
    semester: "1st Semester",
    title: "",
    description: "",
    pdfLink: "",
    pdfPublicId: "",
    academicYear: "2025-2026",
  });

  const [noticeForm, setNoticeForm] = useState({
    title: "",
    content: "",
    category: "General",
    priority: "NORMAL",
    department: "",
    expiryDate: "",
    attachment: "",
    attachmentPublicId: "",
  });

  const [labForm, setLabForm] = useState({
    department: "CSE",
    name: "",
    description: "",
    image: "",
    imagePublicId: "",
    roomNumber: "",
    facultyInCharge: "",
  });

  const [galleryForm, setGalleryForm] = useState({
    title: "",
    category: "Campus",
    imageUrl: "",
    imagePublicId: "",
    description: "",
  });

  const [wallMagazineForm, setWallMagazineForm] = useState({
    title: "",
    edition: "",
    year: "",
    description: "",
    imageUrl: "",
    imagePublicId: "",
    pdfLink: "",
    pdfPublicId: "",
    department: "",
  });

  // Fetch Current Admin Profile
  const fetchAdminProfile = useCallback(async (token: string) => {
    try {
      const res = await fetch(`${API_URL}/admin/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setProfileForm((prev) => ({
          ...prev,
          name: data.name || "CGEC Super Administrator",
          email: data.email || "admin@cgec.org.in",
        }));
        setAdminName(data.name || "Administrator");
        setAdminEmail(data.email || "admin@cgec.org.in");
      }
    } catch {}
  }, []);

  // Fetch Dashboard Stats & All Collections
  const fetchDashboardData = useCallback(async (token: string) => {
    setIsLoading(true);
    const headers = { Authorization: `Bearer ${token}` };

    try {
      // 1. Stats
      const statsRes = await fetch(`${API_URL}/admin/stats`, { headers });
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats((prev) => statsData.counts || prev);
      }

      // 2. Faculty
      const facultyRes = await fetch(`${API_URL}/admin/faculty`, { headers });
      if (facultyRes.ok) {
        setFacultyList(await facultyRes.json());
      }

      // 3. Syllabus
      const syllabusRes = await fetch(`${API_URL}/admin/syllabus`, { headers });
      if (syllabusRes.ok) {
        setSyllabusList(await syllabusRes.json());
      }

      // 4. Notices
      const noticesRes = await fetch(`${API_URL}/admin/notices`, { headers });
      if (noticesRes.ok) {
        setNoticesList(await noticesRes.json());
      }

      // 5. Labs
      const labsRes = await fetch(`${API_URL}/admin/labs`, { headers });
      if (labsRes.ok) {
        setLabsList(await labsRes.json());
      }

      // 6. Gallery
      const galleryRes = await fetch(`${API_URL}/admin/gallery`, { headers });
      if (galleryRes.ok) {
        setGalleryList(await galleryRes.json());
      }

      // 7. Wall Magazine
      const wallMagRes = await fetch(`${API_URL}/admin/wall-magazine`, { headers });
      if (wallMagRes.ok) {
        setWallMagazineList(await wallMagRes.json());
      }

      // 8. Admission Active Year
      const admRes = await fetch(`${API_URL}/admin/admission`, { headers });
      if (admRes.ok) {
        const admData = await admRes.json();
        if (admData.activeYear) {
          setAdmissionYear(admData.activeYear);
        }
      }
    } catch {
      toast.error("Error loading admin data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check Authentication on Mount
  useEffect(() => {
    const token = localStorage.getItem("cgec_admin_token");
    const role = localStorage.getItem("cgec_admin_role");
    const name = localStorage.getItem("cgec_admin_name");
    const email = localStorage.getItem("cgec_admin_email");

    if (!token || role !== "ADMIN") {
      toast.error("Please login to access the Admin Panel");
      router.push("/admin/login/cgec");
      return;
    }

    setAdminToken(token);
    if (name) setAdminName(name);
    if (email) {
      setAdminEmail(email);
      setProfileForm((prev) => ({ ...prev, name: name || "CGEC Super Administrator", email }));
    }
    fetchDashboardData(token);
    fetchAdminProfile(token);
  }, [router, fetchDashboardData, fetchAdminProfile]);

  const handleSignOut = () => {
    localStorage.removeItem("cgec_admin_token");
    localStorage.removeItem("cgec_admin_role");
    localStorage.removeItem("cgec_admin_name");
    localStorage.removeItem("cgec_admin_email");
    toast.success("Signed out successfully");
    router.push("/admin/login/cgec");
  };

  // Handle Admin Profile & Password Update
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminToken) return;

    if (profileForm.newPassword) {
      if (profileForm.newPassword.length < 6) {
        toast.error("New password must be at least 6 characters long.");
        return;
      }
      if (profileForm.newPassword !== profileForm.confirmPassword) {
        toast.error("New password and confirm password do not match.");
        return;
      }
    }

    setProfileSaveLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          name: profileForm.name,
          email: profileForm.email,
          currentPassword: profileForm.currentPassword || undefined,
          newPassword: profileForm.newPassword || undefined,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Admin credentials updated successfully!");
        if (data.token) {
          localStorage.setItem("cgec_admin_token", data.token);
          setAdminToken(data.token);
        }
        if (data.user) {
          localStorage.setItem("cgec_admin_name", data.user.name);
          localStorage.setItem("cgec_admin_email", data.user.email);
          setAdminName(data.user.name);
          setAdminEmail(data.user.email);
        }
        setProfileForm((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
      } else {
        toast.error(data.message || "Failed to update admin profile");
      }
    } catch {
      toast.error("Network error while updating admin credentials");
    } finally {
      setProfileSaveLoading(false);
    }
  };

  // Modal Open Handlers
  const openCreateModal = (type: "faculty" | "syllabus" | "notice" | "lab" | "gallery" | "wallmagazine") => {
    setModalType(type);
    setEditingItem(null);

    // Reset forms
    if (type === "faculty") {
      setFacultyForm({
        name: "",
        designation: "Assistant Professor",
        department: "CSE",
        email: "",
        phone: "",
        experience: "",
        specialization: "",
        qualifications: "B.Tech, M.Tech, Ph.D",
        image: "/img/Faculty/Somen_P.jpg",
        imagePublicId: "",
        cvLink: "",
        cvPublicId: "",
        publications: "",
      });
    } else if (type === "syllabus") {
      setSyllabusForm({
        department: "CSE",
        semester: "1st Semester",
        title: "",
        description: "",
        pdfLink: "/data/cse/BTECH_all dept_1st year.pdf",
        pdfPublicId: "",
        academicYear: "2025-2026",
      });
    } else if (type === "notice") {
      setNoticeForm({
        title: "",
        content: "",
        category: "General",
        priority: "NORMAL",
        department: "",
        expiryDate: "",
        attachment: "",
        attachmentPublicId: "",
      });
    } else if (type === "lab") {
      setLabForm({
        department: "CSE",
        name: "",
        description: "",
        image: "/img/labs/cse_lab.jpg",
        imagePublicId: "",
        roomNumber: "Room 204, Academic Block",
        facultyInCharge: "",
      });
    } else if (type === "gallery") {
      setGalleryForm({
        title: "",
        category: "Campus",
        imageUrl: "/img/hero/slider-1.jpg",
        imagePublicId: "",
        description: "",
      });
    } else if (type === "wallmagazine") {
      setWallMagazineForm({
        title: "",
        edition: "",
        year: new Date().getFullYear().toString(),
        description: "",
        imageUrl: "",
        imagePublicId: "",
        pdfLink: "",
        pdfPublicId: "",
        department: "",
      });
    }

    setIsModalOpen(true);
  };

  const openEditModal = (type: "faculty" | "syllabus" | "notice" | "lab" | "wallmagazine", item: AdminRecord) => {
    setModalType(type);
    setEditingItem(item);

    if (type === "faculty") {
      setFacultyForm({
        name: item.name || "",
        designation: item.designation || "",
        department: item.department || "CSE",
        email: item.email || "",
        phone: item.phone || "",
        experience: item.experience || "",
        specialization: Array.isArray(item.specialization) ? item.specialization.join(", ") : item.specialization || "",
        qualifications: Array.isArray(item.qualifications) ? item.qualifications.join(", ") : item.qualifications || "",
        image: item.image || "",
        imagePublicId: item.imagePublicId || "",
        cvLink: item.cvLink || "",
        cvPublicId: item.cvPublicId || "",
        publications: Array.isArray(item.publications) ? item.publications.join(", ") : item.publications || "",
      });
    } else if (type === "syllabus") {
      setSyllabusForm({
        department: item.department || "CSE",
        semester: item.semester || "1st Semester",
        title: item.title || "",
        description: item.description || "",
        pdfLink: item.pdfLink || "",
        pdfPublicId: item.pdfPublicId || "",
        academicYear: item.academicYear || "2025-2026",
      });
    } else if (type === "notice") {
      setNoticeForm({
        title: item.title || "",
        content: item.content || "",
        category: item.category || "General",
        priority: item.priority || "NORMAL",
        department: item.department || "",
        expiryDate: item.expiryDate ? item.expiryDate.split("T")[0] : "",
        attachment: item.attachment || "",
        attachmentPublicId: item.attachmentPublicId || "",
      });
    } else if (type === "lab") {
      setLabForm({
        department: item.department || "CSE",
        name: item.name || "",
        description: item.description || "",
        image: item.image || "",
        imagePublicId: item.imagePublicId || "",
        roomNumber: item.roomNumber || "",
        facultyInCharge: item.facultyInCharge || "",
      });
    } else if (type === "wallmagazine") {
      setWallMagazineForm({
        title: item.title || "",
        edition: item.edition || "",
        year: item.year || "",
        description: item.description || "",
        imageUrl: item.imageUrl || "",
        imagePublicId: item.imagePublicId || "",
        pdfLink: item.pdfLink || "",
        pdfPublicId: item.pdfPublicId || "",
        department: item.department || "",
      });
    }

    setIsModalOpen(true);
  };

  // Form Submit Handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminToken) return;

    setFormLoading(true);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminToken}`,
    };

    try {
      if (modalType === "faculty") {
        const payload = {
          ...facultyForm,
          specialization: facultyForm.specialization ? facultyForm.specialization.split(",").map((s) => s.trim()).filter(Boolean) : [],
          qualifications: facultyForm.qualifications ? facultyForm.qualifications.split(",").map((s) => s.trim()).filter(Boolean) : [],
          publications: facultyForm.publications ? facultyForm.publications.split(",").map((s) => s.trim()).filter(Boolean) : [],
        };

        const url = editingItem ? `${API_URL}/admin/faculty/${editingItem.id}` : `${API_URL}/admin/faculty`;
        const method = editingItem ? "PUT" : "POST";

        const res = await fetch(url, { method, headers, body: JSON.stringify(payload) });
        if (res.ok) {
          toast.success(editingItem ? "Faculty updated successfully!" : "Faculty member added!");
          setIsModalOpen(false);
          fetchDashboardData(adminToken);
        } else {
          const err = await res.json();
          toast.error(err.message || "Failed to save faculty");
        }
      } else if (modalType === "syllabus") {
        const url = editingItem ? `${API_URL}/admin/syllabus/${editingItem.id}` : `${API_URL}/admin/syllabus`;
        const method = editingItem ? "PUT" : "POST";

        const res = await fetch(url, { method, headers, body: JSON.stringify(syllabusForm) });
        if (res.ok) {
          toast.success(editingItem ? "Syllabus updated successfully!" : "Syllabus added!");
          setIsModalOpen(false);
          fetchDashboardData(adminToken);
        } else {
          const err = await res.json();
          toast.error(err.message || "Failed to save syllabus");
        }
      } else if (modalType === "notice") {
        const url = editingItem ? `${API_URL}/admin/notices/${editingItem.id}` : `${API_URL}/admin/notices`;
        const method = editingItem ? "PUT" : "POST";

        const res = await fetch(url, { method, headers, body: JSON.stringify(noticeForm) });
        if (res.ok) {
          toast.success(editingItem ? "Notice updated!" : "Notice posted!");
          setIsModalOpen(false);
          fetchDashboardData(adminToken);
        } else {
          const err = await res.json();
          toast.error(err.message || "Failed to save notice");
        }
      } else if (modalType === "lab") {
        const url = editingItem ? `${API_URL}/admin/labs/${editingItem.id}` : `${API_URL}/admin/labs`;
        const method = editingItem ? "PUT" : "POST";

        const res = await fetch(url, { method, headers, body: JSON.stringify(labForm) });
        if (res.ok) {
          toast.success(editingItem ? "Lab updated!" : "Lab added!");
          setIsModalOpen(false);
          fetchDashboardData(adminToken);
        } else {
          const err = await res.json();
          toast.error(err.message || "Failed to save lab");
        }
      } else if (modalType === "gallery") {
        const res = await fetch(`${API_URL}/admin/gallery`, {
          method: "POST",
          headers,
          body: JSON.stringify(galleryForm),
        });
        if (res.ok) {
          toast.success("Gallery image added!");
          setIsModalOpen(false);
          fetchDashboardData(adminToken);
        } else {
          const err = await res.json();
          toast.error(err.message || "Failed to save image");
        }
      } else if (modalType === "wallmagazine") {
        const url = editingItem ? `${API_URL}/admin/wall-magazine/${editingItem.id}` : `${API_URL}/admin/wall-magazine`;
        const method = editingItem ? "PUT" : "POST";
        const res = await fetch(url, { method, headers, body: JSON.stringify(wallMagazineForm) });
        if (res.ok) {
          toast.success(editingItem ? "Magazine updated!" : "Magazine added!");
          setIsModalOpen(false);
          fetchDashboardData(adminToken);
        } else {
          const errData = await res.json();
          toast.error(errData.message || "Failed to save magazine");
        }
      }
    } catch {
      toast.error("Network error saving changes");
    } finally {
      setFormLoading(false);
    }
  };

  // Delete Handlers
  const handleDelete = async (endpoint: string, id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    if (!adminToken) return;

    try {
      const res = await fetch(`${API_URL}/admin/${endpoint}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      if (res.ok) {
        toast.success(`Deleted successfully`);
        fetchDashboardData(adminToken);
      } else {
        toast.error("Failed to delete");
      }
    } catch {
      toast.error("Network error deleting item");
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 flex flex-col lg:flex-row selection:bg-blue-600 selection:text-white">
      <Toaster position="top-right" />

      {/* Mobile Top Navigation Header */}
      <div className="lg:hidden bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl overflow-hidden shadow-md shadow-blue-500/20 flex items-center justify-center bg-white shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/cgec_round_logo.ico" alt="CGEC Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h2 className="font-extrabold text-white text-base tracking-tight">CGEC CMS</h2>
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Admin Mode</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 focus:outline-none cursor-pointer"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation (Desktop always visible, Mobile collapsible drawer) */}
      <aside
        className={`w-full lg:w-72 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 h-full max-h-screen select-none ${
          isMobileMenuOpen ? "fixed inset-0 z-50 flex flex-col bg-slate-900" : "hidden lg:flex"
        }`}
      >
        {/* Logo & Admin Status (Desktop) */}
        <div className="p-5 border-b border-slate-800/80 shrink-0 hidden lg:block bg-slate-900">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-lg shadow-blue-500/20 bg-white flex items-center justify-center shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/cgec_round_logo.ico" alt="CGEC Logo" className="w-full h-full object-contain" />
            </div>
            <div className="min-w-0">
              <h2 className="font-extrabold text-white text-base tracking-tight truncate">CGEC CMS</h2>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                <span className="truncate">Administrator Mode</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Top Bar with Close Button */}
        {isMobileMenuOpen && (
          <div className="p-4 border-b border-slate-800 flex items-center justify-between shrink-0 lg:hidden">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl overflow-hidden bg-white flex items-center justify-center shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/cgec_round_logo.ico" alt="CGEC Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-extrabold text-white text-sm">Navigation Menu</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Navigation Items (The Green Line Area - with dedicated sleek scrollbar) */}
        <nav className="p-3 space-y-1 flex-1 overflow-y-auto min-h-0 custom-sidebar-scrollbar">
          {[
            { id: "overview", label: "Dashboard Overview", icon: LayoutDashboard, count: null },
            { id: "committees", label: "Committees (All 10)", icon: ShieldCheck, count: stats.committees || null },
            { id: "admission", label: `Admission ${admissionYear}`, icon: GraduationCap, count: stats.admission || null },
            { id: "fees", label: "Fees Structure", icon: Receipt, count: stats.fees || null },
            { id: "leadership", label: "Leadership Messages", icon: Award, count: stats.leadership || null },
            { id: "recruiters", label: "Our Recruiters", icon: Briefcase, count: stats.recruiters || null },
            { id: "brochure", label: "Placement Brochure", icon: FileText, count: stats.brochures || null },
            { id: "faculty", label: "Faculty Directory", icon: Users, count: stats.faculty },
            { id: "syllabus", label: "Syllabus & PDFs", icon: BookOpen, count: stats.syllabus },
            { id: "notices", label: "Notices & Tenders", icon: Bell, count: stats.notices },
            { id: "labs", label: "Department Labs", icon: FlaskConical, count: stats.labs },
            { id: "gallery", label: "Campus Gallery", icon: ImageIcon, count: stats.gallery },
            { id: "wallmagazine", label: "Wall Magazine", icon: Newspaper, count: wallMagazineList.length || null },
            { id: "settings", label: "Admin Credentials", icon: KeyRound, count: null },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as AdminTabType);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-xs transition-all duration-150 cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center space-x-2.5 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span className="truncate">{tab.label}</span>
                </div>
                {tab.count !== null && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ml-1.5 ${
                      isActive ? "bg-white/25 text-white" : "bg-slate-800 text-slate-400 border border-slate-700/50"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Profile & Sign Out Footer (The Blue Area - Stationary & locked at bottom left) */}
        <div className="p-3.5 border-t border-slate-800/80 bg-slate-950/70 shrink-0 mt-auto">
          <div className="flex items-center space-x-2.5 mb-2.5 p-2 rounded-xl bg-slate-900 border border-slate-800/80">
            <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs border border-blue-500/30 shrink-0">
              {adminName.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate leading-tight">{adminName}</p>
              <p className="text-[10px] text-slate-400 truncate leading-tight mt-0.5">{adminEmail}</p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white text-xs font-bold transition-all cursor-pointer border border-rose-500/20 shadow-sm"
          >
            <LogOut className="w-3.5 h-3.5 shrink-0" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full min-w-0 overflow-hidden bg-slate-950">
        {/* Top Header Bar - FIXED / STATIONARY (Second Image Header) */}
        <header className="bg-slate-900/90 backdrop-blur-xl border-b border-slate-800/80 px-6 py-3.5 shrink-0 z-20 flex items-center justify-between gap-4 shadow-sm">
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl font-extrabold text-white capitalize truncate tracking-tight">
              {activeTab === "overview"
                ? "System Overview"
                : activeTab === "settings"
                ? "Admin Account & Security Settings"
                : activeTab === "wallmagazine"
                ? "Wall Magazine"
                : activeTab === "admission"
                ? `Admission ${admissionYear} Portal`
                : activeTab === "fees"
                ? "Fees Structure Management"
                : activeTab === "committees"
                ? "Committees Management (All 10)"
                : activeTab === "leadership"
                ? "Leadership Messages"
                : activeTab === "recruiters"
                ? "Our Recruiters"
                : activeTab === "brochure"
                ? "Placement Brochure Management"
                : `${activeTab} Management`}
            </h1>
            <p className="text-xs text-slate-400 truncate">
              Cooch Behar Government Engineering College CMS Portal
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {activeTab !== "overview" &&
              activeTab !== "settings" &&
              activeTab !== "admission" &&
              activeTab !== "fees" &&
              activeTab !== "committees" &&
              activeTab !== "leadership" &&
              activeTab !== "recruiters" &&
              activeTab !== "brochure" && (
                <button
                  onClick={() => {
                    if (activeTab === "faculty") openCreateModal("faculty");
                    else if (activeTab === "syllabus") openCreateModal("syllabus");
                    else if (activeTab === "notices") openCreateModal("notice");
                    else if (activeTab === "labs") openCreateModal("lab");
                    else if (activeTab === "gallery") openCreateModal("gallery");
                    else if (activeTab === "wallmagazine") openCreateModal("wallmagazine");
                  }}
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-600/30 transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>
                    Add{" "}
                    {activeTab === "faculty"
                      ? "Faculty"
                      : activeTab === "syllabus"
                      ? "Syllabus PDF"
                      : activeTab === "notices"
                      ? "Notice"
                      : activeTab === "labs"
                      ? "Lab"
                      : activeTab === "wallmagazine"
                      ? "Magazine"
                      : "Photo"}
                  </span>
                </button>
              )}

            <button
              onClick={() => {
                fetchDashboardData(adminToken!);
                fetchAdminProfile(adminToken!);
              }}
              className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-all cursor-pointer border border-slate-700/50"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Content Container - THE ONLY SCROLLING AREA ON THE RIGHT */}
        <div className="flex-1 overflow-y-auto min-h-0 p-6 space-y-6 custom-content-scrollbar">
          {isLoading ? (
            <div className="h-96 flex flex-col items-center justify-center space-y-3">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
              <p className="text-sm text-slate-400">Loading CMS records...</p>
            </div>
          ) : (
            <>
              {/* ========================================================================= */}
              {/* 1. OVERVIEW TAB */}
              {/* ========================================================================= */}
              {activeTab === "overview" && (
                <div className="space-y-8">
                  {/* KPI Stats Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {[
                      { label: "Committees (10)", value: stats.committees, icon: ShieldCheck, color: "from-blue-600 to-indigo-600", tab: "committees" },
                      { label: `Admission ${admissionYear}`, value: stats.admission, icon: GraduationCap, color: "from-cyan-600 to-blue-600", tab: "admission" },
                      { label: "Fees Structure", value: stats.fees, icon: Receipt, color: "from-emerald-600 to-teal-600", tab: "fees" },
                      { label: "Leadership Messages", value: stats.leadership, icon: Award, color: "from-purple-600 to-pink-600", tab: "leadership" },
                      { label: "Our Recruiters", value: stats.recruiters, icon: Briefcase, color: "from-amber-500 to-orange-600", tab: "recruiters" },
                      { label: "Placement Brochure", value: stats.brochures, icon: FileText, color: "from-blue-600 to-cyan-600", tab: "brochure" },
                      { label: "Faculty Directory", value: stats.faculty, icon: Users, color: "from-blue-600 to-indigo-600", tab: "faculty" },
                      { label: "Syllabus & PDFs", value: stats.syllabus, icon: BookOpen, color: "from-indigo-600 to-purple-600", tab: "syllabus" },
                      { label: "Published Notices", value: stats.notices, icon: Bell, color: "from-amber-500 to-orange-600", tab: "notices" },
                      { label: "Department Labs", value: stats.labs, icon: FlaskConical, color: "from-emerald-500 to-teal-600", tab: "labs" },
                      { label: "Gallery Photos", value: stats.gallery, icon: ImageIcon, color: "from-sky-500 to-blue-600", tab: "gallery" },
                      { label: "Security & Credentials", value: "Active", icon: ShieldCheck, color: "from-emerald-600 to-teal-700", tab: "settings" },
                    ].map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <motion.div
                          key={index}
                          whileHover={{ y: -3 }}
                          onClick={() => item.tab && setActiveTab(item.tab as AdminTabType)}
                          className={`p-6 rounded-3xl bg-slate-900 border border-slate-800/80 shadow-xl relative overflow-hidden group ${
                            item.tab ? "cursor-pointer" : ""
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{item.label}</p>
                              <h3 className="text-3xl font-extrabold text-white">{item.value}</h3>
                            </div>
                            <div className={`p-4 rounded-2xl bg-gradient-to-tr ${item.color} text-white shadow-lg shadow-blue-500/10 group-hover:scale-110 transition-transform`}>
                              <Icon className="w-6 h-6" />
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Quick Action Shortcuts */}
                  <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Quick Management Actions</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                      <button
                        onClick={() => setActiveTab("committees")}
                        className="p-4 rounded-2xl bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 text-blue-300 flex flex-col items-center text-center space-y-2 cursor-pointer transition-all"
                      >
                        <ShieldCheck className="w-6 h-6 text-blue-400" />
                        <span className="text-xs font-bold">Committees (10)</span>
                      </button>

                      <button
                        onClick={() => setActiveTab("admission")}
                        className="p-4 rounded-2xl bg-cyan-600/10 hover:bg-cyan-600/20 border border-cyan-500/20 text-cyan-300 flex flex-col items-center text-center space-y-2 cursor-pointer transition-all"
                      >
                        <GraduationCap className="w-6 h-6 text-cyan-400" />
                        <span className="text-xs font-bold">Admission {admissionYear}</span>
                      </button>

                      <button
                        onClick={() => setActiveTab("fees")}
                        className="p-4 rounded-2xl bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/20 text-emerald-300 flex flex-col items-center text-center space-y-2 cursor-pointer transition-all"
                      >
                        <Receipt className="w-6 h-6 text-emerald-400" />
                        <span className="text-xs font-bold">Fees Structure</span>
                      </button>

                      <button
                        onClick={() => setActiveTab("leadership")}
                        className="p-4 rounded-2xl bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/20 text-purple-300 flex flex-col items-center text-center space-y-2 cursor-pointer transition-all"
                      >
                        <Award className="w-6 h-6 text-purple-400" />
                        <span className="text-xs font-bold">Leadership Cards</span>
                      </button>

                      <button
                        onClick={() => setActiveTab("recruiters")}
                        className="p-4 rounded-2xl bg-amber-600/10 hover:bg-amber-600/20 border border-amber-500/20 text-amber-300 flex flex-col items-center text-center space-y-2 cursor-pointer transition-all"
                      >
                        <Briefcase className="w-6 h-6 text-amber-400" />
                        <span className="text-xs font-bold">Our Recruiters</span>
                      </button>

                      <button
                        onClick={() => setActiveTab("brochure")}
                        className="p-4 rounded-2xl bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 text-blue-300 flex flex-col items-center text-center space-y-2 cursor-pointer transition-all"
                      >
                        <FileText className="w-6 h-6 text-blue-400" />
                        <span className="text-xs font-bold">Placement Brochure</span>
                      </button>

                      <button
                        onClick={() => openCreateModal("faculty")}
                        className="p-4 rounded-2xl bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 text-blue-300 flex flex-col items-center text-center space-y-2 cursor-pointer transition-all"
                      >
                        <Users className="w-6 h-6 text-blue-400" />
                        <span className="text-xs font-bold">Add Faculty</span>
                      </button>

                      <button
                        onClick={() => openCreateModal("syllabus")}
                        className="p-4 rounded-2xl bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 text-indigo-300 flex flex-col items-center text-center space-y-2 cursor-pointer transition-all"
                      >
                        <BookOpen className="w-6 h-6 text-indigo-400" />
                        <span className="text-xs font-bold">Upload Syllabus PDF</span>
                      </button>

                      <button
                        onClick={() => openCreateModal("notice")}
                        className="p-4 rounded-2xl bg-amber-600/10 hover:bg-amber-600/20 border border-amber-500/20 text-amber-300 flex flex-col items-center text-center space-y-2 cursor-pointer transition-all"
                      >
                        <Bell className="w-6 h-6 text-amber-400" />
                        <span className="text-xs font-bold">Post Notice / Tender</span>
                      </button>

                      <button
                        onClick={() => setActiveTab("settings")}
                        className="p-4 rounded-2xl bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/20 text-emerald-300 flex flex-col items-center text-center space-y-2 cursor-pointer transition-all"
                      >
                        <KeyRound className="w-6 h-6 text-emerald-400" />
                        <span className="text-xs font-bold">Change Credentials</span>
                      </button>
                    </div>
                  </div>

                  {/* Summary Lists Preview */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Faculty */}
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-white">Faculty Members ({facultyList.length})</h4>
                        <button onClick={() => setActiveTab("faculty")} className="text-xs text-blue-400 hover:underline">View All</button>
                      </div>
                      <div className="space-y-3">
                        {facultyList.slice(0, 4).map((f) => (
                          <div key={f.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
                            <div className="flex items-center space-x-3">
                              <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 font-bold flex items-center justify-center">
                                {f.name[0]}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-white">{f.name}</p>
                                <p className="text-xs text-slate-400">{f.designation} • {f.department}</p>
                              </div>
                            </div>
                            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20">{f.department}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent Notices */}
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-white">Recent Notices ({noticesList.length})</h4>
                        <button onClick={() => setActiveTab("notices")} className="text-xs text-blue-400 hover:underline">View All</button>
                      </div>
                      <div className="space-y-3">
                        {noticesList.slice(0, 4).map((n) => (
                          <div key={n.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
                            <div>
                              <p className="text-sm font-bold text-white truncate max-w-xs">{n.title}</p>
                              <p className="text-xs text-slate-400">{n.category} • {new Date(n.createdAt).toLocaleDateString()}</p>
                            </div>
                            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20">{n.priority}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* 2. FACULTY MANAGEMENT TAB */}
              {/* ========================================================================= */}
              {activeTab === "faculty" && (
                <div className="space-y-6">
                  {/* Department Filters & Search */}
                  <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedDeptFilter("ALL")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          selectedDeptFilter === "ALL" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white"
                        }`}
                      >
                        ALL
                      </button>
                      {DEPARTMENTS.map((dept) => (
                        <button
                          key={dept}
                          onClick={() => setSelectedDeptFilter(dept)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            selectedDeptFilter === dept ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white"
                          }`}
                        >
                          {dept}
                        </button>
                      ))}
                    </div>

                    <div className="relative w-full sm:w-64">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search faculty..."
                        className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Faculty Table / Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {facultyList
                      .filter((f) => selectedDeptFilter === "ALL" || f.department === selectedDeptFilter)
                      .filter((f) => f.name.toLowerCase().includes(searchQuery.toLowerCase()) || f.email.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((faculty) => (
                        <div key={faculty.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 relative overflow-hidden shadow-xl flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-3 mb-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 rounded-2xl bg-blue-900/40 border border-blue-500/30 overflow-hidden relative shrink-0">
                                  {faculty.image ? (
                                    <Image src={faculty.image} alt={faculty.name} fill className="object-cover" />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center font-bold text-blue-400">{faculty.name[0]}</div>
                                  )}
                                </div>
                                <div>
                                  <h4 className="font-extrabold text-white text-base leading-snug">{faculty.name}</h4>
                                  <p className="text-xs text-blue-400 font-medium">{faculty.designation}</p>
                                </div>
                              </div>
                              <span className="px-2 py-0.5 text-xs font-bold bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-md shrink-0">
                                {faculty.department}
                              </span>
                            </div>

                            <div className="space-y-1.5 text-xs text-slate-400 mb-4 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80">
                              <div className="flex items-center space-x-2">
                                <Mail className="w-3.5 h-3.5 text-slate-500" />
                                <span className="truncate">{faculty.email}</span>
                              </div>
                              {faculty.experience && (
                                <div className="flex items-center space-x-2">
                                  <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                                  <span>Experience: {faculty.experience}</span>
                                </div>
                              )}
                              {faculty.specialization && faculty.specialization.length > 0 && (
                                <p className="text-[11px] text-slate-400 mt-2 line-clamp-2">
                                  <strong className="text-slate-300">Spec:</strong> {Array.isArray(faculty.specialization) ? faculty.specialization.join(", ") : faculty.specialization}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-800">
                            <button
                              onClick={() => openEditModal("faculty", faculty)}
                              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
                              title="Edit Faculty"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete("faculty", faculty.id, faculty.name)}
                              className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white transition-all cursor-pointer"
                              title="Delete Faculty"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* 3. SYLLABUS & PDF MANAGEMENT TAB */}
              {/* ========================================================================= */}
              {activeTab === "syllabus" && (
                <div className="space-y-6">
                  {/* Filter bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedDeptFilter("ALL")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          selectedDeptFilter === "ALL" ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white"
                        }`}
                      >
                        ALL
                      </button>
                      {DEPARTMENTS.map((dept) => (
                        <button
                          key={dept}
                          onClick={() => setSelectedDeptFilter(dept)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            selectedDeptFilter === dept ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white"
                          }`}
                        >
                          {dept}
                        </button>
                      ))}
                    </div>

                    <div className="relative w-full sm:w-64">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search syllabus..."
                        className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  {/* Syllabus Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {syllabusList
                      .filter((s) => selectedDeptFilter === "ALL" || s.department === selectedDeptFilter)
                      .filter((s) => s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.semester.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((item) => (
                        <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between shadow-xl">
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-3">
                              <span className="px-2.5 py-1 text-xs font-extrabold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-lg">
                                {item.department} • {item.semester}
                              </span>
                              {item.academicYear && <span className="text-[11px] text-slate-400">{item.academicYear}</span>}
                            </div>

                            <h4 className="font-bold text-white text-base mb-2">{item.title}</h4>
                            {item.description && <p className="text-xs text-slate-400 mb-4">{item.description}</p>}
                          </div>

                          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                            <a
                              href={item.pdfLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-bold"
                            >
                              <FileText className="w-4 h-4" />
                              <span>View PDF</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>

                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => openEditModal("syllabus", item)}
                                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDelete("syllabus", item.id, item.title)}
                                className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white transition-all cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* 4. NOTICES MANAGEMENT TAB */}
              {/* ========================================================================= */}
              {activeTab === "notices" && (
                <div className="space-y-6">
                  {/* Notices list */}
                  <div className="space-y-4">
                    {noticesList.map((notice) => (
                      <div key={notice.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
                        <div className="space-y-2 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2.5 py-0.5 text-[11px] font-extrabold uppercase bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded-md">
                              {notice.category}
                            </span>
                            <span
                              className={`px-2.5 py-0.5 text-[11px] font-extrabold uppercase rounded-md ${
                                notice.priority === "URGENT"
                                  ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                                  : notice.priority === "HIGH"
                                  ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                                  : "bg-blue-500/10 text-blue-300 border border-blue-500/20"
                              }`}
                            >
                              {notice.priority}
                            </span>
                            <span className="text-xs text-slate-500">
                              {new Date(notice.createdAt).toLocaleDateString()}
                            </span>
                          </div>

                          <h3 className="text-lg font-bold text-white">{notice.title}</h3>
                          <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">{notice.content}</p>

                          {notice.attachment && (
                            <a
                              href={notice.attachment}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-blue-400 hover:underline pt-1 font-semibold"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>View Attached Document</span>
                            </a>
                          )}
                        </div>

                        <div className="flex items-center space-x-2 shrink-0">
                          <button
                            onClick={() => openEditModal("notice", notice)}
                            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete("notices", notice.id, notice.title)}
                            className="p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white transition-all cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* 5. DEPARTMENT LABS TAB */}
              {/* ========================================================================= */}
              {activeTab === "labs" && (
                <div className="space-y-6">
                  {/* Department Filter Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-slate-400 mr-2">Department:</span>
                      {["ALL", ...DEPARTMENTS].map((dept) => (
                        <button
                          key={dept}
                          onClick={() => setSelectedDeptFilter(dept)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            selectedDeptFilter === dept
                              ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                              : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
                          }`}
                        >
                          {dept}
                        </button>
                      ))}
                    </div>

                    <div className="text-xs font-bold text-slate-400">
                      Total Labs:{" "}
                      <span className="text-white">
                        {
                          labsList.filter(
                            (l) => selectedDeptFilter === "ALL" || l.department?.toUpperCase() === selectedDeptFilter
                          ).length
                        }
                      </span>
                    </div>
                  </div>

                  {/* Clean Labs Table */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-slate-950/80 text-slate-400 text-xs font-extrabold uppercase tracking-wider border-b border-slate-800">
                          <tr>
                            <th className="px-6 py-4 w-16 text-center">SL.</th>
                            <th className="px-6 py-4 w-28">DEPT</th>
                            <th className="px-6 py-4 w-1/4">LABORATORY NAME</th>
                            <th className="px-6 py-4">DETAILS & EQUIPMENT</th>
                            <th className="px-6 py-4 w-28 text-right">ACTIONS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                          {labsList
                            .filter(
                              (l) => selectedDeptFilter === "ALL" || l.department?.toUpperCase() === selectedDeptFilter
                            )
                            .map((lab, index) => (
                              <tr key={lab.id} className="hover:bg-slate-800/40 transition-colors">
                                <td className="px-6 py-4 text-center font-bold text-slate-500 text-xs align-top pt-5">
                                  {index + 1}
                                </td>
                                <td className="px-6 py-4 align-top pt-5">
                                  <span className="px-2.5 py-1 text-[11px] font-extrabold bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md">
                                    {lab.department}
                                  </span>
                                </td>
                                <td className="px-6 py-4 align-top pt-5">
                                  <p className="font-bold text-white text-sm">{lab.name}</p>
                                  {lab.roomNumber && (
                                    <p className="text-[11px] text-slate-400 mt-1">📍 {lab.roomNumber}</p>
                                  )}
                                </td>
                                <td className="px-6 py-4 text-slate-300 text-xs leading-relaxed align-top pt-5">
                                  {lab.description || "-"}
                                </td>
                                <td className="px-6 py-4 text-right align-top pt-4">
                                  <div className="flex items-center justify-end space-x-2">
                                    <button
                                      onClick={() => openEditModal("lab", lab)}
                                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
                                      title="Edit Lab"
                                    >
                                      <Edit className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => handleDelete("labs", lab.id, lab.name)}
                                      className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white transition-all cursor-pointer"
                                      title="Delete Lab"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* 6. CAMPUS GALLERY TAB */}
              {/* ========================================================================= */}
              {activeTab === "gallery" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {galleryList.map((item) => (
                      <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl group relative">
                        <div className="relative h-48 w-full bg-slate-950">
                          <Image src={item.imageUrl} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          <span className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-extrabold uppercase bg-blue-600/80 backdrop-blur-md text-white rounded-md">
                            {item.category}
                          </span>
                          <button
                            onClick={() => handleDelete("gallery", item.id, item.title)}
                            className="absolute top-3 right-3 p-1.5 bg-rose-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                            title="Delete image"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold text-white text-sm truncate">{item.title}</h4>
                          {item.description && <p className="text-xs text-slate-400 truncate mt-1">{item.description}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* 7. ADMIN CREDENTIALS & ACCOUNT SECURITY TAB */}
              {/* ========================================================================= */}
              {activeTab === "wallmagazine" && (
                <div className="space-y-6">
                  {wallMagazineList.length === 0 ? (
                    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-16 text-center">
                      <Newspaper className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                      <h4 className="text-lg font-bold text-white mb-1">No Wall Magazine Issues Yet</h4>
                      <p className="text-xs text-slate-400 mb-5">Add wall magazine covers and pages to showcase CGEC publications.</p>
                      <button
                        onClick={() => openCreateModal("wallmagazine")}
                        className="px-5 py-2.5 bg-purple-600 text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-purple-500 transition-all"
                      >
                        Add First Issue
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                      {wallMagazineList.map((mag) => (
                        <div key={mag.id} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl group flex flex-col">
                          {/* Cover Image */}
                          <div className="relative h-56 w-full bg-slate-950 shrink-0">
                            {mag.imageUrl ? (
                              <Image src={mag.imageUrl} alt={mag.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Newspaper className="w-12 h-12 text-slate-600" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            {/* Edition badge */}
                            {mag.edition && (
                              <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-extrabold uppercase bg-purple-600/90 backdrop-blur-sm text-white rounded-lg">
                                {mag.edition}
                              </span>
                            )}
                            {/* Year badge */}
                            {mag.year && (
                              <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-extrabold bg-slate-900/80 backdrop-blur-sm text-slate-200 rounded-lg border border-slate-700">
                                {mag.year}
                              </span>
                            )}
                            {/* Title overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-3">
                              <h4 className="font-extrabold text-white text-sm leading-tight line-clamp-2">{mag.title}</h4>
                              {mag.department && <p className="text-[11px] text-slate-400 mt-0.5">{mag.department}</p>}
                            </div>
                          </div>

                          {/* Card Body */}
                          <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                            {mag.description && (
                              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{mag.description}</p>
                            )}
                            {mag.pdfLink && (
                              <a
                                href={mag.pdfLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 font-bold"
                              >
                                <FileText className="w-3.5 h-3.5" />
                                <span>Download PDF</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}

                            <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-800">
                              <button
                                onClick={() => openEditModal("wallmagazine", mag)}
                                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
                                title="Edit Magazine"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDelete("wall-magazine", mag.id, mag.title)}
                                className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white transition-all cursor-pointer"
                                title="Delete Magazine"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* COMMITTEES TAB */}
              {activeTab === "committees" && <CommitteesTab adminToken={adminToken} />}

              {/* ADMISSION TAB */}
              {activeTab === "admission" && (
                <AdmissionTab adminToken={adminToken} onYearChange={(newYear) => setAdmissionYear(newYear)} />
              )}

              {/* FEES STRUCTURE TAB */}
              {activeTab === "fees" && <FeesTab adminToken={adminToken} />}

              {/* LEADERSHIP MESSAGES TAB */}
              {activeTab === "leadership" && <LeadershipTab adminToken={adminToken} />}

              {/* RECRUITERS TAB */}
              {activeTab === "recruiters" && <RecruitersTab adminToken={adminToken} />}

              {/* PLACEMENT BROCHURE TAB */}
              {activeTab === "brochure" && <PlacementBrochureTab adminToken={adminToken} />}

              {/* ========================================================================= */}
              {/* ADMIN CREDENTIALS & ACCOUNT SECURITY TAB */}
              {/* ========================================================================= */}
              {activeTab === "settings" && (
                <div className="max-w-4xl space-y-8">
                  <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500" />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-800">
                      <div>
                        <div className="flex items-center space-x-3 mb-1">
                          <div className="p-2.5 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                            <KeyRound className="w-6 h-6" />
                          </div>
                          <div>
                            <h2 className="text-xl font-extrabold text-white">Administrator Credentials</h2>
                            <p className="text-xs text-slate-400">Update admin username/email and login security password.</p>
                          </div>
                        </div>
                      </div>

                      <div className="px-3.5 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-bold flex items-center space-x-2 w-fit">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>Protected SuperAdmin Account</span>
                      </div>
                    </div>

                    <form onSubmit={handleProfileSubmit} className="space-y-8">
                      {/* Section 1: Administrator Information */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 text-sm font-bold text-slate-200">
                          <UserCheck className="w-4 h-4 text-blue-400" />
                          <span>Admin Profile Details</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                              Administrator Full Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={profileForm.name}
                              onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                              placeholder="e.g. CGEC Super Administrator"
                              className="w-full px-4 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                              Admin Login Email / Username *
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                <Mail className="w-4 h-4" />
                              </div>
                              <input
                                type="email"
                                required
                                value={profileForm.email}
                                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                                placeholder="admin@cgec.org.in"
                                className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                              />
                            </div>
                            <p className="text-[11px] text-slate-500">This email/username will be required to log in at /admin/login/cgec</p>
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Change Security Password */}
                      <div className="space-y-4 pt-6 border-t border-slate-800">
                        <div className="flex items-center space-x-2 text-sm font-bold text-slate-200">
                          <Lock className="w-4 h-4 text-indigo-400" />
                          <span>Change Admin Password (Leave blank to keep unchanged)</span>
                        </div>

                        <div className="space-y-5">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                              Current Password (Optional if verifying)
                            </label>
                            <div className="relative max-w-md">
                              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                <Lock className="w-4 h-4" />
                              </div>
                              <input
                                type={showCurrentPass ? "text" : "password"}
                                value={profileForm.currentPassword}
                                onChange={(e) => setProfileForm({ ...profileForm, currentPassword: e.target.value })}
                                placeholder="Enter current password if changing"
                                className="w-full pl-10 pr-11 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                              />
                              <button
                                type="button"
                                onClick={() => setShowCurrentPass(!showCurrentPass)}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300"
                              >
                                {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                                New Password
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                  <Lock className="w-4 h-4" />
                                </div>
                                <input
                                  type={showNewPass ? "text" : "password"}
                                  value={profileForm.newPassword}
                                  onChange={(e) => setProfileForm({ ...profileForm, newPassword: e.target.value })}
                                  placeholder="Min 6 characters"
                                  className="w-full pl-10 pr-11 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowNewPass(!showNewPass)}
                                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300"
                                >
                                  {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                                Confirm New Password
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                  <Lock className="w-4 h-4" />
                                </div>
                                <input
                                  type={showConfirmPass ? "text" : "password"}
                                  value={profileForm.confirmPassword}
                                  onChange={(e) => setProfileForm({ ...profileForm, confirmPassword: e.target.value })}
                                  placeholder="Re-type new password"
                                  className="w-full pl-10 pr-11 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300"
                                >
                                  {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>


                      {/* Submit Button */}
                      <div className="flex justify-end pt-4 border-t border-slate-800">
                        <button
                          type="submit"
                          disabled={profileSaveLoading}
                          className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold transition-all duration-200 shadow-lg shadow-blue-600/30 flex items-center space-x-2 cursor-pointer disabled:opacity-50"
                        >
                          {profileSaveLoading ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              <span>Updating Credentials...</span>
                            </>
                          ) : (
                            <>
                              <Save className="w-5 h-5" />
                              <span>Save & Apply New Credentials</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* ========================================================================= */}
      {/* GLOBAL MODAL DIALOG */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/90 backdrop-blur-md z-10">
                <div>
                  <h3 className="text-lg font-extrabold text-white">
                    {editingItem ? "Edit" : "Add"}{" "}
                    {modalType === "faculty"
                      ? "Faculty Member"
                      : modalType === "syllabus"
                      ? "Syllabus & PDF"
                      : modalType === "notice"
                      ? "Notice / Announcement"
                      : modalType === "lab"
                      ? "Department Lab"
                      : modalType === "wallmagazine"
                      ? "Wall Magazine Issue"
                      : "Gallery Photo"}
                  </h3>
                  <p className="text-xs text-slate-400">Fill in the details below to update records.</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Form Content */}
              <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
                {/* 1. FACULTY FORM */}
                {modalType === "faculty" && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-300">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={facultyForm.name}
                          onChange={(e) => setFacultyForm({ ...facultyForm, name: e.target.value })}
                          placeholder="e.g. Dr. Somen Mondal"
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-300">Designation *</label>
                        <input
                          type="text"
                          required
                          value={facultyForm.designation}
                          onChange={(e) => setFacultyForm({ ...facultyForm, designation: e.target.value })}
                          placeholder="e.g. Assistant Professor & HOD"
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-300">Department *</label>
                        <select
                          value={facultyForm.department}
                          onChange={(e) => setFacultyForm({ ...facultyForm, department: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                        >
                          {DEPARTMENTS.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-300">Official Email *</label>
                        <input
                          type="email"
                          required
                          value={facultyForm.email}
                          onChange={(e) => setFacultyForm({ ...facultyForm, email: e.target.value })}
                          placeholder="e.g. smondal@cgec.org.in"
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-300">Experience</label>
                        <input
                          type="text"
                          value={facultyForm.experience}
                          onChange={(e) => setFacultyForm({ ...facultyForm, experience: e.target.value })}
                          placeholder="e.g. 9 Years"
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-300">Phone Number</label>
                        <input
                          type="text"
                          value={facultyForm.phone}
                          onChange={(e) => setFacultyForm({ ...facultyForm, phone: e.target.value })}
                          placeholder="+91 9876543210"
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Qualifications (comma separated)</label>
                      <input
                        type="text"
                        value={facultyForm.qualifications}
                        onChange={(e) => setFacultyForm({ ...facultyForm, qualifications: e.target.value })}
                        placeholder="B.Tech (CSE), M.Tech (IIT), Ph.D"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Specialization / Research Areas</label>
                      <input
                        type="text"
                        value={facultyForm.specialization}
                        onChange={(e) => setFacultyForm({ ...facultyForm, specialization: e.target.value })}
                        placeholder="Machine Learning, Cloud Computing, Cybersecurity"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Faculty Photo */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-slate-300">Photo URL / Path</label>
                          <label className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-400 hover:text-blue-300 cursor-pointer bg-blue-500/10 hover:bg-blue-500/20 px-2 py-0.5 rounded-md transition-all border border-blue-500/20">
                            {uploadingField === "faculty-photo" ? (
                              <>
                                <Loader2 className="w-3 h-3 animate-spin text-blue-400" />
                                <span>Uploading...</span>
                              </>
                            ) : (
                              <>
                                <UploadCloud className="w-3 h-3 text-blue-400" />
                                <span>Upload Device Image</span>
                              </>
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              disabled={uploadingField === "faculty-photo"}
                              onChange={(e) =>
                                handleFileUpload(
                                  e,
                                  (url, publicId) => setFacultyForm((prev) => ({ ...prev, image: url, imagePublicId: publicId || prev.imagePublicId })),
                                  "faculty",
                                  "faculty-photo"
                                )
                              }
                            />
                          </label>
                        </div>
                        <input
                          type="text"
                          value={facultyForm.image}
                          onChange={(e) => setFacultyForm({ ...facultyForm, image: e.target.value })}
                          placeholder="/img/Faculty/Somen_P.jpg or https://res.cloudinary.com/..."
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      {/* Faculty CV */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-slate-300">CV PDF Link</label>
                          <label className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-400 hover:text-indigo-300 cursor-pointer bg-indigo-500/10 hover:bg-indigo-500/20 px-2 py-0.5 rounded-md transition-all border border-indigo-500/20">
                            {uploadingField === "faculty-cv" ? (
                              <>
                                <Loader2 className="w-3 h-3 animate-spin text-indigo-400" />
                                <span>Uploading...</span>
                              </>
                            ) : (
                              <>
                                <FileUp className="w-3 h-3 text-indigo-400" />
                                <span>Upload CV PDF</span>
                              </>
                            )}
                            <input
                              type="file"
                              accept=".pdf,application/pdf"
                              className="hidden"
                              disabled={uploadingField === "faculty-cv"}
                              onChange={(e) =>
                                handleFileUpload(
                                  e,
                                  (url, publicId) => setFacultyForm((prev) => ({ ...prev, cvLink: url, cvPublicId: publicId || prev.cvPublicId })),
                                  "faculty_cv",
                                  "faculty-cv"
                                )
                              }
                            />
                          </label>
                        </div>
                        <input
                          type="text"
                          value={facultyForm.cvLink}
                          onChange={(e) => setFacultyForm({ ...facultyForm, cvLink: e.target.value })}
                          placeholder="/data/cse/cv/somen.pdf or https://res.cloudinary.com/..."
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* 2. SYLLABUS FORM */}
                {modalType === "syllabus" && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-300">Department *</label>
                        <select
                          value={syllabusForm.department}
                          onChange={(e) => setSyllabusForm({ ...syllabusForm, department: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                        >
                          {DEPARTMENTS.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-300">Semester *</label>
                        <select
                          value={syllabusForm.semester}
                          onChange={(e) => setSyllabusForm({ ...syllabusForm, semester: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                        >
                          {SEMESTERS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Syllabus Title *</label>
                      <input
                        type="text"
                        required
                        value={syllabusForm.title}
                        onChange={(e) => setSyllabusForm({ ...syllabusForm, title: e.target.value })}
                        placeholder="e.g. B.Tech Computer Science & Engineering 3rd Sem AICTE Model Syllabus"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Syllabus PDF Upload */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-slate-300">PDF Download Link / URL *</label>
                          <label className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-400 hover:text-indigo-300 cursor-pointer bg-indigo-500/10 hover:bg-indigo-500/20 px-2 py-0.5 rounded-md transition-all border border-indigo-500/20">
                            {uploadingField === "syllabus-pdf" ? (
                              <>
                                <Loader2 className="w-3 h-3 animate-spin text-indigo-400" />
                                <span>Uploading...</span>
                              </>
                            ) : (
                              <>
                                <FileUp className="w-3 h-3 text-indigo-400" />
                                <span>Upload Syllabus PDF</span>
                              </>
                            )}
                            <input
                              type="file"
                              accept=".pdf,application/pdf"
                              className="hidden"
                              disabled={uploadingField === "syllabus-pdf"}
                              onChange={(e) =>
                                handleFileUpload(
                                  e,
                                  (url, publicId) => setSyllabusForm((prev) => ({ ...prev, pdfLink: url, pdfPublicId: publicId || prev.pdfPublicId })),
                                  "syllabus",
                                  "syllabus-pdf"
                                )
                              }
                            />
                          </label>
                        </div>
                        <input
                          type="text"
                          required
                          value={syllabusForm.pdfLink}
                          onChange={(e) => setSyllabusForm({ ...syllabusForm, pdfLink: e.target.value })}
                          placeholder="/data/cse/BTECH_CSE_SEM3.pdf or https://res.cloudinary.com/..."
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-300">Academic Year</label>
                        <input
                          type="text"
                          value={syllabusForm.academicYear}
                          onChange={(e) => setSyllabusForm({ ...syllabusForm, academicYear: e.target.value })}
                          placeholder="2025-2026"
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Description</label>
                      <textarea
                        rows={3}
                        value={syllabusForm.description}
                        onChange={(e) => setSyllabusForm({ ...syllabusForm, description: e.target.value })}
                        placeholder="Brief overview of course subjects and MAKAUT credit scheme..."
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </>
                )}

                {/* 3. NOTICE FORM */}
                {modalType === "notice" && (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Notice Title *</label>
                      <input
                        type="text"
                        required
                        value={noticeForm.title}
                        onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                        placeholder="e.g. Schedule of 4th Semester Regular & Backlog Examinations 2026"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-300">Category *</label>
                        <select
                          value={noticeForm.category}
                          onChange={(e) => setNoticeForm({ ...noticeForm, category: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                        >
                          {NOTICE_CATEGORIES.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-300">Priority *</label>
                        <select
                          value={noticeForm.priority}
                          onChange={(e) => setNoticeForm({ ...noticeForm, priority: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                        >
                          {NOTICE_PRIORITIES.map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-300">Expiry Date</label>
                        <input
                          type="date"
                          value={noticeForm.expiryDate}
                          onChange={(e) => setNoticeForm({ ...noticeForm, expiryDate: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Notice Body Content *</label>
                      <textarea
                        required
                        rows={4}
                        value={noticeForm.content}
                        onChange={(e) => setNoticeForm({ ...noticeForm, content: e.target.value })}
                        placeholder="Detailed notice text, instructions, dates, and guidelines..."
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    {/* Notice Attachment Upload */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-300">Attachment / Circular PDF Link</label>
                        <label className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300 cursor-pointer bg-amber-500/10 hover:bg-amber-500/20 px-2 py-0.5 rounded-md transition-all border border-amber-500/20">
                          {uploadingField === "notice-attach" ? (
                            <>
                              <Loader2 className="w-3 h-3 animate-spin text-amber-400" />
                              <span>Uploading...</span>
                            </>
                          ) : (
                            <>
                              <UploadCloud className="w-3 h-3 text-amber-400" />
                              <span>Upload Document / PDF</span>
                            </>
                          )}
                          <input
                            type="file"
                            accept=".pdf,image/*,application/pdf"
                            className="hidden"
                            disabled={uploadingField === "notice-attach"}
                            onChange={(e) =>
                              handleFileUpload(
                                e,
                                (url, publicId) => setNoticeForm((prev) => ({ ...prev, attachment: url, attachmentPublicId: publicId || prev.attachmentPublicId })),
                                "notices",
                                "notice-attach"
                              )
                            }
                          />
                        </label>
                      </div>
                      <input
                        type="text"
                        value={noticeForm.attachment}
                        onChange={(e) => setNoticeForm({ ...noticeForm, attachment: e.target.value })}
                        placeholder="/data/notices/exam_schedule_2026.pdf or https://res.cloudinary.com/..."
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </>
                )}

                {/* 4. LAB FORM */}
                {modalType === "lab" && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-300">Department *</label>
                        <select
                          value={labForm.department}
                          onChange={(e) => setLabForm({ ...labForm, department: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                        >
                          {DEPARTMENTS.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-300">Room / Location (Optional)</label>
                        <input
                          type="text"
                          value={labForm.roomNumber}
                          onChange={(e) => setLabForm({ ...labForm, roomNumber: e.target.value })}
                          placeholder="e.g. Room 302, Academic Block"
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Laboratory Name *</label>
                      <input
                        type="text"
                        required
                        value={labForm.name}
                        onChange={(e) => setLabForm({ ...labForm, name: e.target.value })}
                        placeholder="e.g. Computer Center, Language Lab, Network Lab"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Details & Equipment *</label>
                      <textarea
                        required
                        rows={4}
                        value={labForm.description}
                        onChange={(e) => setLabForm({ ...labForm, description: e.target.value })}
                        placeholder="This lab is equipped with 100 computers (i5 processor, 4/8GB RAM, Windows 8.1 OS), 1 Smart projector. This lab is used to perform C programming, Data Structures according to MAKAUT curriculum."
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </>
                )}

                {/* 5. GALLERY FORM */}
                {modalType === "gallery" && (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Photo Title *</label>
                      <input
                        type="text"
                        required
                        value={galleryForm.title}
                        onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                        placeholder="e.g. Annual Tech Fest 2026 Opening Ceremony"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-300">Category *</label>
                        <select
                          value={galleryForm.category}
                          onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                        >
                          {GALLERY_CATEGORIES.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Gallery Photo Upload */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-slate-300">Image URL / Path *</label>
                          <label className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-400 hover:text-blue-300 cursor-pointer bg-blue-500/10 hover:bg-blue-500/20 px-2 py-0.5 rounded-md transition-all border border-blue-500/20">
                            {uploadingField === "gallery-photo" ? (
                              <>
                                <Loader2 className="w-3 h-3 animate-spin text-blue-400" />
                                <span>Uploading...</span>
                              </>
                            ) : (
                              <>
                                <ImagePlus className="w-3 h-3 text-blue-400" />
                                <span>Upload Photo</span>
                              </>
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              disabled={uploadingField === "gallery-photo"}
                              onChange={(e) =>
                                handleFileUpload(
                                  e,
                                  (url, publicId) => setGalleryForm((prev) => ({ ...prev, imageUrl: url, imagePublicId: publicId || prev.imagePublicId })),
                                  "gallery",
                                  "gallery-photo"
                                )
                              }
                            />
                          </label>
                        </div>
                        <input
                          type="text"
                          required
                          value={galleryForm.imageUrl}
                          onChange={(e) => setGalleryForm({ ...galleryForm, imageUrl: e.target.value })}
                          placeholder="/img/hero/slider-1.jpg or https://res.cloudinary.com/..."
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Description</label>
                      <input
                        type="text"
                        value={galleryForm.description}
                        onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                        placeholder="Main entrance and central academic lawns"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </>
                )}

                {/* 6. WALL MAGAZINE FORM */}
                {modalType === "wallmagazine" && (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Magazine Title *</label>
                      <input
                        type="text"
                        required
                        value={wallMagazineForm.title}
                        onChange={(e) => setWallMagazineForm({ ...wallMagazineForm, title: e.target.value })}
                        placeholder="e.g. CGEC Wall Magazine – Annual Edition 2025"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-300">Edition</label>
                        <input
                          type="text"
                          value={wallMagazineForm.edition}
                          onChange={(e) => setWallMagazineForm({ ...wallMagazineForm, edition: e.target.value })}
                          placeholder="e.g. Vol. 3, Winter Edition"
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-300">Year</label>
                        <input
                          type="text"
                          value={wallMagazineForm.year}
                          onChange={(e) => setWallMagazineForm({ ...wallMagazineForm, year: e.target.value })}
                          placeholder="e.g. 2025"
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>

                    {/* Wall Magazine Cover Image Upload */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-300">Cover Image URL *</label>
                        <label className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-400 hover:text-purple-300 cursor-pointer bg-purple-500/10 hover:bg-purple-500/20 px-2 py-0.5 rounded-md transition-all border border-purple-500/20">
                          {uploadingField === "wallmag-cover" ? (
                            <>
                              <Loader2 className="w-3 h-3 animate-spin text-purple-400" />
                              <span>Uploading...</span>
                            </>
                          ) : (
                            <>
                              <ImagePlus className="w-3 h-3 text-purple-400" />
                              <span>Upload Cover Image</span>
                            </>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            disabled={uploadingField === "wallmag-cover"}
                            onChange={(e) =>
                              handleFileUpload(
                                e,
                                (url, publicId) => setWallMagazineForm((prev) => ({ ...prev, imageUrl: url, imagePublicId: publicId || prev.imagePublicId })),
                                "wall_magazine",
                                "wallmag-cover"
                              )
                            }
                          />
                        </label>
                      </div>
                      <input
                        type="text"
                        required
                        value={wallMagazineForm.imageUrl}
                        onChange={(e) => setWallMagazineForm({ ...wallMagazineForm, imageUrl: e.target.value })}
                        placeholder="/img/wall_magazine/cover_2025.jpg or https://res.cloudinary.com/..."
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
                      />
                      <p className="text-[11px] text-slate-500">Paste an existing image URL or click &quot;Upload Cover Image&quot; to pick from your device</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Wall Magazine PDF Upload */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-slate-300">PDF Download Link</label>
                          <label className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-400 hover:text-purple-300 cursor-pointer bg-purple-500/10 hover:bg-purple-500/20 px-2 py-0.5 rounded-md transition-all border border-purple-500/20">
                            {uploadingField === "wallmag-pdf" ? (
                              <>
                                <Loader2 className="w-3 h-3 animate-spin text-purple-400" />
                                <span>Uploading...</span>
                              </>
                            ) : (
                              <>
                                <FileUp className="w-3 h-3 text-purple-400" />
                                <span>Upload Magazine PDF</span>
                              </>
                            )}
                            <input
                              type="file"
                              accept=".pdf,application/pdf"
                              className="hidden"
                              disabled={uploadingField === "wallmag-pdf"}
                              onChange={(e) =>
                                handleFileUpload(
                                  e,
                                  (url, publicId) => setWallMagazineForm((prev) => ({ ...prev, pdfLink: url, pdfPublicId: publicId || prev.pdfPublicId })),
                                  "wall_magazine_pdf",
                                  "wallmag-pdf"
                                )
                              }
                            />
                          </label>
                        </div>
                        <input
                          type="text"
                          value={wallMagazineForm.pdfLink}
                          onChange={(e) => setWallMagazineForm({ ...wallMagazineForm, pdfLink: e.target.value })}
                          placeholder="/data/magazine/cgec_wall_mag_2025.pdf or https://res.cloudinary.com/..."
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-300">Department Tag</label>
                        <input
                          type="text"
                          value={wallMagazineForm.department}
                          onChange={(e) => setWallMagazineForm({ ...wallMagazineForm, department: e.target.value })}
                          placeholder="e.g. CSE, College-wide"
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Description</label>
                      <textarea
                        rows={2}
                        value={wallMagazineForm.description}
                        onChange={(e) => setWallMagazineForm({ ...wallMagazineForm, description: e.target.value })}
                        placeholder="Brief description about this edition..."
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </>
                )}

                {/* Submit & Cancel Buttons */}
                <div className="flex items-center justify-end space-x-3 pt-6 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-sm font-bold transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-all flex items-center space-x-2 shadow-lg shadow-blue-600/30 cursor-pointer disabled:opacity-50"
                  >
                    {formLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <span>{editingItem ? "Save Changes" : "Submit Record"}</span>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
