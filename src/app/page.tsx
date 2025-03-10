import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import PricingCard from "@/components/pricing-card";
import Footer from "@/components/footer";
import { createClient } from "../../supabase/server";
import {
  ArrowUpRight,
  CheckCircle2,
  Briefcase,
  Search,
  FileText,
  Building2,
  Clock,
  UserPlus,
} from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: plans, error } = await supabase.functions.invoke(
    "supabase-functions-get-plans",
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <Hero />

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform makes it easy to find and hire the best talent for
              your company.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Briefcase className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Post a Job</h3>
              <p className="text-gray-600">
                Create detailed job listings with your requirements, company
                culture, and benefits.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Find Candidates</h3>
              <p className="text-gray-600">
                Browse our database of qualified professionals or let our AI
                matching find the perfect fit.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Hire Top Talent</h3>
              <p className="text-gray-600">
                Connect directly with candidates, schedule interviews, and make
                offers all in one platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose JobPortal</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're revolutionizing the recruitment process with powerful tools
              designed specifically for employers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Search className="w-6 h-6" />,
                title: "AI Talent Matching",
                description:
                  "Our advanced algorithms find candidates that perfectly match your job requirements",
              },
              {
                icon: <UserPlus className="w-6 h-6" />,
                title: "Verified Candidates",
                description:
                  "All candidate profiles are verified to ensure authentic skills and experience",
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: "Streamlined Hiring",
                description:
                  "Reduce time-to-hire with our efficient recruitment workflow and tools",
              },
              {
                icon: <CheckCircle2 className="w-6 h-6" />,
                title: "Recruitment Analytics",
                description:
                  "Detailed insights and metrics to optimize your hiring process and decisions",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-blue-100">Active Candidates</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">3,000+</div>
              <div className="text-blue-100">Successful Placements</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">75%</div>
              <div className="text-blue-100">Faster Time-to-Hire</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Candidates Preview */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Candidates</h2>
            <Link
              href="/dashboard"
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              View all candidates <ArrowUpRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Alex Johnson",
                title: "Senior Frontend Developer",
                skills: ["React", "TypeScript", "Node.js"],
                experience: "7 years",
                location: "San Francisco, CA",
                availability: "Immediate",
                photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
              },
              {
                name: "Sarah Miller",
                title: "Product Manager",
                skills: ["Product Strategy", "Agile", "User Research"],
                experience: "5 years",
                location: "New York, NY",
                availability: "2 weeks",
                photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
              },
              {
                name: "David Chen",
                title: "UX/UI Designer",
                skills: ["Figma", "Adobe XD", "User Testing"],
                experience: "4 years",
                location: "Remote",
                availability: "Immediate",
                photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
              },
              {
                name: "Michael Rodriguez",
                title: "DevOps Engineer",
                skills: ["AWS", "Docker", "Kubernetes"],
                experience: "6 years",
                location: "Austin, TX",
                availability: "1 month",
                photo:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
              },
              {
                name: "Emily Wilson",
                title: "Marketing Specialist",
                skills: ["Digital Marketing", "SEO", "Content Strategy"],
                experience: "3 years",
                location: "Chicago, IL",
                availability: "2 weeks",
                photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
              },
              {
                name: "James Taylor",
                title: "Data Scientist",
                skills: ["Python", "Machine Learning", "SQL"],
                experience: "5 years",
                location: "Boston, MA",
                availability: "Immediate",
                photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
              },
            ].map((candidate, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={candidate.photo}
                    alt={candidate.name}
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {candidate.name}
                    </h3>
                    <p className="text-gray-600">{candidate.title}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-center text-gray-600 mb-2">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                    <span>{candidate.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{candidate.experience} experience</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-3">
                    <Briefcase className="w-4 h-4 mr-2" />
                    <span>Available: {candidate.availability}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {candidate.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  href="/dashboard"
                  className="block w-full text-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                >
                  View Profile
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-gray-50" id="pricing">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Plans for Every Need</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Whether you're a job seeker or an employer, we have the right plan
              for you.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans
              ?.filter((item: any) => {
                return (
                  item.product &&
                  typeof item.product !== "string" &&
                  item.product.active === true
                );
              })
              .map((item: any) => (
                <PricingCard key={item.id} item={item} user={user} />
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Build Your Dream Team?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of companies who have found their perfect hires
            through our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sign-up/employer"
              className="inline-flex items-center justify-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Hiring
            </Link>
            <Link
              href="/for-candidates"
              className="inline-flex items-center justify-center px-6 py-3 text-blue-600 bg-white border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Looking for a Job?
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
