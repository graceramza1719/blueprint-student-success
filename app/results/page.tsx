"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import CareerCard from "@/components/CareerCard";
import Layout from "@/components/Layout";
import ProgressBar from "@/components/ProgressBar";
import { CAREERS } from "@/lib/careers";
import { matchCareers } from "@/lib/matching";
import { SITUATION_STORAGE_KEY, VALUES_STORAGE_KEY } from "@/lib/storage";
import { isWorking, SituationData } from "@/lib/situation";
import { VALUE_NAME_MAP } from "@/lib/values";

export default function ResultsPage() {
  const [values, setValues] = useState<string[]>([]);
  const [situation, setSituation] = useState<SituationData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const v = window.localStorage.getItem(VALUES_STORAGE_KEY);
    if (!v) return router.replace("/values");
    const parsed = JSON.parse(v) as string[];
    if (parsed.length !== 3) return router.replace("/values");
    setValues(parsed);

    const s = window.localStorage.getItem(SITUATION_STORAGE_KEY);
    if (s) setSituation(JSON.parse(s) as SituationData);
  }, [router]);

  const careers = useMemo(() => matchCareers(values), [values]);
  const namedValues = values.map((id) => VALUE_NAME_MAP[id]).filter(Boolean);
  const matchedIds = new Set(careers.map((career) => career.id));
  const moreCareers = CAREERS.filter((career) => !matchedIds.has(career.id));

  return (
    <div className="min-h-screen bg-[#F4F7FC]">
      <Layout className="space-y-5">
        <header className="rounded-2xl bg-[#CADCFC] p-5">
          <Breadcrumbs current="matches" />
          <p className="mt-2 font-serif text-3xl font-bold text-[#1E2761]">Your Matches</p>
          <div className="mt-3"><ProgressBar step={2} total={2} /></div>
          <p className="mt-4 text-base text-[#2D3748]">These are not random - they match what you actually said matters to you.</p>
          <p className="mt-2 text-base text-[#2D3748]">Based on what you value - {namedValues[0]}, {namedValues[1]}, and {namedValues[2]} - here are careers worth exploring.</p>
        </header>

        {situation?.firstGen === "Yes" ? <div className="rounded-xl bg-[#FFF4D8] p-4 text-sm text-[#1A1A2E]">🎓 <strong>First-gen tip:</strong> All 4 of these careers have strong Pell Grant and first-gen scholarship pathways. You do not need family money to get here.</div> : null}
        {situation && isWorking(situation.workStatus) ? <div className="rounded-xl bg-[#E8F1FF] p-4 text-sm text-[#1A1A2E]">⏰ <strong>For students who work:</strong> All 4 of these careers have part-time or evening training options. You do not have to quit your job to start.</div> : null}

        <section className="space-y-4">
          {careers.map((career, idx) => (
            <motion.div key={career.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.15 }}>
              <CareerCard career={career} whyMatched={`This came up because you value ${VALUE_NAME_MAP[career.matchedValues[0]]} and ${VALUE_NAME_MAP[career.matchedValues[1] ?? career.matchedValues[0]]} - and this career is built around both.`} />
            </motion.div>
          ))}
        </section>

        <section className="rounded-2xl bg-white p-5 shadow-sm">
          <h3 className="font-serif text-2xl font-bold text-[#1A1A2E]">Want to browse other careers too?</h3>
          <p className="mt-2 text-sm text-[#5A6A85]">
            These are not your top matches, but you can still check them out and compare what they pay and how to get there.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {moreCareers.map((career) => (
              <Link
                key={career.id}
                href={`/career/${career.id}`}
                className="inline-flex min-h-12 items-center rounded-full border border-[#4472C4] px-4 text-sm font-semibold text-[#1E2761]"
              >
                {career.title}
              </Link>
            ))}
          </div>
        </section>

        <Link href="/share" className="inline-flex min-h-12 items-center justify-center rounded-xl border-2 border-[#1E2761] bg-white px-5 font-semibold text-[#1E2761]">📋 Take this to your counselor</Link>
      </Layout>
    </div>
  );
}
