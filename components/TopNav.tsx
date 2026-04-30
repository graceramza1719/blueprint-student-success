"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { clearBlueprintState } from "@/lib/storage";

export default function TopNav() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 border-b border-[#CADCFC] bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-serif text-xl font-bold text-[#1E2761]">Blueprint</Link>
        <button
          type="button"
          onClick={() => {
            clearBlueprintState();
            router.push("/situation");
          }}
          className="min-h-12 px-2 text-sm font-semibold text-[#1E2761] underline-offset-2 hover:underline"
        >
          Start over
        </button>
      </div>
    </header>
  );
}
