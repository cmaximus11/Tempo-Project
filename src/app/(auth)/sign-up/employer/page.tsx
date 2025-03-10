import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../../smtp-message";
import { signUpEmployerAction } from "@/app/actions";
import Navbar from "@/components/navbar";
import { Briefcase } from "lucide-react";

export default async function EmployerSignup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="flex h-screen w-full flex-1 items-center justify-center p-4 sm:max-w-md">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-8">
        <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-sm">
          <form className="flex flex-col space-y-6">
            <div className="space-y-2 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Sign up as Employer
              </h1>
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  className="text-primary font-medium hover:underline transition-all"
                  href="/sign-in"
                >
                  Sign in
                </Link>
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Looking for a job?{" "}
                <Link
                  className="text-primary font-medium hover:underline transition-all"
                  href="/sign-up/candidate"
                >
                  Create a candidate account
                </Link>
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company_name" className="text-sm font-medium">
                  Company Name
                </Label>
                <Input
                  id="company_name"
                  name="company_name"
                  type="text"
                  placeholder="Acme Corporation"
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="full_name" className="text-sm font-medium">
                  Your Full Name
                </Label>
                <Input
                  id="full_name"
                  name="full_name"
                  type="text"
                  placeholder="John Doe"
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Your password"
                  minLength={6}
                  required
                  className="w-full"
                />
              </div>
            </div>

            <SubmitButton
              formAction={signUpEmployerAction}
              pendingText="Signing up..."
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Create Employer Account
            </SubmitButton>

            <FormMessage message={searchParams} />
          </form>
        </div>
        <SmtpMessage />
      </div>
    </>
  );
}
