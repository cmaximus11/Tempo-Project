import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JobPortal - Find Your Dream Job",
  description:
    "Create your candidate profile and find the perfect job for your skills and experience.",
};

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
