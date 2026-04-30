"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="fixed left-3 top-3 z-40 min-h-12 rounded-full bg-white px-4 text-sm font-semibold text-[#1E2761] shadow-md ring-1 ring-[#CADCFC]"
    >
      ← Back
    </button>
  );
}
