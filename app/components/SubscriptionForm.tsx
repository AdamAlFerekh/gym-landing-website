"use client";

import { useState } from "react";
import { isValidLebaneseMobile } from "@/lib/validation";
import { submitMembershipRegistration } from "@/services/membershipService";
interface SubscriptionFormProps {
  membership: {
    id: number;
    duration: string;
    price: string;
  };
  onSuccess: () => void;
}

export default function SubscriptionForm({
  membership,
  onSuccess,
}: SubscriptionFormProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    if (!isValidLebaneseMobile(phone)) {
      setPhoneError(
        "Enter a valid Lebanese mobile number, e.g. 71 123 456 or +961 71 123 456.",
      );
      return;
    }

    setPhoneError("");
    setIsSubmitting(true);

    try {
      await submitMembershipRegistration({
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        membershipId: membership.id,
      });

      // Clear the form fields after the registration is saved.
      setFullName("");
      setPhone("");
      setEmail("");

      // Replace the form with the success screen.
      setIsSubmitted(true);

      // Give the success animation time to finish.
      await new Promise((resolve) => setTimeout(resolve, 1600));

      // Close the form and return to memberships.
      onSuccess();
    } catch (error) {
      console.error("Registration failed:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`mx-auto max-w-2xl border border-zinc-800 bg-zinc-950 p-6 transition-all duration-500 sm:p-8 ${
        isSubmitted ? "animate-success-pop border-yellow-500" : ""
      }`}
    >
      {isSubmitted ? (
        <div className="flex min-h-64 flex-col items-center justify-center text-center">
          <div className="flex h-16 w-16 animate-success-check items-center justify-center rounded-full border-2 border-yellow-500 text-yellow-500">
            <svg
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                d="m5 12 4 4L19 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h3 className="mt-6 text-2xl font-bold uppercase text-white">
            Registration Request Received
          </h3>

          <p className="mt-3 text-sm text-gray-400">
            Thank you! Your registration request has been received and will be
            reviewed by the gym.
          </p>
        </div>
      ) : errorMessage ? (
        <div className="flex min-h-64 flex-col items-center justify-center text-center">
          <div className="flex h-16 w-16 animate-success-check items-center justify-center rounded-full border-2 border-red-500 text-red-500">
            <svg
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path
                d="M6 6l12 12M18 6L6 18"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h3 className="mt-6 text-2xl font-bold uppercase text-white">
            Registration Failed
          </h3>

          <p className="mt-3 text-sm text-gray-400" role="alert">
            {errorMessage}
          </p>

          <button
            type="button"
            onClick={() => setErrorMessage("")}
            className="mt-6 border border-yellow-500 px-6 py-3 text-sm font-bold uppercase tracking-wider text-yellow-500 transition hover:bg-yellow-500 hover:text-black"
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow-500">
              Selected Membership
            </p>

            <h3 className="mt-3 text-2xl font-bold uppercase text-white">
              {membership.duration}
            </h3>

            <p className="mt-1 text-xl font-semibold text-yellow-500">
              {membership.price}
            </p>
          </div>

          <div className="my-7 h-px bg-zinc-800" />

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="fullName"
                className="text-xs font-semibold uppercase tracking-wider text-gray-400"
              >
                Full Name
              </label>

              <input
                id="fullName"
                type="text"
                required
                minLength={3}
                autoComplete="name"
                placeholder="Enter your full name"
                className="mt-2 w-full border border-zinc-800 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-yellow-500"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="text-xs font-semibold uppercase tracking-wider text-gray-400"
              >
                Phone Number
              </label>

              <input
                id="phone"
                type="tel"
                required
                autoComplete="tel"
                placeholder="71 123 456 or +961 71 123 456"
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value);
                  setPhoneError("");
                }}
                aria-invalid={!!phoneError}
                aria-describedby={phoneError ? "phone-error" : undefined}
                className={`mt-2 w-full border bg-black px-4 py-3 text-sm text-white outline-none transition ${
                  phoneError
                    ? "border-red-500 focus:border-red-500"
                    : "border-zinc-800 focus:border-yellow-500"
                }`}
              />

              {phoneError && (
                <p
                  id="phone-error"
                  className="mt-2 text-sm text-red-400"
                  role="alert"
                >
                  {phoneError}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-xs font-semibold uppercase tracking-wider text-gray-400"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="Enter your email"
                className="mt-2 w-full border border-zinc-800 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-yellow-500"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-3 bg-yellow-500 px-6 py-3 text-sm font-bold uppercase tracking-wider text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting && (
                <svg
                  className="h-5 w-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />

                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              )}

              {isSubmitting ? "Submitting..." : "Submit Registration"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
