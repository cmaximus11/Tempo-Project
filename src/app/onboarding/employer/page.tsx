import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building2, MapPin, Globe, Users, Briefcase } from "lucide-react";
import Link from "next/link";
import { SubmitButton } from "@/components/submit-button";
import { updateEmployerProfileAction } from "@/app/actions/employer-actions";

export default async function EmployerOnboarding() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Check if user already has a profile and redirect to dashboard if they do
  const { data: profile } = await supabase
    .from("employer_profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (profile?.is_onboarded) {
    return redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">
              Complete Your Employer Profile
            </h1>
            <p className="text-gray-600">
              Help us tailor your experience and connect you with the right
              candidates
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
            <form>
              <div className="space-y-6">
                {/* Company Information */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Building2 className="mr-2 h-5 w-5 text-blue-600" />
                    Company Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company_name">Company Name *</Label>
                      <Input
                        id="company_name"
                        name="company_name"
                        placeholder="Acme Corporation"
                        defaultValue={user.user_metadata?.company_name || ""}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry *</Label>
                      <Input
                        id="industry"
                        name="industry"
                        placeholder="Technology, Healthcare, etc."
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company_size">Company Size *</Label>
                      <select
                        id="company_size"
                        name="company_size"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                      >
                        <option value="">Select company size</option>
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-500">201-500 employees</option>
                        <option value="501-1000">501-1000 employees</option>
                        <option value="1001+">1001+ employees</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="founded_year">Founded Year</Label>
                      <Input
                        id="founded_year"
                        name="founded_year"
                        type="number"
                        placeholder="2010"
                      />
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
                      <Label htmlFor="headquarters">Headquarters *</Label>
                      <Input
                        id="headquarters"
                        name="headquarters"
                        placeholder="City, Country"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="has_remote_positions">
                        Remote Positions
                      </Label>
                      <select
                        id="has_remote_positions"
                        name="has_remote_positions"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="true">
                          Yes, we offer remote positions
                        </option>
                        <option value="false">No, on-site only</option>
                        <option value="hybrid">We offer hybrid options</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Online Presence */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Globe className="mr-2 h-5 w-5 text-blue-600" />
                    Online Presence
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="website">Company Website</Label>
                      <Input
                        id="website"
                        name="website"
                        placeholder="https://www.example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        name="linkedin"
                        placeholder="https://www.linkedin.com/company/example"
                      />
                    </div>
                  </div>
                </div>

                {/* Recruitment Needs */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Users className="mr-2 h-5 w-5 text-blue-600" />
                    Recruitment Needs
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="hiring_roles">
                        What roles are you primarily hiring for? *
                      </Label>
                      <Input
                        id="hiring_roles"
                        name="hiring_roles"
                        placeholder="Software Engineers, Product Managers, etc."
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hiring_frequency">
                        How frequently do you hire? *
                      </Label>
                      <select
                        id="hiring_frequency"
                        name="hiring_frequency"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                      >
                        <option value="">Select hiring frequency</option>
                        <option value="continuously">
                          Continuously throughout the year
                        </option>
                        <option value="quarterly">Quarterly</option>
                        <option value="biannually">Twice a year</option>
                        <option value="annually">Once a year</option>
                        <option value="as_needed">As needed</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Company Description */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Briefcase className="mr-2 h-5 w-5 text-blue-600" />
                    About Your Company
                  </h2>
                  <div className="space-y-2">
                    <Label htmlFor="company_description">
                      Company Description *
                    </Label>
                    <Textarea
                      id="company_description"
                      name="company_description"
                      placeholder="Tell potential candidates about your company, culture, and what makes it a great place to work..."
                      className="min-h-[150px]"
                      required
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 flex justify-between">
                  <Link href="/dashboard">
                    <Button variant="outline">Skip for now</Button>
                  </Link>
                  <SubmitButton
                    formAction={updateEmployerProfileAction}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
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
