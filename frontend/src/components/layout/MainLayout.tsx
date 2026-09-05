"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <main className="min-h-screen pt-16 sm:pt-20">
      {children}
    </main>
  );
}
