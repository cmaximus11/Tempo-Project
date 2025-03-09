import DashboardNavbar from "@/components/dashboard-navbar";
import { createClient } from "../../../supabase/server";
import {
  InfoIcon,
  UserCircle,
  Briefcase,
  Filter,
  Search,
  Building2,
} from "lucide-react";
import { redirect } from "next/navigation";
import { SubscriptionCheck } from "@/components/subscription-check";
import CandidateCard from "@/components/candidate-card";
import CandidateFilter from "@/components/candidate-filter";
import Link from "next/link";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Check if user is an employer
  if (user.user_metadata?.role !== "employer") {
    // If user has no role yet, redirect to role selection
    if (!user.user_metadata?.role) {
      return redirect("/role-selection");
    }
    // If user is a candidate, redirect to candidate dashboard
    return redirect("/candidate-dashboard");
  }

  // Mock candidate data - in a real app, this would come from the database
  const mockCandidates = [
    {
      id: "1",
      name: "Alex Johnson",
      title: "Senior Frontend Developer",
      location: "San Francisco, CA",
      experience: "7 years",
      skills: ["React", "TypeScript", "Node.js", "GraphQL"],
      availability: "Immediate",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      lastActive: "2 hours ago",
      education: "BS Computer Science, Stanford University",
    },
    {
      id: "2",
      name: "Sarah Miller",
      title: "Product Manager",
      location: "New York, NY",
      experience: "5 years",
      skills: ["Product Strategy", "Agile", "User Research", "Roadmapping"],
      availability: "2 weeks",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      lastActive: "1 day ago",
      education: "MBA, Columbia University",
    },
    {
      id: "3",
      name: "David Chen",
      title: "UX/UI Designer",
      location: "Remote",
      experience: "4 years",
      skills: ["Figma", "Adobe XD", "User Testing", "Wireframing"],
      availability: "Immediate",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      lastActive: "3 days ago",
      education: "BFA Design, Rhode Island School of Design",
    },
    {
      id: "4",
      name: "Michael Rodriguez",
      title: "DevOps Engineer",
      location: "Austin, TX",
      experience: "6 years",
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
      availability: "1 month",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      lastActive: "Just now",
      education: "MS Computer Engineering, UT Austin",
    },
    {
      id: "5",
      name: "Emily Wilson",
      title: "Marketing Specialist",
      location: "Chicago, IL",
      experience: "3 years",
      skills: ["Digital Marketing", "SEO", "Content Strategy", "Analytics"],
      availability: "2 weeks",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      lastActive: "5 hours ago",
      education: "BA Marketing, Northwestern University",
    },
    {
      id: "6",
      name: "James Taylor",
      title: "Data Scientist",
      location: "Boston, MA",
      experience: "5 years",
      skills: [
        "Python",
        "Machine Learning",
        "SQL",
        "TensorFlow",
        "Data Visualization",
      ],
      availability: "Immediate",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
      lastActive: "1 day ago",
      education: "PhD Statistics, MIT",
    },
  ];

  return (
    <SubscriptionCheck>
      <DashboardNavbar />
      <main className="w-full bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Candidate Search</h1>
            <p className="text-gray-600">
              Find the perfect talent for your company from our pool of
              qualified candidates
            </p>
          </header>

          {/* Candidate Filter Section */}
          <section className="mb-8">
            <CandidateFilter />
          </section>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-1/4">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sticky top-8">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-4">
                    Company Profile
                  </h2>
                  <div className="flex items-center gap-3 mb-4">
                    <Building2 size={40} className="text-blue-600" />
                    <div>
                      <p className="font-medium">
                        {user.user_metadata?.company_name ||
                          user.user_metadata?.full_name ||
                          "Your Company"}
                      </p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    href="#"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                  >
                    Complete company profile
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
                    Recruitment Activity
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Active Jobs</span>
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
                        <span className="text-gray-600">
                          Candidates Contacted
                        </span>
                        <span className="font-medium">12</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ width: "60%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">
                          Interviews Scheduled
                        </span>
                        <span className="font-medium">5</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: "25%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <Link
                    href="#"
                    className="mt-4 block text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Post a new job
                  </Link>
                </div>
              </div>
            </aside>

            {/* Candidate Listings */}
            <div className="lg:w-3/4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Top Candidates</h2>
                <div className="text-sm text-gray-600">
                  Showing {mockCandidates.length} candidates
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {mockCandidates.map((candidate) => (
                  <CandidateCard key={candidate.id} {...candidate} />
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
    </SubscriptionCheck>
  );
}
