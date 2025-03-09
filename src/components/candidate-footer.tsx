import Link from "next/link";
import {
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  UserCircle,
} from "lucide-react";

export default function CandidateFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-12">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <Link
              href="/for-candidates"
              className="inline-flex items-center text-2xl font-bold text-purple-600 mb-4"
            >
              <UserCircle className="w-6 h-6 mr-2" />
              JobPortal
            </Link>
            <p className="text-gray-600 max-w-xs mt-2">
              Find your dream job and advance your career with JobPortal.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
            {/* For Job Seekers */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                For Job Seekers
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-purple-600"
                  >
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sign-up/candidate"
                    className="text-gray-600 hover:text-purple-600"
                  >
                    Create Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-purple-600"
                  >
                    Job Alerts
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-purple-600"
                  >
                    Career Resources
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-purple-600"
                  >
                    Resume Tips
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-purple-600"
                  >
                    Interview Prep
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-purple-600"
                  >
                    Career Guides
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-purple-600"
                  >
                    Salary Calculator
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-purple-600"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-purple-600"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-purple-600"
                  >
                    Press
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-purple-600"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-purple-600"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-purple-600"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-purple-600"
                  >
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-purple-600"
                  >
                    Accessibility
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200">
          <div className="text-gray-600 mb-4 md:mb-0">
            © {currentYear} JobPortal. All rights reserved.
          </div>

          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-purple-600 transition-colors"
            >
              <span className="sr-only">Twitter</span>
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-purple-600 transition-colors"
            >
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-purple-600 transition-colors"
            >
              <span className="sr-only">Facebook</span>
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-purple-600 transition-colors"
            >
              <span className="sr-only">Instagram</span>
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
