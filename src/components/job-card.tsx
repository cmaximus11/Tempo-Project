import { Building2 } from "lucide-react";
import Link from "next/link";

interface JobCardProps {
  id?: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  logo?: string;
  postedDate?: string;
  description?: string;
}

export default function JobCard({
  id = "1",
  title = "Software Engineer",
  company = "Tech Company",
  location = "San Francisco, CA",
  salary = "$100K - $130K",
  type = "Full-time",
  logo,
  postedDate = "2 days ago",
  description,
}: JobCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start gap-3">
          {logo ? (
            <img
              src={logo}
              alt={`${company} logo`}
              className="w-12 h-12 rounded-md object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center text-blue-600 font-bold text-xl">
              {company.charAt(0)}
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-gray-600 text-sm">{company}</p>
          </div>
        </div>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
          {type}
        </span>
      </div>

      {description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
      )}

      <div className="mb-4">
        <div className="flex items-center text-gray-600 mb-2 text-sm">
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
          <span>{location}</span>
        </div>
        <div className="flex items-center text-gray-600 text-sm">
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
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>{salary}</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">{postedDate}</span>
        <Link
          href={`/jobs/${id}`}
          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
