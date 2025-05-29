"use client";

import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import Navbar from "@/components/navbar";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface LoginProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function SignInPage({ searchParams }: LoginProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Parse message from searchParams
  const message: Message = {};
  if (searchParams.error) {
    message.error = Array.isArray(searchParams.error)
      ? searchParams.error[0]
      : searchParams.error;
  }
  if (searchParams.success) {
    message.success = Array.isArray(searchParams.success)
      ? searchParams.success[0]
      : searchParams.success;
  }
  if (searchParams.message) {
    message.message = Array.isArray(searchParams.message)
      ? searchParams.message[0]
      : searchParams.message;
  }

  // Handle form submission with client-side navigation
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const formData = new FormData(event.currentTarget);
      const result = await signInAction(formData);

      console.log("Sign in result:", result);

      if (result && typeof result === "object") {
        if ("success" in result && result.success && result.redirectTo) {
          router.push(result.redirectTo);
          return;
        } else if ("error" in result) {
          setErrorMessage(result.error);
        }
      }
    } catch (error) {
      console.error("Sign in error:", error);
      setErrorMessage("An error occurred during sign in");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Debug logging
  useEffect(() => {
    console.log("SearchParams:", searchParams);
    console.log("Parsed message:", message);
  }, [searchParams]);

  if (message.message) {
    return (
      <div className="flex h-screen w-full flex-1 items-center justify-center p-4 sm:max-w-md">
        <FormMessage message={message} />
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
              <h1 className="text-3xl font-semibold tracking-tight">Sign in</h1>
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  className="text-primary font-medium hover:underline transition-all"
                  href="/sign-up"
                >
                  Sign up
                </Link>
              </p>
            </div>

            <div className="space-y-4">
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
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Link
                    className="text-xs text-muted-foreground hover:text-foreground hover:underline transition-all"
                    href="/forgot-password"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Your password"
                  required
                  className="w-full"
                />
              </div>
            </div>

            <SubmitButton
              className="w-full"
              pendingText="Signing in..."
              type="submit"
              disabled={isSubmitting}
            >
              Sign in
            </SubmitButton>

            {errorMessage && (
              <div className="text-red-500 border-l-2 border-red-500 px-4 text-sm">
                {errorMessage}
              </div>
            )}
            <FormMessage message={message} />
          </form>
        </div>
      </div>
    </>
  );
}
