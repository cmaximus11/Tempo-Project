import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Briefcase, UserCircle } from "lucide-react";
import Navbar from "@/components/navbar";

export default function RoleSelection() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-8">
        <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-semibold tracking-tight">
                Choose Your Role
              </h1>
              <p className="text-sm text-muted-foreground">
                Select how you want to use JobPortal
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <Link href="/onboarding/employer" className="w-full">
                <Button
                  variant="outline"
                  className="w-full h-auto py-6 flex flex-col items-center justify-center gap-3 hover:bg-blue-50 hover:border-blue-300 transition-all"
                >
                  <Briefcase className="h-12 w-12 text-blue-600" />
                  <div className="text-center">
                    <h3 className="font-semibold text-lg">I'm an Employer</h3>
                    <p className="text-sm text-muted-foreground">
                      Post jobs and find candidates
                    </p>
                  </div>
                </Button>
              </Link>

              <Link href="/onboarding/candidate" className="w-full">
                <Button
                  variant="outline"
                  className="w-full h-auto py-6 flex flex-col items-center justify-center gap-3 hover:bg-blue-50 hover:border-blue-300 transition-all"
                >
                  <UserCircle className="h-12 w-12 text-blue-600" />
                  <div className="text-center">
                    <h3 className="font-semibold text-lg">I'm a Candidate</h3>
                    <p className="text-sm text-muted-foreground">
                      Find jobs and showcase your skills
                    </p>
                  </div>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
