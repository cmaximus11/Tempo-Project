"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Search,
  MapPin,
  Filter,
  X,
  Briefcase,
  GraduationCap,
  Clock,
} from "lucide-react";

interface CandidateFilterProps {
  onFilter?: (filters: any) => void;
}

export default function CandidateFilter({
  onFilter = () => {},
}: CandidateFilterProps) {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    skills: [],
    experienceLevel: [],
    availability: [],
  });

  const handleFilterChange = (category: string, value: string) => {
    setFilters((prev) => {
      const currentValues = prev[category as keyof typeof prev] as string[];
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [category]: currentValues.filter((item) => item !== value),
        };
      } else {
        return {
          ...prev,
          [category]: [...currentValues, value],
        };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({ keyword, location, ...filters });
  };

  const clearFilters = () => {
    setKeyword("");
    setLocation("");
    setFilters({
      skills: [],
      experienceLevel: [],
      availability: [],
    });
    onFilter({});
  };

  const skillsList = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "AWS",
    "DevOps",
    "UI/UX",
    "Product Management",
    "Marketing",
  ];
  const experienceLevels = [
    "Entry Level (0-2 years)",
    "Mid Level (3-5 years)",
    "Senior Level (5+ years)",
    "Director/Executive",
  ];
  const availabilityOptions = [
    "Immediate",
    "Within 2 weeks",
    "Within 1 month",
    "1-3 months",
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              type="text"
              placeholder="Skills, job title, or keywords"
              className="pl-10"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <div className="flex-1 relative">
            <MapPin
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              type="text"
              placeholder="City, state, or remote"
              className="pl-10"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Find Candidates
          </Button>
        </div>

        <div className="flex justify-between items-center">
          <Button
            type="button"
            variant="ghost"
            className="text-blue-600 hover:text-blue-800 p-0 h-auto font-medium flex items-center"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} className="mr-1" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>

          {(keyword ||
            location ||
            filters.skills.length > 0 ||
            filters.experienceLevel.length > 0 ||
            filters.availability.length > 0) && (
            <Button
              type="button"
              variant="ghost"
              className="text-gray-500 hover:text-gray-700 p-0 h-auto flex items-center"
              onClick={clearFilters}
            >
              <X size={16} className="mr-1" />
              Clear All
            </Button>
          )}
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Skills */}
            <div>
              <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                <Briefcase className="w-4 h-4 mr-2" />
                Skills
              </h3>
              <div className="space-y-2">
                {skillsList.map((skill) => (
                  <label key={skill} className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded text-blue-600 focus:ring-blue-500 mr-2"
                      checked={filters.skills.includes(skill)}
                      onChange={() => handleFilterChange("skills", skill)}
                    />
                    <span className="text-sm text-gray-700">{skill}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                <GraduationCap className="w-4 h-4 mr-2" />
                Experience Level
              </h3>
              <div className="space-y-2">
                {experienceLevels.map((level) => (
                  <label key={level} className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded text-blue-600 focus:ring-blue-500 mr-2"
                      checked={filters.experienceLevel.includes(level)}
                      onChange={() =>
                        handleFilterChange("experienceLevel", level)
                      }
                    />
                    <span className="text-sm text-gray-700">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div>
              <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Availability
              </h3>
              <div className="space-y-2">
                {availabilityOptions.map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded text-blue-600 focus:ring-blue-500 mr-2"
                      checked={filters.availability.includes(option)}
                      onChange={() =>
                        handleFilterChange("availability", option)
                      }
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
