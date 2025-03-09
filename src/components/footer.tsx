import Link from "next/link";
import {
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Briefcase,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-12">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <Link
              href="/"
              className="inline-flex items-center text-2xl font-bold text-blue-600 mb-4"
            >
              <Briefcase className="w-6 h-6 mr-2" />
              JobPortal
            </Link>
            <p className="text-gray-600 max-w-xs mt-2">
              Connecting talented professionals with great companies worldwide.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
            {/* For Employers */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                For Employers
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    Browse Candidates
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    Recruitment Tools
                  </Link>
                </li>
              </ul>
            </div>

            {/* For Candidates */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                For Candidates
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    Create Profile
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    Job Alerts
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    Career Resources
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
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
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
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
              className="text-gray-400 hover:text-blue-600 transition-colors"
            >
              <span className="sr-only">Twitter</span>
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-600 transition-colors"
            >
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-600 transition-colors"
            >
              <span className="sr-only">Facebook</span>
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-600 transition-colors"
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
