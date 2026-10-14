"use client";

import { useState } from "react";
import { sessions } from "@/data/session";

export default function Booking() {
  const [selectedSession, setSelectedSession] = useState<number | null>(null);

  const selected = sessions.find((session) => session.id === selectedSession);

  return (
    <main className="min-h-screen bg-black px-5 py-20 text-white sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow-500 sm:text-sm sm:tracking-[0.3em]">
            Training Sessions
          </p>

          <h1 className="mt-4 text-4xl font-black uppercase leading-[0.95] sm:text-5xl">
            Choose Your Training
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base sm:leading-7">
            Choose the training session that fits your goals.
          </p>
        </div>

        {/* Session Cards */}
        <div className="mt-10 grid gap-5 sm:mt-14 sm:gap-6 md:grid-cols-3">
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => setSelectedSession(session.id)}
              className="group relative h-72 overflow-hidden border border-zinc-800 text-left transition duration-500 hover:border-yellow-500 sm:h-80"
            >
              <img
                src={session.image}
                alt={session.name}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/20" />

              <div className="absolute bottom-0 left-0 p-5 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-500">
                  Training
                </p>

                <h2 className="mt-2 text-xl font-bold uppercase sm:text-2xl">
                  {session.name}
                </h2>

                <p className="mt-2 text-xs uppercase tracking-wider text-gray-300 sm:mt-3 sm:text-sm">
                  View Session →
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-6">
          {/* Overlay */}
          <button
            aria-label="Close details"
            onClick={() => setSelectedSession(null)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="relative z-10 my-4 max-h-[95vh] w-full max-w-5xl overflow-y-auto border border-yellow-500/40 bg-zinc-950 shadow-[0_0_80px_rgba(234,179,8,0.12)] animate-[sessionOpen_0.45s_ease-out]">
            {/* Close */}
            <button
              onClick={() => setSelectedSession(null)}
              aria-label="Close session details"
              className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/80 text-2xl leading-none text-white backdrop-blur-sm transition hover:border-yellow-500 hover:text-yellow-500 sm:right-5 sm:top-5"
            >
              ×
            </button>

            <div className="grid md:grid-cols-2">
              {/* Image */}
              <div className="relative h-64 sm:h-80 md:h-[550px]">
                <img
                  src={selected.image}
                  alt={selected.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute bottom-6 left-6 pr-12 sm:bottom-8 sm:left-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow-500 sm:text-sm sm:tracking-[0.3em]">
                    Training Session
                  </p>

                  <h2 className="mt-2 text-3xl font-black uppercase leading-none sm:mt-3 sm:text-4xl md:text-5xl">
                    {selected.name}
                  </h2>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 sm:p-8 md:flex md:flex-col md:justify-center md:p-12">
                <p className="text-sm leading-6 text-gray-400 sm:text-base sm:leading-7">
                  {selected.description}
                </p>

                <div className="mt-6 grid grid-cols-2 border-y border-zinc-800 py-5 sm:mt-8 sm:py-6">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500">
                      Duration
                    </p>

                    <p className="mt-2 text-base font-semibold sm:text-lg">
                      {selected.duration}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500">
                      Price
                    </p>

                    <p className="mt-2 text-xl font-bold text-yellow-500 sm:text-2xl">
                      {selected.price}
                    </p>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8">
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    What's Included
                  </p>

                  <ul className="mt-4 space-y-3 sm:mt-5 sm:space-y-4">
                    {selected.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center text-sm text-gray-300 sm:text-base"
                      >
                        <span className="mr-3 text-yellow-500">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="mt-8 w-full bg-yellow-500 px-6 py-4 text-sm font-bold uppercase tracking-wider text-black transition hover:bg-yellow-400 sm:mt-10">
                  Select Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
