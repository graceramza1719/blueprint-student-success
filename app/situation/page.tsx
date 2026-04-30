"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Layout from "@/components/Layout";
import { SITUATION_STORAGE_KEY } from "@/lib/storage";
import { SituationData } from "@/lib/situation";

const gradeOptions: SituationData["grade"][] = ["10th", "11th", "12th", "Just graduated"];
const firstGenOptions: SituationData["firstGen"][] = ["Yes", "No", "Not sure yet"];
const workOptions: SituationData["workStatus"][] = ["Yes, part-time", "Yes, full-time", "No", "It depends"];

export default function SituationPage() {
  const router = useRouter();
  const [data, setData] = useState<Partial<SituationData>>({});

  useEffect(() => {
    const saved = window.localStorage.getItem(SITUATION_STORAGE_KEY);
    if (saved) setData(JSON.parse(saved) as SituationData);
  }, []);

  useEffect(() => {
    if (data.grade && data.firstGen && data.workStatus) {
      window.localStorage.setItem(SITUATION_STORAGE_KEY, JSON.stringify(data));
    }
  }, [data]);

  const complete = Boolean(data.grade && data.firstGen && data.workStatus);
  const pill = (active: boolean) =>
    `min-h-12 rounded-full border px-4 text-sm font-semibold ${active ? "border-[#1E2761] bg-[#1E2761] text-white" : "border-[#1E2761] bg-white text-[#1E2761]"}`;

  return (
    <div className="min-h-screen bg-[#F4F7FC] pb-20">
      <Layout className="space-y-5">
        <header className="rounded-2xl bg-[#1E2761] p-5 text-white">
          <h1 className="font-serif text-3xl font-bold">Before we start - tell us a little about you.</h1>
          <p className="mt-2 text-sm text-[#CADCFC]">This helps us give you results that actually make sense for your life. Takes 30 seconds.</p>
        </header>
        <Breadcrumbs current="situation" />

        <section className="space-y-5 rounded-2xl bg-white p-5 shadow-sm">
          <div>
            <p className="mb-2 font-semibold text-[#1A1A2E]">What grade are you in?</p>
            <div className="flex flex-wrap gap-2">{gradeOptions.map((option) => <button key={option} type="button" className={pill(data.grade === option)} onClick={() => setData((d) => ({ ...d, grade: option }))}>{option}</button>)}</div>
          </div>

          <div>
            <p className="mb-2 font-semibold text-[#1A1A2E]">Will you be the first in your family to go to college?</p>
            <div className="flex flex-wrap gap-2">{firstGenOptions.map((option) => <button key={option} type="button" className={pill(data.firstGen === option)} onClick={() => setData((d) => ({ ...d, firstGen: option }))}>{option}</button>)}</div>
            <p className="mt-2 text-xs text-[#5A6A85]">&quot;First-gen&quot; means you&apos;d be the first in your immediate family to earn a college degree. It is not a label - it is a fact that can unlock extra support.</p>
          </div>

          <div>
            <p className="mb-2 font-semibold text-[#1A1A2E]">Are you currently working?</p>
            <div className="flex flex-wrap gap-2">{workOptions.map((option) => <button key={option} type="button" className={pill(data.workStatus === option)} onClick={() => setData((d) => ({ ...d, workStatus: option }))}>{option}</button>)}</div>
          </div>
        </section>

        <button disabled={!complete} onClick={() => router.push('/values')} className={`w-full min-h-12 rounded-xl text-base font-bold ${complete ? "bg-[#E8A020] text-[#1A1A2E]" : "bg-gray-300 text-gray-600"}`}>Got it - let&apos;s find your careers →</button>
      </Layout>
    </div>
  );
}
