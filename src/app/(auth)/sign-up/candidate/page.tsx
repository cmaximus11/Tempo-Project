import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signUpCandidateAction } from "@/app/actions";
import CandidateNavbar from "@/components/candidate-navbar";
import { UserCircle, InfoIcon } from "lucide-react";

export default async function CandidateSignup(props: {
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
      <CandidateNavbar />
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-8">
        <div className="w-full max-w-md rounded-lg border border-purple-100 bg-card p-6 shadow-sm">
          <form className="flex flex-col space-y-6">
            <div className="space-y-2 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <UserCircle className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Sign up as Candidate
              </h1>
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  className="text-purple-600 font-medium hover:underline transition-all"
                  href="/sign-in"
                >
                  Sign in
                </Link>
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Looking to hire?{" "}
                <Link
                  className="text-purple-600 font-medium hover:underline transition-all"
                  href="/sign-up/employer"
                >
                  Create an employer account
                </Link>
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="full_name" className="text-sm font-medium">
                  Full Name
                </Label>
                <Input
                  id="full_name"
                  name="full_name"
                  type="text"
                  placeholder="John Doe"
                  required
                  className="w-full focus:ring-purple-500 focus:border-purple-500"
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
                  className="w-full focus:ring-purple-500 focus:border-purple-500"
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
                  className="w-full focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <SubmitButton
              formAction={signUpCandidateAction}
              pendingText="Signing up..."
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Create Your Profile
            </SubmitButton>

            <FormMessage message={searchParams} />
          </form>
        </div>
        <div className="bg-purple-50 px-5 py-3 border border-purple-100 mt-[2rem] rounded-md flex gap-4 max-w-md mx-auto">
          <InfoIcon size={16} className="mt-0.5 text-purple-600" />
          <div className="flex flex-col gap-1">
            <small className="text-sm text-secondary-foreground">
              <strong>Note:</strong> Emails are rate limited. You'll receive a
              verification link to complete your registration.
            </small>
          </div>
        </div>
      </div>
    </>
  );
}
