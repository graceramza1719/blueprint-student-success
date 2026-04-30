"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { CAREER_MAP, getCareerExtras } from "@/lib/careers";
import { formatMoney } from "@/lib/matching";
import { clearBlueprintState, SITUATION_STORAGE_KEY } from "@/lib/storage";
import { SituationData, isWorking } from "@/lib/situation";

function monthlyBreakdown(annualSalary: number) {
  const takeHome = Math.round((annualSalary * 0.75) / 12);
  return { takeHome, rent: Math.round(takeHome * 0.42), groceries: Math.round(takeHome * 0.12), transport: Math.round(takeHome * 0.08), utilities: Math.round(takeHome * 0.06), left: Math.round(takeHome * 0.32) };
}

export default function CareerDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [situation, setSituation] = useState<SituationData | null>(null);
  const [progress, setProgress] = useState(0);
  const career = CAREER_MAP[params.id];

  useEffect(() => {
    const saved = window.localStorage.getItem(SITUATION_STORAGE_KEY);
    if (saved) setSituation(JSON.parse(saved) as SituationData);
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!career) return <div className="min-h-screen p-8">Career not found.</div>;

  const extras = getCareerExtras(career);
  const gradeSteps = situation?.grade === "11th" ? extras.pathSteps.grade11 : situation?.grade === "12th" ? extras.pathSteps.grade12 : extras.pathSteps.graduated;
  const start = monthlyBreakdown(career.salaryRange.entry);
  const midValue = Math.round((career.salaryRange.entry + career.salaryRange.max) / 2);
  const mid = monthlyBreakdown(midValue);

  return (
    <div className="min-h-screen bg-[#F4F7FC] pb-24">
      <div className="fixed left-0 top-0 z-50 h-1 bg-[#E8A020]" style={{ width: `${progress}%` }} />
      <Layout className="space-y-4">
        <section className="rounded-2xl bg-[#1E2761] p-5 text-white">
          <p className="text-sm text-[#CADCFC]">Real talk on what this career actually looks like.</p>
          <h1 className="mt-1 font-serif text-4xl font-bold">{career.title}</h1>
          <p className="mt-2 text-base text-[#CADCFC]">{career.tagline}</p>
        </section>

        <section className="rounded-2xl bg-white p-5"><h2 className="font-serif text-2xl font-bold text-[#1A1A2E]">What would your day actually look like?</h2><p className="mt-3 text-base text-[#2D3748]">{career.dayInTheLife}</p></section>

        <section className="rounded-2xl border-2 border-[#E8A020] bg-[#FFF8E8] p-5">
          <h2 className="font-serif text-2xl font-bold text-[#1A1A2E]">What does this actually pay?</h2>
          <div className="mt-4 space-y-4 text-sm text-[#2D3748]">
            <div><p className="font-semibold">Year 1-2 (Starting Out): {formatMoney(career.salaryRange.entry)}/year</p><p>Here is what {formatMoney(career.salaryRange.entry)} actually feels like: about ${start.takeHome}/month after taxes.</p><p>Rent: ~${start.rent} · Groceries: ~${start.groceries} · Transportation: ~${start.transport} · Phone + utilities: ~${start.utilities} · Left: ~${start.left}</p></div>
            <div><p className="font-semibold">Year 5-7: {formatMoney(midValue)}/year</p><p>Estimated take-home: ${mid.takeHome}/month. Left after core bills: about ${mid.left}/month.</p></div>
            <div><p className="font-semibold">Top end: {formatMoney(career.salaryRange.max)}/year</p></div>
          </div>
          <p className="mt-3 text-xs text-[#5A6A85]">Salaries vary by city, employer, and experience. These are national averages - not guarantees, not worst case.</p>
        </section>

        <section className="rounded-2xl border-2 border-[#4472C4] bg-[#EDF3FF] p-5">
          <h2 className="font-serif text-2xl font-bold text-[#1A1A2E]">Your path from here - step by step</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-base text-[#2D3748]">{gradeSteps.map((step) => <li key={step}>{step}</li>)}</ol>
          <p className="mt-2 text-sm text-[#1E2761]">{career.financialAidNote}{situation?.firstGen === "Yes" ? " As a first-gen student, you may qualify for additional grant funding - ask your counselor about first-generation scholarships." : ""}</p>
          {situation && isWorking(situation.workStatus) ? <p className="mt-1 text-sm text-[#1E2761]">Because you are working now, prioritize evening/weekend program options and ask employers about tuition support.</p> : null}
        </section>

        <section className="rounded-2xl bg-white p-5"><h2 className="font-serif text-2xl font-bold text-[#1A1A2E]">Want the full picture?</h2><p className="mt-2 text-sm text-[#2D3748]">O*NET is the U.S. government&apos;s official career database. It can be dense, but it is the real deal.</p><a target="_blank" rel="noreferrer" href={extras.onetUrl} className="mt-3 inline-flex min-h-12 items-center rounded-xl border-2 border-[#E8A020] px-4 font-semibold text-[#1A1A2E]">View {career.title} on O*NET →</a></section>

        <section className="rounded-2xl bg-white p-5"><h2 className="font-serif text-2xl font-bold text-[#1A1A2E]">What can you do THIS week?</h2><ul className="mt-3 list-disc space-y-2 pl-5 text-base text-[#2D3748]">{extras.startToday.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <div className="h-16" />
      </Layout>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#CADCFC] bg-white p-3">
        <div className="mx-auto flex w-full max-w-3xl gap-2">
          <Link href="/results" className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-[#1E2761] text-white">← Back to my matches</Link>
          <button type="button" onClick={() => { clearBlueprintState(); router.push('/situation'); }} className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-[#E8A020] text-[#1A1A2E] font-semibold">Start over →</button>
        </div>
      </div>
    </div>
  );
}
