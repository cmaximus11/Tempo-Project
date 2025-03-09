"use server";

import { createClient } from "../../../supabase/server";
import { redirect } from "next/navigation";
import { encodedRedirect } from "@/utils/utils";

export async function updateCandidateProfileAction(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Extract form data
  const fullName = formData.get("full_name")?.toString();
  const professionalTitle = formData.get("professional_title")?.toString();
  const phone = formData.get("phone")?.toString();
  const availability = formData.get("availability")?.toString();
  const location = formData.get("location")?.toString();
  const remotePreference = formData.get("remote_preference")?.toString();
  const relocation = formData.get("relocation")?.toString();
  const highestEducation = formData.get("highest_education")?.toString();
  const institution = formData.get("institution")?.toString();
  const fieldOfStudy = formData.get("field_of_study")?.toString();
  const yearsOfExperience = formData.get("years_of_experience")?.toString();
  const currentCompany = formData.get("current_company")?.toString();
  const currentPosition = formData.get("current_position")?.toString();
  const skills = formData.get("skills")?.toString();
  const professionalSummary = formData.get("professional_summary")?.toString();

  // Validate required fields
  if (
    !fullName ||
    !professionalTitle ||
    !availability ||
    !location ||
    !highestEducation ||
    !institution ||
    !fieldOfStudy ||
    !yearsOfExperience ||
    !skills ||
    !professionalSummary
  ) {
    return encodedRedirect(
      "error",
      "/onboarding/candidate",
      "Please fill in all required fields",
    );
  }

  try {
    // First, check if profile already exists
    const { data: existingProfile } = await supabase
      .from("candidate_profiles")
      .select("id")
      .eq("user_id", user.id)
      .single();

    // Prepare profile data
    const profileData = {
      user_id: user.id,
      full_name: fullName,
      professional_title: professionalTitle,
      phone,
      availability,
      location,
      remote_preference: remotePreference,
      relocation,
      highest_education: highestEducation,
      institution,
      field_of_study: fieldOfStudy,
      years_of_experience: parseInt(yearsOfExperience),
      current_company: currentCompany,
      current_position: currentPosition,
      skills: skills.split(",").map((skill) => skill.trim()),
      professional_summary: professionalSummary,
      is_onboarded: true,
      updated_at: new Date().toISOString(),
    };

    // Update user metadata
    await supabase.auth.updateUser({
      data: {
        role: "candidate",
        full_name: fullName,
      },
    });

    if (existingProfile) {
      // Update existing profile
      const { error } = await supabase
        .from("candidate_profiles")
        .update(profileData)
        .eq("id", existingProfile.id);

      if (error) throw error;
    } else {
      // Create new profile
      const { error } = await supabase.from("candidate_profiles").insert({
        ...profileData,
        created_at: new Date().toISOString(),
      });

      if (error) throw error;
    }

    return redirect("/candidate-dashboard");
  } catch (error: any) {
    return encodedRedirect(
      "error",
      "/onboarding/candidate",
      `Error updating profile: ${error.message}`,
    );
  }
}
