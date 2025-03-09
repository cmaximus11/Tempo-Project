"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, MapPin, Filter, X } from "lucide-react";

interface JobFilterProps {
  onFilter?: (filters: any) => void;
}

export default function JobFilter({ onFilter = () => {} }: JobFilterProps) {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    jobType: [],
    experienceLevel: [],
    salary: "",
  });

  const handleFilterChange = (category: string, value: string) => {
    setFilters((prev) => {
      if (category === "salary") {
        return { ...prev, salary: value };
      }

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
      jobType: [],
      experienceLevel: [],
      salary: "",
    });
    onFilter({});
  };

  const jobTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Temporary",
    "Internship",
    "Remote",
  ];
  const experienceLevels = [
    "Entry Level",
    "Mid Level",
    "Senior Level",
    "Director",
    "Executive",
  ];
  const salaryRanges = ["$0 - $50K", "$50K - $100K", "$100K - $150K", "$150K+"];

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
              placeholder="Job title, keywords, or company"
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
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Search Jobs
          </Button>
        </div>

        <div className="flex justify-between items-center">
          <Button
            type="button"
            variant="ghost"
            className="text-purple-600 hover:text-purple-800 p-0 h-auto font-medium flex items-center"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} className="mr-1" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>

          {(keyword ||
            location ||
            filters.jobType.length > 0 ||
            filters.experienceLevel.length > 0 ||
            filters.salary) && (
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
            {/* Job Type */}
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Job Type</h3>
              <div className="space-y-2">
                {jobTypes.map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded text-purple-600 focus:ring-purple-500 mr-2"
                      checked={filters.jobType.includes(type)}
                      onChange={() => handleFilterChange("jobType", type)}
                    />
                    <span className="text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                Experience Level
              </h3>
              <div className="space-y-2">
                {experienceLevels.map((level) => (
                  <label key={level} className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded text-purple-600 focus:ring-purple-500 mr-2"
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

            {/* Salary Range */}
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Salary Range</h3>
              <div className="space-y-2">
                {salaryRanges.map((range) => (
                  <label key={range} className="flex items-center">
                    <input
                      type="radio"
                      name="salary"
                      className="text-purple-600 focus:ring-purple-500 mr-2"
                      checked={filters.salary === range}
                      onChange={() => handleFilterChange("salary", range)}
                    />
                    <span className="text-sm text-gray-700">{range}</span>
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
