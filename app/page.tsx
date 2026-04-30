"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(120deg,#1E2761,#2E4090,#1E2761)] bg-[length:200%_200%] animate-[pulse_8s_ease-in-out_infinite] text-white">
      <div className="h-2 w-full bg-[#E8A020]" />
      <Layout showNav={false} className="flex min-h-[calc(100vh-8px)] flex-col justify-between text-center">
        <section className="space-y-5 pt-10">
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="font-serif text-5xl font-bold tracking-wide">BLUEPRINT</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.2 }} className="font-serif text-2xl">Career Explorer</motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.4 }} className="space-y-4">
            <p className="text-xl font-semibold">Find careers that actually fit your life.</p>
            <p className="text-base leading-7 text-[#CADCFC]">You do not need a private counselor or a perfect plan. Start with what matters to you - your values, your strengths, your real life. We will show you what is possible from there.</p>
            <Link href="/situation" className="mx-auto inline-flex min-h-12 w-full max-w-xs items-center justify-center rounded-xl bg-[#E8A020] px-6 text-lg font-bold text-[#1A1A2E]">Start Exploring →</Link>
            <p className="text-sm text-[#CADCFC]">Takes about 5 minutes · No sign-up required · Free</p>
          </motion.div>
        </section>
        <p className="pb-2 text-xs text-[#CADCFC]">Part of the Blueprint Student Success Program</p>
      </Layout>
    </div>
  );
}
