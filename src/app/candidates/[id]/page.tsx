import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/dashboard-navbar";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Building2,
  Clock,
  MapPin,
  Calendar,
  GraduationCap,
  Mail,
  Phone,
  Globe,
  BookmarkIcon,
  Share2,
  FileText,
  Award,
  Star,
} from "lucide-react";
import Link from "next/link";

export default async function CandidateDetailPage({
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

  // In a real app, fetch candidate details from database using params.id
  // For now, using mock data
  const candidateDetail = {
    id: params.id,
    name: "Alex Johnson",
    title: "Senior Frontend Developer",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    location: "San Francisco, CA",
    experience: "7 years",
    availability: "Immediate",
    lastActive: "2 hours ago",
    summary: `Experienced Frontend Developer with 7+ years of expertise in building responsive and performant web applications. Specialized in React, TypeScript, and modern frontend architecture. Passionate about creating intuitive user interfaces and optimizing web performance.`,
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Redux",
      "GraphQL",
      "Node.js",
      "Webpack",
      "Jest",
      "Cypress",
      "Git",
    ],
    workExperience: [
      {
        company: "TechCorp Inc.",
        position: "Senior Frontend Developer",
        duration: "2020 - Present",
        description:
          "Led the frontend development team in building a complex SaaS platform. Implemented performance optimizations that improved load times by 40%. Mentored junior developers and established coding standards.",
      },
      {
        company: "WebSolutions Ltd.",
        position: "Frontend Developer",
        duration: "2017 - 2020",
        description:
          "Developed responsive web applications for enterprise clients. Collaborated with designers and backend developers to implement new features and improve user experience.",
      },
      {
        company: "Digital Creations",
        position: "Junior Web Developer",
        duration: "2015 - 2017",
        description:
          "Built and maintained websites for small to medium businesses. Worked with HTML, CSS, JavaScript, and jQuery to create interactive web experiences.",
      },
    ],
    education: [
      {
        institution: "Stanford University",
        degree: "BS in Computer Science",
        year: "2011 - 2015",
      },
    ],
    certifications: [
      "AWS Certified Developer",
      "Google Cloud Professional Developer",
      "React Advanced Certification",
    ],
    languages: [
      { name: "English", level: "Native" },
      { name: "Spanish", level: "Intermediate" },
      { name: "French", level: "Basic" },
    ],
    contactInfo: {
      email: "alex.johnson@example.com",
      phone: "+1 (555) 123-4567",
      website: "www.alexjohnson.dev",
      linkedin: "linkedin.com/in/alexjohnson",
      github: "github.com/alexjohnson",
    },
  };

  // Similar candidates recommendations
  const similarCandidates = [
    {
      id: "2",
      name: "Ryan Thompson",
      title: "Frontend Developer",
      location: "Seattle, WA",
      skills: ["React", "JavaScript", "CSS"],
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=ryan",
      experience: "5 years",
    },
    {
      id: "3",
      name: "Jessica Lee",
      title: "UI/UX Developer",
      location: "Remote",
      skills: ["React", "Figma", "UI Design"],
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica",
      experience: "4 years",
    },
    {
      id: "4",
      name: "Daniel Kim",
      title: "Full Stack Developer",
      location: "San Francisco, CA",
      skills: ["React", "Node.js", "MongoDB"],
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=daniel",
      experience: "6 years",
    },
  ];

  return (
    <>
      <DashboardNavbar />
      <main className="bg-gray-50 min-h-screen pb-12">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="flex text-sm">
              <Link
                href="/dashboard"
                className="text-gray-500 hover:text-blue-600"
              >
                Candidates
              </Link>
              <span className="mx-2 text-gray-500">/</span>
              <span className="text-gray-900">{candidateDetail.name}</span>
            </nav>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              {/* Candidate Header */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={candidateDetail.photo}
                        alt={candidateDetail.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 mb-1">
                        {candidateDetail.name}
                      </h1>
                      <p className="text-lg text-gray-700 mb-2">
                        {candidateDetail.title}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Available: {candidateDetail.availability}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          <Clock className="w-3 h-3 mr-1" />
                          Active: {candidateDetail.lastActive}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Contact Candidate
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
                      <p className="font-medium">{candidateDetail.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Experience</p>
                      <p className="font-medium">
                        {candidateDetail.experience}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Availability</p>
                      <p className="font-medium">
                        {candidateDetail.availability}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Candidate Summary */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Professional Summary</h2>
                <p className="text-gray-700 leading-relaxed">
                  {candidateDetail.summary}
                </p>
              </div>

              {/* Skills */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {candidateDetail.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Work Experience */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Work Experience</h2>
                <div className="space-y-6">
                  {candidateDetail.workExperience.map((job, index) => (
                    <div
                      key={index}
                      className="border-l-2 border-gray-200 pl-4 ml-2"
                    >
                      <h3 className="text-lg font-semibold">{job.position}</h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <Building2 className="w-4 h-4 mr-1" />
                        <span className="mr-3">{job.company}</span>
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{job.duration}</span>
                      </div>
                      <p className="text-gray-700">{job.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Education</h2>
                <div className="space-y-4">
                  {candidateDetail.education.map((edu, index) => (
                    <div key={index} className="flex items-start">
                      <GraduationCap className="w-5 h-5 text-gray-500 mr-3 mt-1" />
                      <div>
                        <h3 className="font-semibold">{edu.degree}</h3>
                        <p className="text-gray-600">{edu.institution}</p>
                        <p className="text-gray-500 text-sm">{edu.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Certifications</h2>
                <div className="space-y-2">
                  {candidateDetail.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center">
                      <Award className="w-5 h-5 text-blue-500 mr-2" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Languages</h2>
                <div className="space-y-3">
                  {candidateDetail.languages.map((lang, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="font-medium">{lang.name}</span>
                      <span className="text-gray-600">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              {/* Contact Info */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a
                        href={`mailto:${candidateDetail.contactInfo.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {candidateDetail.contactInfo.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <a
                        href={`tel:${candidateDetail.contactInfo.phone}`}
                        className="text-blue-600 hover:underline"
                      >
                        {candidateDetail.contactInfo.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Website</p>
                      <a
                        href={`https://${candidateDetail.contactInfo.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {candidateDetail.contactInfo.website}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Schedule Interview
                  </Button>
                </div>
              </div>

              {/* Similar Candidates */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Similar Candidates</h2>
                <div className="space-y-4">
                  {similarCandidates.map((candidate) => (
                    <Link
                      href={`/candidates/${candidate.id}`}
                      key={candidate.id}
                      className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all"
                    >
                      <img
                        src={candidate.photo}
                        alt={candidate.name}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {candidate.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {candidate.title}
                        </p>
                        <div className="flex items-center text-gray-500 text-xs mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span className="mr-2">{candidate.location}</span>
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{candidate.experience}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
