"use client";

import { resetPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import Navbar from "@/components/navbar";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function ResetPassword({
  searchParams,
}: {
  searchParams: Message;
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Handle form submission with client-side navigation
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const formData = new FormData(event.currentTarget);
      const password = formData.get("password") as string;
      const confirmPassword = formData.get("confirmPassword") as string;

      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match");
        setIsSubmitting(false);
        return;
      }

      const result = await resetPasswordAction(formData);

      if (result && typeof result === "object") {
        if ("success" in result) {
          setSuccessMessage("Password updated successfully");
          setTimeout(() => {
            router.push("/dashboard");
          }, 2000);
        } else if ("error" in result) {
          setErrorMessage(result.error);
        }
      }
    } catch (error) {
      console.error("Password reset error:", error);
      setErrorMessage("An error occurred while resetting your password");
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
              <h1 className="text-3xl font-semibold tracking-tight">
                Reset password
              </h1>
              <p className="text-sm text-muted-foreground">
                Please enter your new password below.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  New password
                </Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="New password"
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium"
                >
                  Confirm password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  required
                  className="w-full"
                />
              </div>
            </div>

            <SubmitButton
              type="submit"
              pendingText="Resetting password..."
              className="w-full"
              disabled={isSubmitting}
            >
              Reset password
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
      </div>
    </>
  );
}
