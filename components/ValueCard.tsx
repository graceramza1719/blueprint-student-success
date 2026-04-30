"use client";

import { motion } from "framer-motion";
import { ValueOption } from "@/lib/values";

interface ValueCardProps {
  value: ValueOption;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
}

export default function ValueCard({ value, selected, disabled, onClick }: ValueCardProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      animate={selected ? { scale: 1.02 } : { scale: 1 }}
      transition={{ duration: 0.2 }}
      type="button"
      onClick={onClick}
      disabled={disabled && !selected}
      className={`relative min-h-40 rounded-2xl border-2 p-4 text-left transition-all ${
        selected ? "border-[#1E2761] bg-[#1E2761] text-white" : "border-[#1E2761] bg-white text-[#1A1A2E]"
      } ${disabled && !selected ? "opacity-50" : "opacity-100"}`}
    >
      {selected ? <span className="absolute right-3 top-2 text-lg text-[#E8A020]">✓</span> : null}
      <p className={`text-3xl ${selected ? "text-white" : "text-[#1E2761]"}`}>{value.emoji}</p>
      <h3 className="mt-2 font-serif text-lg font-bold">{value.name}</h3>
      <p className={`mt-2 text-sm ${selected ? "text-[#F4F7FC]" : "text-[#5A6A85]"}`}>{value.description}</p>
    </motion.button>
  );
}
