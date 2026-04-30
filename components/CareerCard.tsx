import Link from "next/link";
import { Career, CAREER_MAP, getCareerExtras } from "@/lib/careers";
import { formatMoney } from "@/lib/matching";

interface CareerCardProps {
  career: Career & { score: number; matchedValues: string[] };
  whyMatched: string;
}

export default function CareerCard({ career, whyMatched }: CareerCardProps) {
  const extras = getCareerExtras(career);
  const related = extras.relatedCareerIds.map((id) => CAREER_MAP[id]).filter(Boolean);
  const strongMatch = career.score >= 3;

  return (
    <article className="overflow-hidden rounded-2xl border border-[#CADCFC] bg-white p-5 shadow-sm">
      <div className={`-mx-5 -mt-5 mb-4 h-2 ${strongMatch ? "bg-[#E8A020]" : "bg-[#4472C4]"}`} />
      <p className="text-xs font-semibold uppercase tracking-wide text-[#5A6A85]">{strongMatch ? "Strong Match" : "Good Match"}</p>
      <h2 className="mt-1 font-serif text-2xl font-bold text-[#1E2761]">{career.title}</h2>
      <p className="mt-2 text-sm italic text-[#2D3748]">{whyMatched}</p>
      <p className="mt-2 text-base text-[#2D3748]">{career.tagline}</p>

      <div className="mt-4 flex flex-wrap gap-2 text-sm font-semibold">
        <span className="rounded-full bg-[#E8A020] px-3 py-2 text-[#1A1A2E]">
          {formatMoney(career.salaryRange.min)}-{formatMoney(career.salaryRange.max)}/year
        </span>
        <span className="rounded-full bg-[#4472C4] px-3 py-2 text-white">{career.timeToEntry}</span>
      </div>

      <blockquote className="mt-4 border-l-4 border-[#1E2761] pl-3 text-sm text-[#2D3748]">
        &quot;{career.realPersonStory.quote}&quot; - {career.realPersonStory.name}, {career.realPersonStory.age}
      </blockquote>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
        <span className="text-[#5A6A85]">Related careers:</span>
        {related.map((item) => (
          <Link key={item.id} href={`/career/${item.id}`} className="rounded-full border border-[#4472C4] px-3 py-1 text-[#1E2761]">
            {item.title}
          </Link>
        ))}
      </div>

      <Link
        href={`/career/${career.id}`}
        className="mt-5 inline-flex min-h-12 items-center rounded-xl bg-[#1E2761] px-4 text-base font-semibold text-white"
      >
        See what this pays →
      </Link>
    </article>
  );
}
