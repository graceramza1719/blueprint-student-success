"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Layout from "@/components/Layout";
import ProgressBar from "@/components/ProgressBar";
import ValueCard from "@/components/ValueCard";
import { VALUES_STORAGE_KEY } from "@/lib/storage";
import { VALUE_OPTIONS } from "@/lib/values";

export default function ValuesPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showBanner, setShowBanner] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const stored = window.localStorage.getItem(VALUES_STORAGE_KEY);
    if (!stored) return;
    setSelected((JSON.parse(stored) as string[]).slice(0, 3));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(VALUES_STORAGE_KEY, JSON.stringify(selected));
  }, [selected]);

  function toggleValue(id: string) {
    setSelected((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : prev.length < 3 ? [...prev, id] : prev;
      if (prev.length !== 3 && next.length === 3) {
        setShowBanner(true);
        confetti({ particleCount: 45, spread: 70, origin: { y: 0.2 } });
        window.setTimeout(() => setShowBanner(false), 2000);
      }
      return next;
    });
  }

  const helperText = useMemo(() => {
    if (selected.length === 3) return "Your picks say a lot. Let's see what they lead to.";
    return "Pick your top 3. Go with your gut - your first instinct is usually right.";
  }, [selected.length]);

  return (
    <div className="min-h-screen bg-[#F4F7FC] pb-24">
      <Layout>
        <AnimatePresence>
          {showBanner ? (
            <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -30, opacity: 0 }} className="mb-4 rounded-xl bg-[#E8A020] p-3 text-center font-semibold text-[#1A1A2E]">
              Nice. Now let&apos;s see what fits. 👇
            </motion.div>
          ) : null}
        </AnimatePresence>

        <header className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
          <Breadcrumbs current="values" />
          <h1 className="mt-2 font-serif text-3xl font-bold text-[#1A1A2E]">What matters to you?</h1>
          <p className="mt-2 text-base text-[#5A6A85]">{helperText}</p>
          <div className="mt-4"><ProgressBar step={1} total={2} /></div>
          <p className="mt-2 text-sm text-[#5A6A85]">No career experience needed. No right answers. Just you.</p>
        </header>

        <section className="grid grid-cols-2 gap-3">
          {VALUE_OPTIONS.map((value) => (
            <ValueCard key={value.id} value={value} selected={selected.includes(value.id)} disabled={selected.length === 3} onClick={() => toggleValue(value.id)} />
          ))}
        </section>
      </Layout>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#CADCFC] bg-white p-4">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4">
          <p className="text-sm font-semibold text-[#1E2761]">{selected.length}/3 selected</p>
          <button type="button" disabled={selected.length !== 3} onClick={() => router.push("/results")} className={`min-h-12 rounded-xl px-5 text-base font-bold ${selected.length === 3 ? "bg-[#E8A020] text-[#1A1A2E]" : "bg-gray-300 text-gray-600"}`}>See My Careers →</button>
        </div>
      </div>
    </div>
  );
}
