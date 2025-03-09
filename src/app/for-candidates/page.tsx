import Link from "next/link";
import CandidateNavbar from "@/components/candidate-navbar";
import CandidateFooter from "@/components/candidate-footer";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  CheckCircle2,
  UserCircle,
  Briefcase,
  Search,
  Star,
} from "lucide-react";

export default function ForCandidatesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <CandidateNavbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-70" />

        <div className="relative pt-24 pb-32 sm:pt-32 sm:pb-40">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
                Find Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                  Dream Job
                </span>{" "}
                Today
              </h1>

              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                Create your profile, showcase your skills, and connect with top
                employers looking for talent like you.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/sign-up/candidate"
                  className="inline-flex items-center px-8 py-4 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors text-lg font-medium"
                >
                  Create Your Profile
                  <ArrowUpRight className="ml-2 w-5 h-5" />
                </Link>

                <Link
                  href="#how-it-works"
                  className="inline-flex items-center px-8 py-4 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-lg font-medium"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform makes it easy to find and apply for jobs that match
              your skills and career goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <UserCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                1. Create Your Profile
              </h3>
              <p className="text-gray-600">
                Build a comprehensive profile showcasing your skills,
                experience, and career aspirations.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                2. Discover Opportunities
              </h3>
              <p className="text-gray-600">
                Browse job listings tailored to your skills and preferences, or
                let our AI matching find the perfect fit.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Briefcase className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                3. Apply and Connect
              </h3>
              <p className="text-gray-600">
                Apply to positions with a single click and connect directly with
                employers interested in your profile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose JobPortal</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're revolutionizing the job search process with powerful tools
              designed specifically for candidates.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: <Star className="w-6 h-6" />,
                title: "AI Job Matching",
                description:
                  "Our intelligent algorithms match your skills and preferences with the perfect job opportunities",
              },
              {
                icon: <CheckCircle2 className="w-6 h-6" />,
                title: "Verified Employers",
                description:
                  "All employer profiles are verified to ensure legitimate job opportunities",
              },
              {
                icon: <UserCircle className="w-6 h-6" />,
                title: "Professional Profile",
                description:
                  "Create a standout profile that showcases your skills and experience to potential employers",
              },
              {
                icon: <Briefcase className="w-6 h-6" />,
                title: "Career Resources",
                description:
                  "Access guides, tips, and tools to help you advance your career and professional development",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="flex gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-purple-600 flex-shrink-0">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from candidates who found their dream jobs through our
              platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Michael Chen",
                role: "Software Engineer",
                company: "TechCorp Inc.",
                photo:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
                quote:
                  "Within two weeks of creating my profile, I received three interview requests from top tech companies. I'm now working at my dream job!",
              },
              {
                name: "Sarah Johnson",
                role: "Marketing Manager",
                company: "Brand Solutions",
                photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
                quote:
                  "The AI matching feature connected me with opportunities I wouldn't have found otherwise. The process was seamless from application to offer.",
              },
              {
                name: "James Wilson",
                role: "Product Designer",
                company: "Creative Studios",
                photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
                quote:
                  "As a creative professional, I was able to showcase my portfolio and connect with companies that value my specific skill set. Highly recommended!",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Find Your Dream Job?
          </h2>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have advanced their careers
            through our platform.
          </p>
          <Link
            href="/sign-up/candidate"
            className="inline-flex items-center px-8 py-4 text-purple-600 bg-white rounded-lg hover:bg-gray-100 transition-colors text-lg font-medium"
          >
            Create Your Profile
            <ArrowUpRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      <CandidateFooter />
    </div>
  );
}
