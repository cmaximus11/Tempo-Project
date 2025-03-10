"use client";

import { useState } from "react";
import { createClient } from "../../../../supabase/client";
import { useRouter } from "next/navigation";
import DashboardNavbar from "@/components/dashboard-navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, Plus, Trash2, Info } from "lucide-react";
import { SubscriptionCheck } from "@/components/subscription-check";

export default function PostJobPage() {
  const router = useRouter();
  const supabase = createClient();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [isRemote, setIsRemote] = useState(false);
  const [jobType, setJobType] = useState("Full-time");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [description, setDescription] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("Mid-Level");

  // Dynamic arrays for responsibilities, requirements, and benefits
  const [responsibilities, setResponsibilities] = useState<string[]>([""]);
  const [requirements, setRequirements] = useState<string[]>([""]);
  const [benefits, setBenefits] = useState<string[]>([""]);

  // Add new item to array
  const addItem = (type: "responsibilities" | "requirements" | "benefits") => {
    if (type === "responsibilities") {
      setResponsibilities([...responsibilities, ""]);
    } else if (type === "requirements") {
      setRequirements([...requirements, ""]);
    } else if (type === "benefits") {
      setBenefits([...benefits, ""]);
    }
  };

  // Remove item from array
  const removeItem = (
    type: "responsibilities" | "requirements" | "benefits",
    index: number,
  ) => {
    if (type === "responsibilities") {
      const newItems = [...responsibilities];
      newItems.splice(index, 1);
      setResponsibilities(newItems);
    } else if (type === "requirements") {
      const newItems = [...requirements];
      newItems.splice(index, 1);
      setRequirements(newItems);
    } else if (type === "benefits") {
      const newItems = [...benefits];
      newItems.splice(index, 1);
      setBenefits(newItems);
    }
  };

  // Update item in array
  const updateItem = (
    type: "responsibilities" | "requirements" | "benefits",
    index: number,
    value: string,
  ) => {
    if (type === "responsibilities") {
      const newItems = [...responsibilities];
      newItems[index] = value;
      setResponsibilities(newItems);
    } else if (type === "requirements") {
      const newItems = [...requirements];
      newItems[index] = value;
      setRequirements(newItems);
    } else if (type === "benefits") {
      const newItems = [...benefits];
      newItems[index] = value;
      setBenefits(newItems);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("You must be logged in to post a job");
      }

      // Get employer profile
      const { data: employerProfile, error: profileError } = await supabase
        .from("employer_profiles")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (profileError || !employerProfile) {
        throw new Error(
          "Employer profile not found. Please complete your profile first.",
        );
      }

      // Filter out empty items
      const filteredResponsibilities = responsibilities.filter(
        (item) => item.trim() !== "",
      );
      const filteredRequirements = requirements.filter(
        (item) => item.trim() !== "",
      );
      const filteredBenefits = benefits.filter((item) => item.trim() !== "");

      // Create job posting
      const { data: job, error: jobError } = await supabase
        .from("jobs")
        .insert({
          title,
          company_id: employerProfile.id,
          location,
          salary_min: salaryMin ? parseInt(salaryMin) : null,
          salary_max: salaryMax ? parseInt(salaryMax) : null,
          job_type: jobType,
          description,
          responsibilities: filteredResponsibilities,
          requirements: filteredRequirements,
          benefits: filteredBenefits,
          is_remote: isRemote,
          experience_level: experienceLevel,
          is_active: true,
        })
        .select()
        .single();

      if (jobError) {
        throw new Error(jobError.message);
      }

      setSuccess("Job posted successfully!");

      // Redirect to job details page after a short delay
      setTimeout(() => {
        router.push(`/dashboard/jobs/${job.id}`);
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SubscriptionCheck>
      <DashboardNavbar />
      <main className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <Briefcase className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold">Post a New Job</h1>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-md">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="border-b border-gray-200 pb-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Basic Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Job Title *</Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Senior Frontend Developer"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location *</Label>
                      <Input
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. San Francisco, CA"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="jobType">Job Type *</Label>
                      <select
                        id="jobType"
                        value={jobType}
                        onChange={(e) => setJobType(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Temporary">Temporary</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experienceLevel">
                        Experience Level *
                      </Label>
                      <select
                        id="experienceLevel"
                        value={experienceLevel}
                        onChange={(e) => setExperienceLevel(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                      >
                        <option value="Entry Level">Entry Level</option>
                        <option value="Mid-Level">Mid-Level</option>
                        <option value="Senior Level">Senior Level</option>
                        <option value="Director">Director</option>
                        <option value="Executive">Executive</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="salaryMin">Minimum Salary</Label>
                      <Input
                        id="salaryMin"
                        type="number"
                        value={salaryMin}
                        onChange={(e) => setSalaryMin(e.target.value)}
                        placeholder="e.g. 80000"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="salaryMax">Maximum Salary</Label>
                      <Input
                        id="salaryMax"
                        type="number"
                        value={salaryMax}
                        onChange={(e) => setSalaryMax(e.target.value)}
                        placeholder="e.g. 120000"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="isRemote"
                        checked={isRemote}
                        onChange={(e) => setIsRemote(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <Label htmlFor="isRemote">
                        This is a remote position
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Job Description */}
                <div className="border-b border-gray-200 pb-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Job Description *
                  </h2>
                  <div className="space-y-2">
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Provide a detailed description of the job..."
                      className="min-h-[150px]"
                      required
                    />
                  </div>
                </div>

                {/* Responsibilities */}
                <div className="border-b border-gray-200 pb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Responsibilities</h2>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addItem("responsibilities")}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {responsibilities.map((item, index) => (
                      <div key={`resp-${index}`} className="flex gap-2">
                        <Input
                          value={item}
                          onChange={(e) =>
                            updateItem(
                              "responsibilities",
                              index,
                              e.target.value,
                            )
                          }
                          placeholder={`Responsibility ${index + 1}`}
                        />
                        {responsibilities.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              removeItem("responsibilities", index)
                            }
                            className="flex-shrink-0"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <div className="border-b border-gray-200 pb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Requirements</h2>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addItem("requirements")}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {requirements.map((item, index) => (
                      <div key={`req-${index}`} className="flex gap-2">
                        <Input
                          value={item}
                          onChange={(e) =>
                            updateItem("requirements", index, e.target.value)
                          }
                          placeholder={`Requirement ${index + 1}`}
                        />
                        {requirements.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem("requirements", index)}
                            className="flex-shrink-0"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div className="border-b border-gray-200 pb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Benefits</h2>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addItem("benefits")}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {benefits.map((item, index) => (
                      <div key={`ben-${index}`} className="flex gap-2">
                        <Input
                          value={item}
                          onChange={(e) =>
                            updateItem("benefits", index, e.target.value)
                          }
                          placeholder={`Benefit ${index + 1}`}
                        />
                        {benefits.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem("benefits", index)}
                            className="flex-shrink-0"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <div className="flex justify-between items-center pt-4">
                  <div className="flex items-start gap-2 text-sm text-gray-500">
                    <Info className="h-5 w-5 flex-shrink-0 text-blue-500" />
                    <p>
                      Fields marked with * are required. Your job posting will
                      be reviewed before being published.
                    </p>
                  </div>
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Posting..." : "Post Job"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </SubscriptionCheck>
  );
}
