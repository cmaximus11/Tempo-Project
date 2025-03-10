import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import CandidateNavbar from "@/components/candidate-navbar";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Building2,
  Clock,
  MapPin,
  Calendar,
  CheckCircle2,
  BookmarkIcon,
  Share2,
} from "lucide-react";
import Link from "next/link";
import CandidateFooter from "@/components/candidate-footer";

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

  // In a real app, fetch job details from database using params.id
  // For now, using mock data
  const jobDetail = {
    id: params.id,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    logo: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=128&q=80",
    location: "San Francisco, CA",
    salary: "$120K - $150K",
    type: "Full-time",
    postedDate: "2 days ago",
    description: `<p>We are looking for an experienced Frontend Developer to join our growing team. The ideal candidate will have a strong background in React, TypeScript, and modern CSS frameworks.</p>
    <p>As a Senior Frontend Developer, you will be responsible for building and maintaining user interfaces for our web applications, collaborating with designers and backend developers, and mentoring junior team members.</p>`,
    responsibilities: [
      "Develop and maintain responsive web applications using React and TypeScript",
      "Collaborate with UX/UI designers to implement intuitive user interfaces",
      "Write clean, maintainable, and well-documented code",
      "Optimize applications for maximum speed and scalability",
      "Participate in code reviews and provide constructive feedback",
      "Stay up-to-date with emerging trends and technologies in frontend development",
    ],
    requirements: [
      "5+ years of experience in frontend development",
      "Strong proficiency in React, TypeScript, and modern JavaScript",
      "Experience with state management libraries (Redux, MobX, etc.)",
      "Familiarity with CSS preprocessors and modern CSS frameworks",
      "Understanding of responsive design principles",
      "Knowledge of browser compatibility issues and workarounds",
      "Excellent problem-solving and communication skills",
    ],
    benefits: [
      "Competitive salary and equity package",
      "Comprehensive health, dental, and vision insurance",
      "Flexible work hours and remote work options",
      "Professional development budget",
      "401(k) matching",
      "Generous paid time off",
      "Modern office with snacks and beverages",
    ],
    companyInfo:
      "TechCorp Inc. is a leading technology company specializing in cloud-based solutions for enterprise clients. With offices in San Francisco, New York, and London, we serve clients worldwide with innovative products that streamline business operations.",
  };

  // Similar job recommendations
  const similarJobs = [
    {
      id: "2",
      title: "Frontend Developer",
      company: "WebSolutions Ltd.",
      location: "Remote",
      salary: "$90K - $120K",
      type: "Full-time",
      postedDate: "1 day ago",
    },
    {
      id: "3",
      title: "React Developer",
      company: "AppWorks Inc.",
      location: "New York, NY",
      salary: "$100K - $130K",
      type: "Full-time",
      postedDate: "3 days ago",
    },
    {
      id: "4",
      title: "UI Engineer",
      company: "DesignTech",
      location: "San Francisco, CA",
      salary: "$110K - $140K",
      type: "Contract",
      postedDate: "1 week ago",
    },
  ];

  return (
    <>
      <CandidateNavbar />
      <main className="bg-gray-50 min-h-screen pb-12">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="flex text-sm">
              <Link
                href="/candidate-dashboard"
                className="text-gray-500 hover:text-purple-600"
              >
                Jobs
              </Link>
              <span className="mx-2 text-gray-500">/</span>
              <span className="text-gray-900">{jobDetail.title}</span>
            </nav>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              {/* Job Header */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={jobDetail.logo}
                        alt={`${jobDetail.company} logo`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 mb-1">
                        {jobDetail.title}
                      </h1>
                      <p className="text-lg text-gray-700 mb-2">
                        {jobDetail.company}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {jobDetail.type}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          <Clock className="w-3 h-3 mr-1" />
                          {jobDetail.postedDate}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                      Apply Now
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <BookmarkIcon className="w-4 h-4" />
                      Save
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-t border-b border-gray-200">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{jobDetail.location}</p>
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
                      <p className="text-sm text-gray-500">Salary</p>
                      <p className="font-medium">{jobDetail.salary}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Posted</p>
                      <p className="font-medium">{jobDetail.postedDate}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Job Description</h2>
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: jobDetail.description }}
                />

                <h3 className="text-lg font-bold mt-6 mb-3">
                  Responsibilities
                </h3>
                <ul className="space-y-2">
                  {jobDetail.responsibilities.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-lg font-bold mt-6 mb-3">Requirements</h3>
                <ul className="space-y-2">
                  {jobDetail.requirements.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-lg font-bold mt-6 mb-3">Benefits</h3>
                <ul className="space-y-2">
                  {jobDetail.benefits.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company Info */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">
                  About {jobDetail.company}
                </h2>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    <img
                      src={jobDetail.logo}
                      alt={`${jobDetail.company} logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      {jobDetail.company}
                    </h3>
                    <p className="text-gray-600">{jobDetail.location}</p>
                  </div>
                </div>
                <p className="text-gray-700">{jobDetail.companyInfo}</p>
                <div className="mt-4">
                  <Link
                    href="#"
                    className="text-purple-600 hover:text-purple-800 font-medium inline-flex items-center"
                  >
                    View company profile
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
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              {/* Apply Now Card */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">
                  Apply for this position
                </h2>
                <p className="text-gray-600 mb-6">
                  Submit your application now and take the next step in your
                  career journey.
                </p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-4">
                  Apply Now
                </Button>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-1"
                >
                  <BookmarkIcon className="w-4 h-4" />
                  Save Job
                </Button>
              </div>

              {/* Similar Jobs */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Similar Jobs</h2>
                <div className="space-y-4">
                  {similarJobs.map((job) => (
                    <Link
                      href={`/jobs/${job.id}`}
                      key={job.id}
                      className="block p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-sm transition-all"
                    >
                      <h3 className="font-semibold text-gray-900">
                        {job.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{job.company}</p>
                      <div className="flex items-center text-gray-500 text-xs mt-2">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span className="mr-3">{job.location}</span>
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{job.postedDate}</span>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Link
                    href="/candidate-dashboard"
                    className="text-purple-600 hover:text-purple-800 font-medium inline-flex items-center"
                  >
                    View all similar jobs
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
              </div>
            </div>
          </div>
        </div>
      </main>
      <CandidateFooter />
    </>
  );
}
