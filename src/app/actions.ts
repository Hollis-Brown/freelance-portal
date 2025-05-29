"use server";

import { encodedRedirect } from "@/utils/utils";
import { redirect } from "next/navigation";
import { createServerActionClient } from "../../supabase/server-actions";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const fullName = formData.get("full_name")?.toString() || "";
  const supabase = await createServerActionClient();

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          email: email,
        },
      },
    });

    if (error) {
      return { error: error.message };
    }

    if (user) {
      try {
        // Use upsert instead of insert to handle cases where the user might already exist
        // Use service role client for inserting user data to bypass RLS
        const supabaseAdmin = await createServerActionClient({ admin: true });
        const { error: updateError } = await supabaseAdmin.from("users").upsert(
          {
            id: user.id, // Use id instead of user_id to match the primary key
            user_id: user.id,
            full_name: fullName,
            name: fullName,
            email: email,
            token_identifier: user.id, // Add token_identifier as required by schema
          },
          { onConflict: "id", ignoreDuplicates: false },
        );

        if (updateError) {
          console.log("Error upserting user:", updateError);
          return { error: "Error updating user profile. Please try again." };
        }
      } catch (err) {
        console.log("Exception during user upsert:", err);
        return { error: "Error creating user profile. Please try again." };
      }
    }

    return {
      success: true,
      message:
        "Thanks for signing up! Please check your email for a verification link.",
    };
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unexpected error occurred";
    return { error: errorMessage };
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    const supabase = await createServerActionClient();

    if (!supabase) {
      return { error: "Unable to initialize authentication client" };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Supabase auth error:", error);
      return { error: error.message };
    }

    if (!data.user) {
      return { error: "Invalid credentials" };
    }

    // Return success object for client-side handling
    return { success: true, redirectTo: "/dashboard" };
  } catch (err) {
    console.error("Sign in action error:", err);
    const errorMessage =
      err instanceof Error ? err.message : "An unexpected error occurred";
    return { error: errorMessage };
  }
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createServerActionClient();
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return { error: "Email is required" };
  }

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {});

    if (error) {
      return { error: error.message || "Could not reset password" };
    }

    if (callbackUrl) {
      return { success: true, redirectTo: callbackUrl };
    }

    return {
      success: true,
      message: "Check your email for a link to reset your password.",
    };
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unexpected error occurred";
    return { error: errorMessage };
  }
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createServerActionClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    return { error: "Password and confirm password are required" };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  try {
    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      return { error: error.message || "Password update failed" };
    }

    return { success: true, message: "Password updated successfully" };
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unexpected error occurred";
    return { error: errorMessage };
  }
};

export const signOutAction = async () => {
  const supabase = await createServerActionClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const checkUserSubscription = async (userId: string) => {
  const supabase = await createServerActionClient();

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
