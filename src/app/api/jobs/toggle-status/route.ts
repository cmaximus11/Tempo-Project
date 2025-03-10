import { createClient } from "../../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const jobId = formData.get("jobId") as string;

    if (!jobId) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 },
      );
    }

    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get employer profile
    const { data: employerProfile } = await supabase
      .from("employer_profiles")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!employerProfile) {
      return NextResponse.json(
        { error: "Employer profile not found" },
        { status: 404 },
      );
    }

    // Get current job status
    const { data: job } = await supabase
      .from("jobs")
      .select("is_active")
      .eq("id", jobId)
      .eq("company_id", employerProfile.id)
      .single();

    if (!job) {
      return NextResponse.json(
        { error: "Job not found or you don't have permission to update it" },
        { status: 404 },
      );
    }

    // Toggle job status
    const { error } = await supabase
      .from("jobs")
      .update({ is_active: !job.is_active })
      .eq("id", jobId)
      .eq("company_id", employerProfile.id);

    if (error) {
      return NextResponse.json(
        { error: "Failed to update job status" },
        { status: 500 },
      );
    }

    return NextResponse.redirect(
      new URL(`/dashboard/jobs/${jobId}`, request.url),
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
