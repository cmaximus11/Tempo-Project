import Link from "next/link";
import { createClient } from "../../supabase/server";
import { Button } from "./ui/button";
import { UserCircle } from "lucide-react";
import UserProfile from "./user-profile";

export default async function CandidateNavbar() {
  const supabase = createClient();

  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  return (
    <nav className="w-full border-b border-gray-200 bg-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link
            href="/"
            prefetch
            className="text-2xl font-bold text-purple-600 flex items-center"
          >
            <UserCircle className="w-6 h-6 mr-2" />
            JobPortal
          </Link>
          <div className="hidden md:flex ml-10 space-x-8">
            <Link
              href="/candidate-dashboard"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Browse Jobs
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Career Resources
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Learning
            </Link>
            <Link
              href="#pricing"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Pricing
            </Link>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <Link
                href="/candidate-dashboard"
                className="hidden md:inline-flex px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <Button>Dashboard</Button>
              </Link>
              <UserProfile />
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Sign In
              </Link>
              <div className="flex gap-2">
                <Link
                  href="/"
                  className="px-4 py-2 text-sm font-medium text-purple-600 border border-purple-600 rounded-md hover:bg-purple-50"
                >
                  For Employers
                </Link>
                <Link
                  href="/sign-up/candidate"
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700"
                >
                  Create Account
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
