import { Briefcase, Clock, MapPin } from "lucide-react";
import Link from "next/link";

interface CandidateCardProps {
  id?: string;
  name: string;
  title: string;
  location: string;
  experience: string;
  skills: string[];
  availability: string;
  photo?: string;
  education?: string;
  lastActive?: string;
}

export default function CandidateCard({
  id = "1",
  name = "John Doe",
  title = "Software Engineer",
  location = "San Francisco, CA",
  experience = "5 years",
  skills = ["JavaScript", "React", "Node.js"],
  availability = "Immediate",
  photo = "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  lastActive = "2 days ago",
  education,
}: CandidateCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white">
      <div className="flex items-center mb-4">
        <img
          src={photo}
          alt={name}
          className="w-16 h-16 rounded-full mr-4 object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-gray-600">{title}</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center text-gray-600 mb-2 text-sm">
          <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{location}</span>
        </div>
        <div className="flex items-center text-gray-600 mb-2 text-sm">
          <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{experience} experience</span>
        </div>
        <div className="flex items-center text-gray-600 mb-3 text-sm">
          <Briefcase className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>Available: {availability}</span>
        </div>

        {education && (
          <div className="text-gray-600 mb-3 text-sm">
            <span className="font-medium">Education:</span> {education}
          </div>
        )}

        <div className="flex flex-wrap gap-1 mb-4">
          {skills.map((skill, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">Last active: {lastActive}</span>
        <Link
          href={`/candidates/${id}`}
          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}
