"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Camera, ImageOff } from "lucide-react";
import { API_URL } from "@/lib/constants";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description?: string | null;
}

const CATEGORIES = ["ALL", "Campus", "Labs", "Events", "Sports", "Cultural"];

const fallbackGallery: GalleryItem[] = [];

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/public/gallery`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setGalleryItems(data);
        } else {
          setGalleryItems(fallbackGallery);
        }
      })
      .catch(() => {
        setGalleryItems(fallbackGallery);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredItems =
    selectedCategory === "ALL"
      ? galleryItems
      : galleryItems.filter((item) => item.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            <span className="font-semibold text-gray-900">Campus Gallery</span>
          </div>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-800 text-white py-14 px-4 shadow-md">
        <div className="container mx-auto max-w-7xl text-center space-y-3">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-2xl mb-2">
            <Camera className="w-8 h-8 text-blue-300" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Campus Life & Gallery</h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Explore glimpses of our state-of-the-art campus, laboratories, academic events, tech fests, and student achievements.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 max-w-7xl space-y-8">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-72 bg-gray-200 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-16 text-center space-y-3 max-w-lg mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <ImageOff className="w-7 h-7" />
            </div>
            <h3 className="text-gray-900 font-bold text-lg">No Gallery Images Uploaded</h3>
            <p className="text-gray-500 text-sm">
              New campus photographs and event captures will be displayed here once uploaded by college administrators.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id || idx}
                className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div className="relative h-64 w-full bg-slate-900 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <span className="absolute top-3 right-3 px-3 py-1 text-xs font-bold bg-black/60 backdrop-blur-md text-white rounded-lg border border-white/10">
                    {item.category || "Campus"}
                  </span>
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-white font-bold text-base leading-snug drop-shadow-md">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {item.description && (
                  <div className="p-4 bg-white">
                    <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">{item.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
