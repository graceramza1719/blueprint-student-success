interface BreadcrumbsProps {
  current: "situation" | "values" | "matches";
}

export default function Breadcrumbs({ current }: BreadcrumbsProps) {
  const color = (key: BreadcrumbsProps["current"]) =>
    current === key ? "text-[#1E2761] font-semibold" : "text-[#5A6A85]";

  return (
    <p className="text-sm">
      <span className={color("situation")}>Your situation</span>
      <span className="px-1 text-[#5A6A85]">→</span>
      <span className={color("values")}>Values</span>
      <span className="px-1 text-[#5A6A85]">→</span>
      <span className={color("matches")}>Your matches</span>
    </p>
  );
}
