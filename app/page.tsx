"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#1E2761] text-white">
      <div className="h-2 w-full bg-[#E8A020]" />
      <Layout showNav={false} className="flex min-h-[calc(100vh-8px)] flex-col justify-between text-center">
        <section className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center space-y-5">
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="font-serif text-5xl font-bold tracking-wide sm:text-6xl">BLUEPRINT</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.2 }} className="font-serif text-2xl sm:text-3xl">Career Explorer</motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.4 }} className="space-y-4">
            <p className="text-xl font-semibold leading-8 sm:text-2xl">Find careers that fit your life.</p>
            <p className="mx-auto max-w-md text-lg leading-8 text-[#CADCFC]">
              You do not need a perfect plan. Start with what matters to you, and we will show you real options you can actually reach.
            </p>
            <Link href="/situation" className="mx-auto inline-flex min-h-12 w-full max-w-sm items-center justify-center rounded-xl bg-[#E8A020] px-6 text-lg font-bold text-[#1A1A2E]">Start Exploring →</Link>
            <p className="text-sm text-[#CADCFC]">Takes about 5 minutes · No sign-up required · Free</p>
          </motion.div>
        </section>
        <p className="pb-4 text-xs text-[#CADCFC]">Part of the Blueprint Student Success Program</p>
      </Layout>
    </div>
  );
}
