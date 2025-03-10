import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/dashboard-navbar";
import { Button } from "@/components/ui/button";
import { Briefcase, Plus, Search, Filter, Clock } from "lucide-react";
import Link from "next/link";
import { SubscriptionCheck } from "@/components/subscription-check";

export default async function JobsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Get employer profile
  const { data: employerProfile } = await supabase
    .from("employer_profiles")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!employerProfile) {
    return redirect("/onboarding/employer");
  }

  // Get jobs
  const { data: jobs } = await supabase
    .from("jobs")
    .select("*, applications(id)")
    .eq("company_id", employerProfile.id)
    .order("created_at", { ascending: false });

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      return `${Math.floor(diffDays / 7)} weeks ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <SubscriptionCheck>
      <DashboardNavbar />
      <main className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">My Job Listings</h1>
            <Link href="/dashboard/post-job">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" /> Post New Job
              </Button>
            </Link>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <Button variant="outline" className="flex items-center gap-1">
                  <Filter className="w-4 h-4" /> More Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            {jobs && jobs.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Job Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Applications
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Posted
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {jobs.map((job) => (
                      <tr key={job.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center">
                              <Briefcase className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {job.title}
                              </div>
                              <div className="text-sm text-gray-500">
                                {job.location}
                                {job.is_remote && " (Remote)"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {job.is_active ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Active
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                              Inactive
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {job.applications ? job.applications.length : 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-gray-400" />
                            {formatDate(job.created_at)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <Link href={`/dashboard/jobs/${job.id}`}>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:text-blue-800"
                              >
                                View
                              </Button>
                            </Link>
                            <Link href={`/dashboard/jobs/${job.id}/edit`}>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:text-blue-800"
                              >
                                Edit
                              </Button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center">
                <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No job listings yet
                </h3>
                <p className="text-gray-500 mb-4">
                  Get started by creating your first job posting.
                </p>
                <Link href="/dashboard/post-job">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="w-4 h-4 mr-2" /> Post New Job
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </SubscriptionCheck>
  );
}
