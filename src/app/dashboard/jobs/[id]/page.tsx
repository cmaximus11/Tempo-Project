import { createClient } from "../../../../../supabase/server";
import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/dashboard-navbar";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  MapPin,
  Clock,
  Calendar,
  Edit,
  Users,
  Eye,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import Link from "next/link";
import { SubscriptionCheck } from "@/components/subscription-check";

export default async function JobDetailPage({
  params,
}: {
  params: { id: string };
}) {
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

  // Get job details
  const { data: job, error } = await supabase
    .from("jobs")
    .select("*, employer_profiles(company_name, logo_url)")
    .eq("id", params.id)
    .eq("company_id", employerProfile.id)
    .single();

  if (error || !job) {
    return redirect("/dashboard");
  }

  // Get application count
  const { count: applicationCount } = await supabase
    .from("applications")
    .select("id", { count: "exact" })
    .eq("job_id", job.id);

  // Format salary range
  const formatSalary = (min?: number | null, max?: number | null) => {
    if (!min && !max) return "Not specified";
    if (min && !max) return `$${min.toLocaleString()}+`;
    if (!min && max) return `Up to $${max.toLocaleString()}`;
    return `$${min?.toLocaleString()} - $${max?.toLocaleString()}`;
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <SubscriptionCheck>
      <DashboardNavbar />
      <main className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="flex text-sm">
              <Link
                href="/dashboard"
                className="text-gray-500 hover:text-blue-600"
              >
                Dashboard
              </Link>
              <span className="mx-2 text-gray-500">/</span>
              <span className="text-gray-900">Job Details</span>
            </nav>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              {/* Job Header */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
                <div className="flex justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-blue-100 flex items-center justify-center">
                      {job.employer_profiles.logo_url ? (
                        <img
                          src={job.employer_profiles.logo_url}
                          alt={`${job.employer_profiles.company_name} logo`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Briefcase className="w-8 h-8 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 mb-1">
                        {job.title}
                      </h1>
                      <p className="text-lg text-gray-700 mb-2">
                        {job.employer_profiles.company_name}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {job.job_type}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          <Clock className="w-3 h-3 mr-1" />
                          Posted {formatDate(job.created_at)}
                        </span>
                        {job.is_remote && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Remote
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link href={`/dashboard/jobs/${job.id}/edit`}>
                      <Button
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Edit className="w-4 h-4" />
                        Edit Job
                      </Button>
                    </Link>
                    <Link href={`/dashboard/jobs/${job.id}/applications`}>
                      <Button
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Users className="w-4 h-4" />
                        View Applications ({applicationCount || 0})
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 mt-4 border-t border-b border-gray-200">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">
                        {job.location}
                        {job.is_remote && " (Remote)"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-gray-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Salary Range</p>
                      <p className="font-medium">
                        {formatSalary(job.salary_min, job.salary_max)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Experience</p>
                      <p className="font-medium">{job.experience_level}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Job Description</h2>
                <div className="prose max-w-none mb-6">
                  <p className="whitespace-pre-line">{job.description}</p>
                </div>

                {job.responsibilities && job.responsibilities.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold mb-3">Responsibilities</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {job.responsibilities.map(
                        (item: string, index: number) => (
                          <li key={index}>{item}</li>
                        ),
                      )}
                    </ul>
                  </div>
                )}

                {job.requirements && job.requirements.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold mb-3">Requirements</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {job.requirements.map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {job.benefits && job.benefits.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold mb-3">Benefits</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {job.benefits.map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              {/* Job Status */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Job Status</h2>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-700">Status</span>
                  <div className="flex items-center">
                    {job.is_active ? (
                      <>
                        <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                        <span className="text-green-600 font-medium">
                          Active
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="inline-block w-2 h-2 rounded-full bg-gray-500 mr-2"></span>
                        <span className="text-gray-600 font-medium">
                          Inactive
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-700">Applications</span>
                  <span className="font-medium">{applicationCount || 0}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-700">Posted On</span>
                  <span className="font-medium">
                    {formatDate(job.created_at)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Last Updated</span>
                  <span className="font-medium">
                    {formatDate(job.updated_at)}
                  </span>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <form action="/api/jobs/toggle-status" method="POST">
                    <input type="hidden" name="jobId" value={job.id} />
                    <Button
                      type="submit"
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2"
                    >
                      {job.is_active ? (
                        <>
                          <ToggleRight className="w-5 h-5 text-green-500" />
                          Deactivate Job
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="w-5 h-5 text-gray-500" />
                          Activate Job
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Link href={`/dashboard/jobs/${job.id}/edit`}>
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Job Details
                    </Button>
                  </Link>
                  <Link href={`/dashboard/jobs/${job.id}/applications`}>
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <Users className="w-4 h-4" />
                      Manage Applications
                    </Button>
                  </Link>
                  <Link href={`/jobs/${job.id}`} target="_blank">
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Preview Public Listing
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </SubscriptionCheck>
  );
}
