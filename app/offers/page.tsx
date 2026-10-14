"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { memberships } from "@/data/memberships";
import SubscriptionForm from "@/app/components/SubscriptionForm";

export default function Offers() {
  const formRef = useRef<HTMLDivElement>(null);
  const membershipsRef = useRef<HTMLDivElement>(null);

  const [selectedMembership, setSelectedMembership] = useState<number | null>(
    null,
  );

  const handleSubscribe = (membershipId: number) => {
    setSelectedMembership(membershipId);
  };

  const selected = memberships.find(
    (membership) => membership.id === selectedMembership,
  );

  useEffect(() => {
    if (selected) {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selected]);

  const handleRegistrationSuccess = () => {
    setSelectedMembership(null);

    // Wait for the form to close before scrolling back.
    requestAnimationFrame(() => {
      membershipsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <main className="min-h-screen bg-black px-5 py-20 text-white sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow-500 sm:text-sm sm:tracking-[0.3em]">
            Membership Plans
          </p>

          <h1 className="mt-4 text-4xl font-black uppercase leading-[0.95] sm:text-5xl">
            Choose Your Membership
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base sm:leading-7">
            Choose the membership duration that works for you and get access to
            everything you need to train at your best.
          </p>
        </div>

        {/* Memberships */}
        <div
          ref={membershipsRef}
          className="mt-10 grid scroll-mt-24 gap-6 sm:mt-14 sm:gap-8 md:grid-cols-3"
        >
          {memberships.map((membership) => (
            <div
              key={membership.id}
              className={`relative bg-zinc-950 p-6 sm:p-8 ${
                membership.popular
                  ? "border border-yellow-500"
                  : "border border-zinc-800"
              }`}
            >
              {/* Popular / Best Value */}
              {membership.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-yellow-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black sm:-top-4 sm:px-4 sm:text-xs">
                  Best Value
                </div>
              )}

              <p
                className={`text-xs font-semibold uppercase tracking-wider sm:text-sm ${
                  membership.popular ? "text-yellow-500" : "text-gray-400"
                }`}
              >
                {membership.duration}
              </p>

              <h2 className="mt-3 text-3xl font-bold">{membership.price}</h2>

              {membership.savings ? (
                <p className="mt-2 text-sm font-semibold text-yellow-500">
                  {membership.savings}
                </p>
              ) : (
                <p className="mt-2 text-sm text-gray-500">
                  Flexible commitment
                </p>
              )}

              <div className="my-7 h-px bg-zinc-800 sm:my-8" />

              <ul className="space-y-4 text-sm text-gray-400 sm:text-base">
                <li>✓ Gym access</li>
                <li>✓ Locker access</li>
                <li>✓ Full equipment access</li>
              </ul>

              <button
                type="button"
                onClick={() => handleSubscribe(membership.id)}
                className={`mt-8 w-full px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider transition ${
                  membership.popular
                    ? "bg-yellow-500 text-black hover:bg-yellow-400"
                    : "border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                }`}
              >
                Subscribe Now
              </button>
            </div>
          ))}
        </div>

        {/* Subscription Form */}
        {selected && (
          <div
            ref={formRef}
            className="mt-20 scroll-mt-24 border-t border-zinc-800 pt-14 sm:mt-24 sm:pt-16"
          >
            <SubscriptionForm
              membership={selected}
              onSuccess={handleRegistrationSuccess}
            />
          </div>
        )}

        {/* Training Sessions */}
        <div className="mt-20 border-t border-zinc-800 pt-14 text-center sm:mt-24 sm:pt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow-500 sm:text-sm sm:tracking-[0.3em]">
            Looking For Personal Training?
          </p>

          <h2 className="mt-4 text-3xl font-black uppercase sm:text-4xl">
            Training Sessions Are Separate
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base sm:leading-7">
            You can join the gym without booking a training session. If you want
            personal coaching, group training, or a fitness consultation, you
            can book a session separately.
          </p>

          <Link
            href="/booking"
            className="mt-8 inline-block border border-yellow-500 px-7 py-3 text-sm font-semibold uppercase tracking-wider text-yellow-500 transition hover:bg-yellow-500 hover:text-black"
          >
            View Training Sessions
          </Link>
        </div>
      </div>
    </main>
  );
}
