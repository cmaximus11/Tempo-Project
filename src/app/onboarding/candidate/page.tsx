import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  UserCircle,
  MapPin,
  GraduationCap,
  Briefcase,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { SubmitButton } from "@/components/submit-button";
import { updateCandidateProfileAction } from "@/app/actions/candidate-actions";

export default async function CandidateOnboarding() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Check if user already has a profile and redirect to dashboard if they do
  const { data: profile } = await supabase
    .from("candidate_profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (profile?.is_onboarded) {
    return redirect("/candidate-dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">
              Complete Your Candidate Profile
            </h1>
            <p className="text-gray-600">
              Help us match you with the perfect job opportunities
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
            <form>
              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <UserCircle className="mr-2 h-5 w-5 text-blue-600" />
                    Personal Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">Full Name *</Label>
                      <Input
                        id="full_name"
                        name="full_name"
                        placeholder="John Doe"
                        defaultValue={user.user_metadata?.full_name || ""}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="professional_title">
                        Professional Title *
                      </Label>
                      <Input
                        id="professional_title"
                        name="professional_title"
                        placeholder="Software Engineer, Product Manager, etc."
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="availability">Availability *</Label>
                      <select
                        id="availability"
                        name="availability"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                      >
                        <option value="">Select availability</option>
                        <option value="immediate">Immediate</option>
                        <option value="2_weeks">Within 2 weeks</option>
                        <option value="1_month">Within 1 month</option>
                        <option value="3_months">1-3 months</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-blue-600" />
                    Location
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Current Location *</Label>
                      <Input
                        id="location"
                        name="location"
                        placeholder="City, Country"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="remote_preference">
                        Remote Work Preference
                      </Label>
                      <select
                        id="remote_preference"
                        name="remote_preference"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="remote_only">Remote only</option>
                        <option value="hybrid">Hybrid preferred</option>
                        <option value="onsite">On-site preferred</option>
                        <option value="flexible">
                          Flexible (no preference)
                        </option>
                      </select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="relocation">Willing to Relocate?</Label>
                      <select
                        id="relocation"
                        name="relocation"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="yes">Yes, willing to relocate</option>
                        <option value="no">No, not willing to relocate</option>
                        <option value="specific">
                          Yes, but only to specific locations
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <GraduationCap className="mr-2 h-5 w-5 text-blue-600" />
                    Education
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="highest_education">
                        Highest Education Level *
                      </Label>
                      <select
                        id="highest_education"
                        name="highest_education"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                      >
                        <option value="">Select education level</option>
                        <option value="high_school">High School</option>
                        <option value="associate">Associate's Degree</option>
                        <option value="bachelor">Bachelor's Degree</option>
                        <option value="master">Master's Degree</option>
                        <option value="doctorate">Doctorate</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="institution">Institution *</Label>
                      <Input
                        id="institution"
                        name="institution"
                        placeholder="University/College Name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="field_of_study">Field of Study *</Label>
                      <Input
                        id="field_of_study"
                        name="field_of_study"
                        placeholder="Computer Science, Business, etc."
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Briefcase className="mr-2 h-5 w-5 text-blue-600" />
                    Experience
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="years_of_experience">
                        Years of Experience *
                      </Label>
                      <Input
                        id="years_of_experience"
                        name="years_of_experience"
                        type="number"
                        placeholder="5"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="current_company">
                        Current/Most Recent Company
                      </Label>
                      <Input
                        id="current_company"
                        name="current_company"
                        placeholder="Company Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="current_position">
                        Current/Most Recent Position
                      </Label>
                      <Input
                        id="current_position"
                        name="current_position"
                        placeholder="Position Title"
                      />
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-blue-600" />
                    Skills & Summary
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="skills">Key Skills *</Label>
                      <Input
                        id="skills"
                        name="skills"
                        placeholder="JavaScript, React, Project Management, etc. (comma separated)"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="professional_summary">
                        Professional Summary *
                      </Label>
                      <Textarea
                        id="professional_summary"
                        name="professional_summary"
                        placeholder="Briefly describe your professional background, expertise, and career goals..."
                        className="min-h-[150px]"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 flex justify-between">
                  <Link href="/candidate-dashboard">
                    <Button variant="outline">Skip for now</Button>
                  </Link>
                  <SubmitButton
                    formAction={updateCandidateProfileAction}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Complete Profile
                  </SubmitButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
