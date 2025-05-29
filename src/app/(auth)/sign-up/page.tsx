"use client";

import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import { signUpAction } from "@/app/actions";
import Navbar from "@/components/navbar";
import { useRef, useState } from "react";

export default function Signup({ searchParams }: { searchParams: Message }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const formData = new FormData(event.currentTarget);
      const result = await signUpAction(formData);

      if (result && typeof result === "object") {
        if ("success" in result) {
          setSuccessMessage(
            "Thanks for signing up! Please check your email for a verification link.",
          );
          if (formRef.current) formRef.current.reset();
        } else if ("error" in result) {
          setErrorMessage(result.error);
        }
      }
    } catch (error) {
      console.error("Sign up error:", error);
      setErrorMessage("An error occurred during sign up");
    } finally {
      setIsSubmitting(false);
    }
  };

  if ("message" in searchParams) {
    return (
      <div className="flex h-screen w-full flex-1 items-center justify-center p-4 sm:max-w-md">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-8">
        <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-sm">
          <form
            className="flex flex-col space-y-6"
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-semibold tracking-tight">Sign up</h1>
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  className="text-primary font-medium hover:underline transition-all"
                  href="/sign-in"
                >
                  Sign in
                </Link>
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="full_name" className="text-sm font-medium">
                  Full Name
                </Label>
                <Input
                  id="full_name"
                  name="full_name"
                  type="text"
                  placeholder="John Doe"
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Your password"
                  minLength={6}
                  required
                  className="w-full"
                />
              </div>
            </div>

            <SubmitButton
              type="submit"
              pendingText="Signing up..."
              className="w-full"
              disabled={isSubmitting}
            >
              Sign up
            </SubmitButton>

            {errorMessage && (
              <div className="text-red-500 border-l-2 border-red-500 px-4 text-sm">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="text-green-500 border-l-2 border-green-500 px-4 text-sm">
                {successMessage}
              </div>
            )}
            <FormMessage message={searchParams} />
          </form>
        </div>
        <SmtpMessage />
      </div>
    </>
  );
}
