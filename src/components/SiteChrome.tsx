"use client";

import { usePathname } from "next/navigation";
import { PageCurtain, ScrollProgress } from "@/components/FilmOverlays";
import { Navbar } from "@/components/Navbar";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <PageCurtain />
      <ScrollProgress />
      <Navbar />
      <main>{children}</main>
    </>
  );
}
