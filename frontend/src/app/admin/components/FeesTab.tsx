"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Loader2,
  X,
  Save,
  Receipt,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { API_URL } from "@/lib/constants";

interface FeeItem {
  id: string;
  academicYear: string;
  admissionType: "REGULAR" | "LATERAL";
  slNo: string;
  feeHead: string;
  cseEce: string;
  core: string;
  order: number;
}

interface FeesTabProps {
  adminToken: string | null;
}

export default function FeesTab({ adminToken }: FeesTabProps) {
  const [feeItems, setFeeItems] = useState<FeeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeType, setActiveType] = useState<"REGULAR" | "LATERAL">("REGULAR");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FeeItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    academicYear: "2025-26",
    admissionType: "REGULAR" as "REGULAR" | "LATERAL",
    slNo: "",
    feeHead: "",
    cseEce: "",
    core: "",
    order: 0,
  });

  const fetchFeeItems = useCallback(async () => {
    if (!adminToken) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/fees`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setFeeItems(data);
      }
    } catch {
      toast.error("Failed to load fee items");
    } finally {
      setLoading(false);
    }
  }, [adminToken]);

  useEffect(() => {
    fetchFeeItems();
  }, [fetchFeeItems]);

  const currentItems = feeItems.filter((f) => f.admissionType === activeType);

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      academicYear: "2025-26",
      admissionType: activeType,
      slNo: String(currentItems.length + 1),
      feeHead: "",
      cseEce: "",
      core: "",
      order: currentItems.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: FeeItem) => {
    setEditingItem(item);
    setFormData({
      academicYear: item.academicYear,
      admissionType: item.admissionType,
      slNo: item.slNo,
      feeHead: item.feeHead,
      cseEce: item.cseEce,
      core: item.core,
      order: item.order,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminToken) return;
    if (!formData.feeHead.trim() || !formData.cseEce.trim() || !formData.core.trim()) {
      toast.error("Fee Head and Amounts for both department categories are required");
      return;
    }

    setSubmitting(true);
    try {
      const url = editingItem
        ? `${API_URL}/admin/fees/${editingItem.id}`
        : `${API_URL}/admin/fees`;
      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(editingItem ? "Fee item updated!" : "Fee item added!");
        setIsModalOpen(false);
        fetchFeeItems();
      } else {
        const err = await res.json();
        toast.error(err.message || "Failed to save fee item");
      }
    } catch {
      toast.error("Network error while saving fee item");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, head: string) => {
    if (!adminToken) return;
    if (!confirm(`Delete fee head "${head}"?`)) return;

    try {
      const res = await fetch(`${API_URL}/admin/fees/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        toast.success("Fee item deleted");
        setFeeItems((prev) => prev.filter((i) => i.id !== id));
      } else {
        toast.error("Failed to delete item");
      }
    } catch {
      toast.error("Error deleting fee item");
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Receipt className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-bold text-white">Fees Structure Management</h2>
            </div>
            <p className="text-slate-400 text-sm">
              Manage fee breakdown heads, tuition, development fees, and deposits for Regular & Lateral Admissions.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Fee Head</span>
          </button>
        </div>

        {/* Admission Type Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-6 border-t border-slate-800">
          <button
            onClick={() => setActiveType("REGULAR")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeType === "REGULAR"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "bg-slate-800 text-slate-300 hover:text-white"
            }`}
          >
            1st Semester Regular (New Admission)
          </button>
          <button
            onClick={() => setActiveType("LATERAL")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeType === "LATERAL"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "bg-slate-800 text-slate-300 hover:text-white"
            }`}
          >
            3rd Semester Lateral (JELET Admission)
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-3" />
            <p className="text-sm">Loading fee structure...</p>
          </div>
        ) : currentItems.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Receipt className="w-12 h-12 mx-auto text-slate-600 mb-3" />
            <p className="text-base font-semibold text-white mb-1">No Fee Items Added</p>
            <p className="text-sm mb-4">No fee entries configured for {activeType === "REGULAR" ? "1st Sem Regular" : "3rd Sem Lateral"}.</p>
            <button
              onClick={openAddModal}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-500 cursor-pointer inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add First Fee Head
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-800/80 border-b border-slate-700 text-slate-300 font-semibold">
                  <th className="py-3.5 px-4 w-16 text-center">SL. NO.</th>
                  <th className="py-3.5 px-4">FEE STRUCTURE HEAD</th>
                  <th className="py-3.5 px-4 text-center w-40">CSE & ECE (RS.)</th>
                  <th className="py-3.5 px-4 text-center w-40">CE, ME, EE (RS.)</th>
                  <th className="py-3.5 px-4 text-right w-24">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {currentItems.map((item) => {
                  const isTotal = item.slNo.toLowerCase() === "total" || item.feeHead.toLowerCase().includes("total");
                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-slate-800/40 transition-colors ${
                        isTotal ? "bg-slate-800/60 font-bold text-white border-t-2 border-slate-700" : ""
                      }`}
                    >
                      <td className="py-3.5 px-4 text-center font-medium text-slate-400">
                        {item.slNo}
                      </td>
                      <td className={`py-3.5 px-4 ${isTotal ? "text-white font-bold" : "text-slate-200"}`}>
                        {item.feeHead}
                      </td>
                      <td className="py-3.5 px-4 text-center font-semibold text-blue-400">
                        ₹ {item.cseEce}
                      </td>
                      <td className="py-3.5 px-4 text-center font-semibold text-emerald-400">
                        ₹ {item.core}
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
                            onClick={() => handleDelete(item.id, item.feeHead)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-900/40 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-bold text-white">
                  {editingItem ? "Edit Fee Item" : "Add Fee Item"}
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
                  Admission Type
                </label>
                <select
                  value={formData.admissionType}
                  onChange={(e) => setFormData({ ...formData, admissionType: e.target.value as "REGULAR" | "LATERAL" })}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="REGULAR">1st Semester Regular (New Admission)</option>
                  <option value="LATERAL">3rd Semester Lateral Entry (JELET)</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    SL. NO.
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 1 or Total"
                    value={formData.slNo}
                    onChange={(e) => setFormData({ ...formData, slNo: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="col-span-2">
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
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Fee Structure Description / Head *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tuition Fee (July 2025 to December 2025)"
                  value={formData.feeHead}
                  onChange={(e) => setFormData({ ...formData, feeHead: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    CSE & ECE (Rs.) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 6000"
                    value={formData.cseEce}
                    onChange={(e) => setFormData({ ...formData, cseEce: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    CE, ME, EE (Rs.) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 3000"
                    value={formData.core}
                    onChange={(e) => setFormData({ ...formData, core: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
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
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>{editingItem ? "Update Item" : "Save Item"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
