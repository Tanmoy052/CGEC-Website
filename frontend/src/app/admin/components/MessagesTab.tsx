"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Mail,
  Trash2,
  Search,
  Loader2,
  Calendar,
  Clock,
  User,
  Reply,
  CheckSquare,
  Square,
  AlertTriangle,
  X,
  MessageSquare,
  ExternalLink,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { API_URL } from "@/lib/constants";

export interface ContactMessageItem {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

interface MessagesTabProps {
  adminToken: string | null;
  onCountUpdate?: (count: number) => void;
}

export default function MessagesTab({ adminToken, onCountUpdate }: MessagesTabProps) {
  const [messages, setMessages] = useState<ContactMessageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isBatchDeleting, setIsBatchDeleting] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: "single" | "batch";
    targetId?: string;
    count?: number;
  }>({
    isOpen: false,
    type: "single",
  });

  const onCountUpdateRef = React.useRef(onCountUpdate);
  useEffect(() => {
    onCountUpdateRef.current = onCountUpdate;
  }, [onCountUpdate]);

  // Synchronize count to parent dashboard safely after render
  useEffect(() => {
    onCountUpdateRef.current?.(messages.length);
  }, [messages.length]);

  // Fetch messages from backend
  const fetchMessages = useCallback(async () => {
    if (!adminToken) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/messages`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        const data: ContactMessageItem[] = await res.json();
        setMessages(data);
      } else {
        toast.error("Failed to load contact messages");
      }
    } catch {
      toast.error("Network error while loading messages");
    } finally {
      setLoading(false);
    }
  }, [adminToken]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // Filter messages by search query
  const filteredMessages = useMemo(() => {
    if (!searchQuery.trim()) return messages;
    const q = searchQuery.toLowerCase();
    return messages.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q)
    );
  }, [messages, searchQuery]);

  // Group messages by Date (descending order, latest date group first)
  const groupedMessages = useMemo(() => {
    const groups: { [dateKey: string]: { label: string; dateSortKey: number; items: ContactMessageItem[] } } = {};

    const todayStr = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    filteredMessages.forEach((item) => {
      const d = new Date(item.createdAt);
      const itemDateStr = d.toDateString();
      const dateKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

      let label = d.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      if (itemDateStr === todayStr) {
        label = `Today (${d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })})`;
      } else if (itemDateStr === yesterdayStr) {
        label = `Yesterday (${d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })})`;
      }

      if (!groups[dateKey]) {
        // use start-of-day timestamp for sorting groups
        const startOfDay = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
        groups[dateKey] = { label, dateSortKey: startOfDay, items: [] };
      }
      groups[dateKey].items.push(item);
    });

    // Sort groups descending by dateSortKey
    return Object.values(groups).sort((a, b) => b.dateSortKey - a.dateSortKey);
  }, [filteredMessages]);

  // Selection handlers
  const handleSelectAll = () => {
    if (selectedIds.length === filteredMessages.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredMessages.map((m) => m.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Delete single message
  const handleDeleteSingle = async (id: string) => {
    if (!adminToken) return;
    setDeletingId(id);
    try {
      const res = await fetch(`${API_URL}/admin/messages/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        toast.success("Message deleted successfully");
        setMessages((prev) => prev.filter((m) => m.id !== id));
        setSelectedIds((prev) => prev.filter((item) => item !== id));
      } else {
        toast.error("Failed to delete message");
      }
    } catch {
      toast.error("Network error while deleting message");
    } finally {
      setDeletingId(null);
      setConfirmModal({ isOpen: false, type: "single" });
    }
  };

  // Batch delete selected messages
  const handleBatchDelete = async () => {
    if (!adminToken || selectedIds.length === 0) return;
    setIsBatchDeleting(true);
    try {
      const res = await fetch(`${API_URL}/admin/messages/batch-delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ ids: selectedIds }),
      });
      if (res.ok) {
        const data = await res.json();
        toast.success(data.message || `${selectedIds.length} message(s) deleted`);
        setMessages((prev) => prev.filter((m) => !selectedIds.includes(m.id)));
        setSelectedIds([]);
      } else {
        toast.error("Failed to delete selected messages");
      }
    } catch {
      toast.error("Network error while batch deleting messages");
    } finally {
      setIsBatchDeleting(false);
      setConfirmModal({ isOpen: false, type: "batch" });
    }
  };

  // Helper for generating pre-filled mailto reply link
  const getAutoMailtoLink = (item: ContactMessageItem) => {
    const subject = encodeURIComponent(`Re: ${item.subject}`);
    const body = encodeURIComponent(
      `Dear ${item.name},\n\nThank you for contacting Cooch Behar Government Engineering College regarding "${item.subject}".\n\n\n\nBest regards,\nOffice of Administration & Placement\nCooch Behar Government Engineering College (CGEC)\nWebsite: https://cgec.org.in`
    );
    return `mailto:${item.email}?subject=${subject}&body=${body}`;
  };

  // Format timestamp for display
  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-md">
        {/* Search Field */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by sender, email, subject, or message..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Select All Button */}
          {filteredMessages.length > 0 && (
            <button
              onClick={handleSelectAll}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 transition-all cursor-pointer"
            >
              {selectedIds.length === filteredMessages.length && filteredMessages.length > 0 ? (
                <CheckSquare className="w-4 h-4 text-blue-400" />
              ) : (
                <Square className="w-4 h-4 text-slate-400" />
              )}
              <span>{selectedIds.length === filteredMessages.length ? "Deselect All" : "Select All"}</span>
            </button>
          )}

          {/* Delete Selected Button */}
          {selectedIds.length > 0 && (
            <button
              onClick={() =>
                setConfirmModal({
                  isOpen: true,
                  type: "batch",
                  count: selectedIds.length,
                })
              }
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30 transition-all cursor-pointer animate-fadeIn active:scale-95"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Selected ({selectedIds.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Messages Counter / Status Pill */}
      <div className="flex items-center justify-between px-1 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-blue-400" />
          <span>
            Showing <strong className="text-white">{filteredMessages.length}</strong> of{" "}
            <strong className="text-white">{messages.length}</strong> total messages
          </span>
        </div>
        {selectedIds.length > 0 && (
          <span className="text-blue-400 font-semibold bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
            {selectedIds.length} item(s) selected
          </span>
        )}
      </div>

      {/* Loading State */}
      {loading && messages.length === 0 && (
        <div className="py-20 flex flex-col items-center justify-center space-y-3 bg-slate-900/40 rounded-2xl border border-slate-800/80">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          <p className="text-sm text-slate-400 font-medium">Loading contact messages from database...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredMessages.length === 0 && (
        <div className="py-16 px-4 text-center bg-slate-900/40 rounded-2xl border border-dashed border-slate-800 space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-slate-800/80 text-slate-400 flex items-center justify-center mx-auto">
            <Mail className="w-7 h-7" />
          </div>
          <h3 className="text-white font-bold text-base">
            {searchQuery ? "No matching messages found" : "No contact messages received yet"}
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {searchQuery
              ? `No messages matched "${searchQuery}". Try clearing the search query.`
              : "Messages submitted from the Contact Us page will appear here grouped by date."}
          </p>
        </div>
      )}

      {/* Grouped Messages List */}
      <div className="space-y-8">
        {groupedMessages.map((group) => (
          <div key={group.label} className="space-y-3">
            {/* Date Group Header Banner */}
            <div className="sticky top-0 z-10 py-2.5 px-4 rounded-xl bg-slate-900/95 backdrop-blur-md border border-slate-800/90 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-300">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span>{group.label}</span>
              </div>
              <span className="text-[11px] font-semibold text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700/60">
                {group.items.length} {group.items.length === 1 ? "message" : "messages"}
              </span>
            </div>

            {/* Message Cards in this Date Group (latest msg at top) */}
            <div className="space-y-4">
              {group.items.map((item) => {
                const isSelected = selectedIds.includes(item.id);
                const isDeletingThis = deletingId === item.id;
                const autoMailto = getAutoMailtoLink(item);

                return (
                  <div
                    key={item.id}
                    className={`relative rounded-2xl p-5 sm:p-6 transition-all duration-200 border ${
                      isSelected
                        ? "bg-slate-900/90 border-blue-500/60 shadow-lg shadow-blue-500/5 ring-1 ring-blue-500/40"
                        : "bg-slate-900/60 hover:bg-slate-900 border-slate-800 hover:border-slate-700/80 shadow-md"
                    }`}
                  >
                    {/* Top Row: Checkbox, Sender Name, Time, and Actions */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      {/* Left: Checkbox + User Details */}
                      <div className="flex items-start gap-3 min-w-0">
                        <button
                          type="button"
                          onClick={() => toggleSelectOne(item.id)}
                          className="mt-1 text-slate-400 hover:text-white cursor-pointer shrink-0 transition-colors"
                          aria-label="Select message"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-5 h-5 text-blue-400" />
                          ) : (
                            <Square className="w-5 h-5 text-slate-500 hover:text-slate-400" />
                          )}
                        </button>

                        <div className="min-w-0">
                          {/* Sender Name */}
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-1.5 truncate">
                              <User className="w-4 h-4 text-blue-400 shrink-0" />
                              <span className="truncate">{item.name}</span>
                            </h4>
                          </div>

                          {/* Clickable User Email (Moves to auto-written email) */}
                          <div className="mt-1 flex items-center gap-2 flex-wrap">
                            <a
                              href={autoMailto}
                              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-400 hover:text-blue-300 underline underline-offset-4 decoration-blue-500/50 hover:decoration-blue-300 transition-colors group"
                              title="Click to draft a reply email in your mail client"
                            >
                              <Mail className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform" />
                              <span>{item.email}</span>
                              <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100" />
                            </a>
                            <span className="text-[11px] text-slate-500 font-mono">
                              (Click to reply)
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Timestamp and Action Buttons */}
                      <div className="flex items-center gap-2 shrink-0">
                        {/* Time Received */}
                        <div className="hidden sm:flex items-center gap-1 text-xs text-slate-400 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800 font-mono">
                          <Clock className="w-3.5 h-3.5 text-slate-500" />
                          <span>{formatTime(item.createdAt)}</span>
                        </div>

                        {/* Reply Button */}
                        <a
                          href={autoMailto}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/15 hover:bg-blue-600/25 text-blue-400 hover:text-blue-300 text-xs font-bold transition-all border border-blue-500/30"
                          title="Compose reply email"
                        >
                          <Reply className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Reply</span>
                        </a>

                        {/* Delete Single Button */}
                        <button
                          type="button"
                          onClick={() =>
                            setConfirmModal({
                              isOpen: true,
                              type: "single",
                              targetId: item.id,
                            })
                          }
                          disabled={isDeletingThis}
                          className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer disabled:opacity-50"
                          title="Delete message"
                          aria-label="Delete message"
                        >
                          {isDeletingThis ? (
                            <Loader2 className="w-4 h-4 animate-spin text-rose-400" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Subject Line */}
                    <div className="mb-3.5 pl-8">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-xs">
                        <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                          Subject:
                        </span>
                        <span className="font-bold text-slate-200">{item.subject}</span>
                      </div>
                    </div>

                    {/* Message Body with Exact Text Formatting */}
                    <div className="pl-8">
                      <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-4 sm:p-5">
                        <p className="text-xs text-slate-400 font-semibold mb-2 uppercase tracking-wider">
                          Message Body
                        </p>
                        <div className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-wrap break-words">
                          {item.message}
                        </div>
                      </div>
                    </div>

                    {/* Mobile Time Display */}
                    <div className="sm:hidden mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                      <span>Received:</span>
                      <span>{formatTime(item.createdAt)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal (Single & Batch) */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">
                  {confirmModal.type === "batch"
                    ? `Delete ${confirmModal.count} Selected Messages?`
                    : "Delete This Contact Message?"}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {confirmModal.type === "batch"
                    ? `Are you sure you want to permanently delete these ${confirmModal.count} messages from the database? This action cannot be undone.`
                    : "Are you sure you want to permanently delete this contact message from the database? This action cannot be undone."}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setConfirmModal({ isOpen: false, type: "single" })}
                className="px-4 py-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirmModal.type === "batch") {
                    handleBatchDelete();
                  } else if (confirmModal.targetId) {
                    handleDeleteSingle(confirmModal.targetId);
                  }
                }}
                disabled={isBatchDeleting || !!deletingId}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow-lg shadow-rose-600/30 transition-all cursor-pointer disabled:opacity-50"
              >
                {(isBatchDeleting || deletingId) && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>
                  {confirmModal.type === "batch" ? "Yes, Delete Selected" : "Yes, Delete Message"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
