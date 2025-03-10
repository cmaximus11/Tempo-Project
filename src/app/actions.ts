"use server";

import { createClient } from "../../supabase/server";
import { encodedRedirect } from "@/utils/utils";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpEmployerAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const fullName = formData.get("full_name")?.toString() || "";
  const companyName = formData.get("company_name")?.toString() || "";
  const supabase = await createClient();
  const origin = headers().get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up/employer",
      "Email and password are required",
    );
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        full_name: fullName,
        email: email,
        role: "employer",
        company_name: companyName,
      },
    },
  });

  if (error) {
    return encodedRedirect("error", "/sign-up/employer", error.message);
  }

  if (user) {
    // Create user record
    await supabase
      .from("users")
      .insert({
        id: user.id,
        user_id: user.id,
        name: fullName,
        email: email,
        token_identifier: user.id,
        created_at: new Date().toISOString(),
      })
      .single();

    // Create initial employer profile
    await supabase
      .from("employer_profiles")
      .insert({
        user_id: user.id,
        company_name: companyName,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .single();

    // Sign in the user directly
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!signInError) {
      return redirect("/onboarding/employer");
    }
  }

  // Only reach here if auto-signin failed
  return encodedRedirect(
    "success",
    "/sign-up/employer",
    "Thanks for signing up! Please check your email for a verification link.",
  );
};

export const signUpCandidateAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const fullName = formData.get("full_name")?.toString() || "";
  const supabase = await createClient();
  const origin = headers().get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up/candidate",
      "Email and password are required",
    );
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        full_name: fullName,
        email: email,
        role: "candidate",
      },
    },
  });

  if (error) {
    return encodedRedirect("error", "/sign-up/candidate", error.message);
  }

  if (user) {
    // Create user record
    await supabase
      .from("users")
      .insert({
        id: user.id,
        user_id: user.id,
        name: fullName,
        email: email,
        token_identifier: user.id,
        created_at: new Date().toISOString(),
      })
      .single();

    // Create initial candidate profile
    await supabase
      .from("candidate_profiles")
      .insert({
        user_id: user.id,
        full_name: fullName,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .single();

    // Sign in the user directly
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!signInError) {
      return redirect("/onboarding/candidate");
    }
  }

  // Only reach here if auto-signin failed
  return encodedRedirect(
    "success",
    "/sign-up/candidate",
    "Thanks for signing up! Please check your email for a verification link.",
  );
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  // Check user role and redirect accordingly
  const user = data.user;
  if (user) {
    // If user has no role yet, redirect to role selection
    if (!user.user_metadata?.role) {
      return redirect("/role-selection");
    }

    // Redirect based on role
    if (user.user_metadata?.role === "candidate") {
      return redirect("/candidate-dashboard");
    } else {
      return redirect("/dashboard");
    }
  }

  // Default redirect if no specific condition is met
  return redirect("/dashboard");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = headers().get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    return encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    return encodedRedirect(
      "error",
      "/dashboard/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    return encodedRedirect(
      "error",
      "/dashboard/reset-password",
      "Password update failed",
    );
  }

  return encodedRedirect(
    "success",
    "/protected/reset-password",
    "Password updated",
  );
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const checkUserSubscription = async (userId: string) => {
  const supabase = await createClient();

  const { data: subscription, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "active")
    .single();

  if (error) {
    return false;
  }

  return !!subscription;
};
