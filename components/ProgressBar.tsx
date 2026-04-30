interface ProgressBarProps {
  step: number;
  total: number;
}

export default function ProgressBar({ step, total }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, (step / total) * 100));

  return (
    <div className="w-full">
      <p className="text-sm font-semibold text-[#5A6A85]">Step {step} of {total}</p>
      <div className="mt-2 h-2 w-full rounded-full bg-[#CADCFC]">
        <div className="h-2 rounded-full bg-[#1E2761]" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
