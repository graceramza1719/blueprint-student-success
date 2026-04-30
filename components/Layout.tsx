import { ReactNode } from "react";
import TopNav from "@/components/TopNav";

interface LayoutProps {
  children: ReactNode;
  className?: string;
  showNav?: boolean;
}

export default function Layout({ children, className = "", showNav = true }: LayoutProps) {
  return (
    <>
      {showNav ? <TopNav /> : null}
      <main className={`mx-auto w-full max-w-3xl px-4 pb-28 pt-4 sm:px-6 ${className}`}>{children}</main>
    </>
  );
}
