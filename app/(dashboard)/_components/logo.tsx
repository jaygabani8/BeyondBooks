"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Logo() {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith(`/admin`);

  return (
    <Link
      href={isAdminPage ? "/admin/courses" : "/"}
      className="flex items-center gap-x-3 md:justify-around border-b pb-2"
    >
      <Image height={40} width={40} alt="BB" src="/logo.svg" />{" "}
      <p className={cn("text-sky-700 font-[700]")}>BeyondBooks</p>
    </Link>
  );
}
