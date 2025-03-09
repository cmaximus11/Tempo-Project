import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JobPortal - Hire Top Talent",
  description:
    "Create your employer account and find the perfect candidates for your company.",
};

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
