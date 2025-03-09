import { createClient } from "../../../supabase/server";
import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/dashboard-navbar";
import { Button } from "@/components/ui/button";
import { UserCircle, Briefcase, Search, Building2, Clock } from "lucide-react";
import Link from "next/link";
import JobCard from "@/components/job-card";
import JobFilter from "@/components/job-filter";

export default async function CandidateDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Check if user is a candidate
  if (user.user_metadata?.role !== "candidate") {
    // If user has no role yet, redirect to role selection
    if (!user.user_metadata?.role) {
      return redirect("/role-selection");
    }
    // If user is an employer, redirect to employer dashboard
    return redirect("/dashboard");
  }

  // Mock job data - in a real app, this would come from the database
  const mockJobs = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      salary: "$120K - $150K",
      type: "Full-time",
      postedDate: "2 days ago",
      description:
        "We are looking for an experienced Frontend Developer proficient in React, TypeScript, and modern CSS frameworks.",
    },
    {
      id: "2",
      title: "Product Manager",
      company: "InnovateSoft",
      location: "New York, NY",
      salary: "$110K - $140K",
      type: "Full-time",
      postedDate: "1 week ago",
      description:
        "Lead product development initiatives and collaborate with cross-functional teams to deliver exceptional user experiences.",
    },
    {
      id: "3",
      title: "UX/UI Designer",
      company: "DesignHub",
      location: "Remote",
      salary: "$90K - $120K",
      type: "Contract",
      postedDate: "3 days ago",
      description:
        "Create intuitive and visually appealing user interfaces for web and mobile applications.",
    },
    {
      id: "4",
      title: "DevOps Engineer",
      company: "CloudSystems",
      location: "Austin, TX",
      salary: "$130K - $160K",
      type: "Full-time",
      postedDate: "Just now",
      description:
        "Implement and maintain CI/CD pipelines, manage cloud infrastructure, and optimize deployment processes.",
    },
    {
      id: "5",
      title: "Marketing Specialist",
      company: "GrowthLabs",
      location: "Chicago, IL",
      salary: "$70K - $90K",
      type: "Full-time",
      postedDate: "5 days ago",
      description:
        "Develop and execute marketing campaigns across digital channels to drive user acquisition and engagement.",
    },
    {
      id: "6",
      title: "Data Scientist",
      company: "AnalyticsPro",
      location: "Boston, MA",
      salary: "$115K - $145K",
      type: "Full-time",
      postedDate: "1 day ago",
      description:
        "Apply statistical analysis, machine learning, and data visualization techniques to extract insights from large datasets.",
    },
  ];

  return (
    <>
      <DashboardNavbar />
      <main className="w-full bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Job Listings</h1>
            <p className="text-gray-600">
              Find your perfect role from thousands of opportunities
            </p>
          </header>

          {/* Job Filter Section */}
          <section className="mb-8">
            <JobFilter />
          </section>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-1/4">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sticky top-8">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-4">Your Profile</h2>
                  <div className="flex items-center gap-3 mb-4">
                    <UserCircle size={40} className="text-blue-600" />
                    <div>
                      <p className="font-medium">
                        {user.user_metadata?.full_name || "User"}
                      </p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    href="/onboarding/candidate"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                  >
                    Complete your profile
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h2 className="text-lg font-semibold mb-4">
                    Application Status
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Applied</span>
                        <span className="font-medium">3</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: "30%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">In Review</span>
                        <span className="font-medium">2</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ width: "20%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Interview</span>
                        <span className="font-medium">1</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: "10%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <Link
                    href="#"
                    className="mt-4 block text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View all applications
                  </Link>
                </div>
              </div>
            </aside>

            {/* Job Listings */}
            <div className="lg:w-3/4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Recommended for you</h2>
                <div className="text-sm text-gray-600">
                  Showing {mockJobs.length} jobs
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {mockJobs.map((job) => (
                  <JobCard key={job.id} {...job} />
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button className="px-3 py-1 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50">
                    Previous
                  </button>
                  <button className="px-3 py-1 rounded-md bg-blue-600 text-white">
                    1
                  </button>
                  <button className="px-3 py-1 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50">
                    2
                  </button>
                  <button className="px-3 py-1 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50">
                    3
                  </button>
                  <span className="px-2 text-gray-600">...</span>
                  <button className="px-3 py-1 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50">
                    10
                  </button>
                  <button className="px-3 py-1 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50">
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
