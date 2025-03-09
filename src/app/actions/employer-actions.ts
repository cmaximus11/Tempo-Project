"use server";

import { createClient } from "../../../supabase/server";
import { redirect } from "next/navigation";
import { encodedRedirect } from "@/utils/utils";

export async function updateEmployerProfileAction(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Extract form data
  const companyName = formData.get("company_name")?.toString();
  const industry = formData.get("industry")?.toString();
  const companySize = formData.get("company_size")?.toString();
  const foundedYear = formData.get("founded_year")?.toString();
  const headquarters = formData.get("headquarters")?.toString();
  const hasRemotePositions = formData.get("has_remote_positions")?.toString();
  const website = formData.get("website")?.toString();
  const linkedin = formData.get("linkedin")?.toString();
  const hiringRoles = formData.get("hiring_roles")?.toString();
  const hiringFrequency = formData.get("hiring_frequency")?.toString();
  const companyDescription = formData.get("company_description")?.toString();

  // Validate required fields
  if (
    !companyName ||
    !industry ||
    !companySize ||
    !headquarters ||
    !hiringRoles ||
    !hiringFrequency ||
    !companyDescription
  ) {
    return encodedRedirect(
      "error",
      "/onboarding/employer",
      "Please fill in all required fields",
    );
  }

  try {
    // First, check if profile already exists
    const { data: existingProfile } = await supabase
      .from("employer_profiles")
      .select("id")
      .eq("user_id", user.id)
      .single();

    // Prepare profile data
    const profileData = {
      user_id: user.id,
      company_name: companyName,
      industry,
      company_size: companySize,
      founded_year: foundedYear ? parseInt(foundedYear) : null,
      headquarters,
      has_remote_positions: hasRemotePositions,
      website,
      linkedin,
      hiring_roles: hiringRoles,
      hiring_frequency: hiringFrequency,
      company_description: companyDescription,
      is_onboarded: true,
      updated_at: new Date().toISOString(),
    };

    // Update user metadata
    await supabase.auth.updateUser({
      data: {
        role: "employer",
        company_name: companyName,
      },
    });

    if (existingProfile) {
      // Update existing profile
      const { error } = await supabase
        .from("employer_profiles")
        .update(profileData)
        .eq("id", existingProfile.id);

      if (error) throw error;
    } else {
      // Create new profile
      const { error } = await supabase.from("employer_profiles").insert({
        ...profileData,
        created_at: new Date().toISOString(),
      });

      if (error) throw error;
    }

    return redirect("/dashboard");
  } catch (error: any) {
    return encodedRedirect(
      "error",
      "/onboarding/employer",
      `Error updating profile: ${error.message}`,
    );
  }
}
