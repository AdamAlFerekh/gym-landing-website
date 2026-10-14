import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-[700px] items-center justify-center overflow-hidden bg-zinc-950 px-5 py-16 text-center sm:min-h-[90vh] sm:px-6 sm:py-20">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/Gym_hero.jpg')",
        }}
      ></div>

      {/* Cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black"></div>

      {/* Animated corner lighting */}
      <div
        aria-hidden="true"
        className="hero-corner-glow pointer-events-none absolute inset-0"
      />

      {/* Hero content */}
      <div className="relative z-10 max-w-5xl">
        <p className="animate-hero-label mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-yellow-500 md:text-sm">
          EST. 2021 • PREMIUM FITNESS
        </p>

        <h1 className="animate-hero-title text-5xl font-black uppercase leading-[0.9] tracking-tight sm:text-6xl md:text-8xl">
          Train Hard.
          <br />
          <span className="text-yellow-500">Stay Strong.</span>
        </h1>

        <p className="animate-hero-description mx-auto mt-8 max-w-2xl text-base leading-relaxed text-gray-300 md:text-lg">
          Push your limits, build your strength, and become the strongest
          version of yourself.
        </p>

        <div className="animate-hero-buttons mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/booking"
            className="bg-yellow-500 px-9 py-4 font-bold uppercase tracking-wider text-black transition duration-300 hover:-translate-y-1 hover:bg-yellow-400 hover:shadow-lg hover:shadow-yellow-500/20"
          >
            Book a Training Session
          </Link>

          <Link
            href="/offers"
            className="border border-white/70 px-9 py-4 font-bold uppercase tracking-wider text-white transition duration-300 hover:-translate-y-1 hover:border-yellow-500 hover:text-yellow-500"
          >
            View Memberships
          </Link>
        </div>

        {/* Hero stats */}
        <div className="animate-hero-stats mx-auto mt-14 flex max-w-md items-center justify-center gap-10 border-t border-white/20 pt-7">
          <div>
            <p className="text-2xl font-bold text-white">500+</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-gray-400">
              Members
            </p>
          </div>

          <div className="h-10 w-px bg-white/20"></div>

          <div>
            <p className="text-2xl font-bold text-white">5+</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-gray-400">
              Years Experience
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
