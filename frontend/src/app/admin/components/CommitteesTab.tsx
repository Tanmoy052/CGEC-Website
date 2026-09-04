"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Users,
  Plus,
  Search,
  Edit,
  Trash2,
  Phone,
  Mail,
  Loader2,
  X,
  Save,
  ShieldCheck,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { API_URL } from "@/lib/constants";

export const COMMITTEES_LIST = [
  { slug: "academic", name: "Academic Committee" },
  { slug: "anti-ragging", name: "Anti-ragging Committee" },
  { slug: "anti-ragging-squard", name: "Anti-ragging Squad" },
  { slug: "counsellor", name: "Student Counsellor" },
  { slug: "grc", name: "Grievance Redressal Committee (GRC)" },
  { slug: "icc", name: "Internal Complaint Committee (ICC)" },
  { slug: "iic", name: "Institute Industry Cell (IIC)" },
  { slug: "iqac", name: "Internal Quality Assurance Cell (IQAC)" },
  { slug: "sc-st", name: "Committee for SC & ST" },
  { slug: "student-grc", name: "Student Grievance Redressal Committee" },
];

interface CommitteeMember {
  id: string;
  committee: string;
  name: string;
  position: string;
  department?: string | null;
  phone?: string | null;
  email?: string | null;
  order: number;
}

interface CommitteesTabProps {
  adminToken: string | null;
}

export default function CommitteesTab({ adminToken }: CommitteesTabProps) {
  const [selectedCommittee, setSelectedCommittee] = useState("anti-ragging");
  const [members, setMembers] = useState<CommitteeMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<CommitteeMember | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    committee: "anti-ragging",
    name: "",
    position: "",
    department: "",
    phone: "",
    email: "",
    order: 0,
  });

  const fetchMembers = useCallback(async () => {
    if (!adminToken) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/committees?committee=${selectedCommittee}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setMembers(data);
      }
    } catch {
      toast.error("Failed to load committee members");
    } finally {
      setLoading(false);
    }
  }, [adminToken, selectedCommittee]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const openAddModal = () => {
    setEditingMember(null);
    setFormData({
      committee: selectedCommittee,
      name: "",
      position: "",
      department: "",
      phone: "",
      email: "",
      order: members.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (member: CommitteeMember) => {
    setEditingMember(member);
    setFormData({
      committee: member.committee,
      name: member.name,
      position: member.position,
      department: member.department || "",
      phone: member.phone || "",
      email: member.email || "",
      order: member.order,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminToken) return;
    if (!formData.name.trim() || !formData.position.trim()) {
      toast.error("Name and Position are required");
      return;
    }

    setSubmitting(true);
    try {
      const url = editingMember
        ? `${API_URL}/admin/committees/${editingMember.id}`
        : `${API_URL}/admin/committees`;
      const method = editingMember ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(editingMember ? "Member updated successfully!" : "Member added successfully!");
        setIsModalOpen(false);
        fetchMembers();
      } else {
        const err = await res.json();
        toast.error(err.message || "Failed to save member");
      }
    } catch {
      toast.error("Network error while saving member");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!adminToken) return;
    if (!confirm(`Are you sure you want to remove ${name} from this committee?`)) return;

    try {
      const res = await fetch(`${API_URL}/admin/committees/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        toast.success("Member removed successfully");
        setMembers((prev) => prev.filter((m) => m.id !== id));
      } else {
        toast.error("Failed to delete member");
      }
    } catch {
      toast.error("Error deleting member");
    }
  };

  const filteredMembers = members.filter((m) => {
    const q = searchQuery.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.position.toLowerCase().includes(q) ||
      (m.department && m.department.toLowerCase().includes(q)) ||
      (m.email && m.email.toLowerCase().includes(q)) ||
      (m.phone && m.phone.includes(q))
    );
  });

  const currentCommitteeObj = COMMITTEES_LIST.find((c) => c.slug === selectedCommittee);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-bold text-white">All Committees Management</h2>
            </div>
            <p className="text-slate-400 text-sm">
              Manage members across all 10 college committees in one unified portal.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Committee Selector */}
            <div className="relative">
              <select
                value={selectedCommittee}
                onChange={(e) => setSelectedCommittee(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-white font-semibold text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500 pr-8 cursor-pointer shadow-sm"
              >
                {COMMITTEES_LIST.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={openAddModal}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/30 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Committee Member</span>
            </button>
          </div>
        </div>

        {/* Committee Tab Pill Selector */}
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800">
          {COMMITTEES_LIST.map((c) => {
            const isSelected = selectedCommittee === c.slug;
            return (
              <button
                key={c.slug}
                onClick={() => setSelectedCommittee(c.slug)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20 font-semibold"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/50"
                }`}
              >
                {c.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Member Count */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <span className="font-bold text-white text-base">
            {currentCommitteeObj?.name}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-500/30">
            {members.length} Members
          </span>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search member by name, position..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-3" />
            <p className="text-sm">Loading committee members...</p>
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Users className="w-12 h-12 mx-auto text-slate-600 mb-3" />
            <p className="text-base font-semibold text-white mb-1">No Members Found</p>
            <p className="text-sm mb-4">No members listed under {currentCommitteeObj?.name} yet.</p>
            <button
              onClick={openAddModal}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-500 cursor-pointer inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add First Member
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-800/80 border-b border-slate-700 text-slate-300 font-semibold">
                  <th className="py-3.5 px-4 w-16 text-center">#</th>
                  <th className="py-3.5 px-4">Member Name</th>
                  <th className="py-3.5 px-4">Position / Role</th>
                  <th className="py-3.5 px-4">Department / Affiliation</th>
                  <th className="py-3.5 px-4">Phone</th>
                  <th className="py-3.5 px-4">Email</th>
                  <th className="py-3.5 px-4 text-right w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {filteredMembers.map((member, idx) => (
                  <tr key={member.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 text-center text-slate-400 font-medium">
                      {member.order || idx + 1}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white">
                      {member.name}
                    </td>
                    <td className="py-3.5 px-4 text-blue-300 font-medium">
                      {member.position}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      {member.department || "—"}
                    </td>
                    <td className="py-3.5 px-4">
                      {member.phone ? (
                        <div className="flex items-center gap-1.5 text-slate-300 whitespace-nowrap">
                          <Phone className="w-3.5 h-3.5 text-blue-400" />
                          <span>{member.phone}</span>
                        </div>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      {member.email ? (
                        <div className="flex items-center gap-1.5 text-slate-300">
                          <Mail className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span className="truncate max-w-[180px]">{member.email}</span>
                        </div>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(member)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                          title="Edit member"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(member.id, member.name)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-900/40 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                          title="Delete member"
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

      {/* Add / Edit Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-bold text-white">
                  {editingMember ? "Edit Committee Member" : "Add Committee Member"}
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
                  Committee Target
                </label>
                <select
                  value={formData.committee}
                  onChange={(e) => setFormData({ ...formData, committee: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                >
                  {COMMITTEES_LIST.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Member Full Name *
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

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Position / Role in Committee *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Convenor, Member, Principal (Chairman)"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Department / Organization / Affiliation
                </label>
                <input
                  type="text"
                  placeholder="e.g. Computer Science and Engineering, Police Administration"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 9474848817"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Email ID
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. member@cgec.org.in"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  disabled={submitting}
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-600/30 cursor-pointer"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>{editingMember ? "Update Member" : "Save Member"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
