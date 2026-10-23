"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase";

export default function LoginForm() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (!email || !password) {
        setError("Please enter your email address and password.");
        return;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError("Unable to sign in with that email address and password.");
        return;
      }

      setEmail("");
      setPassword("");
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Unable to sign in with that email address and password.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div>
        <label
          htmlFor="email"
          className="block text-xs font-semibold uppercase tracking-[0.2em] text-gray-300"
        >
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 w-full border border-zinc-700 bg-black px-4 py-3 text-white shadow-sm outline-none transition placeholder:text-gray-600 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-xs font-semibold uppercase tracking-[0.2em] text-gray-300"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type={isPasswordVisible ? "text" : "password"}
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 w-full border border-zinc-700 bg-black px-4 py-3 text-white shadow-sm outline-none transition placeholder:text-gray-600 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
        />
        <button
          type="button"
          aria-controls="password"
          aria-pressed={isPasswordVisible}
          onClick={() => setIsPasswordVisible((visible) => !visible)}
          className="mt-3 text-xs font-semibold uppercase tracking-wider text-yellow-500 transition hover:text-yellow-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
        >
          {isPasswordVisible ? "Hide password" : "Show password"}
        </button>
      </div>

      {error ? (
        <p
          role="alert"
          className="border border-red-500/40 bg-red-950/30 px-4 py-3 text-sm leading-6 text-red-200"
        >
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="w-full bg-yellow-500 px-6 py-4 text-sm font-bold uppercase tracking-wider text-black transition duration-300 hover:bg-yellow-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
