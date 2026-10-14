import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-yellow-500 px-5 py-20 text-black sm:px-6 sm:py-28">
      {/* Decorative background text */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[5rem] font-black uppercase leading-none text-yellow-400/40 sm:text-[8rem] md:-bottom-8 md:text-[12rem]">
        STRONG
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] sm:text-sm sm:tracking-[0.4em]">
          Your Next Level Starts Here
        </p>

        <h2 className="mt-5 text-4xl font-black uppercase leading-[0.9] tracking-tight sm:text-5xl md:text-7xl">
          Ready To
          <br />
          Get Stronger?
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-sm leading-6 text-black/70 sm:mt-7 sm:text-lg sm:leading-7">
          Stop waiting for tomorrow. Start building the strongest version of
          yourself today.
        </p>

        <Link
          href="/booking"
          className="mt-8 inline-block bg-black px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition duration-300 hover:bg-zinc-900 sm:mt-10 sm:px-10"
        >
          Book A Training Session
        </Link>
      </div>
    </section>
  );
}
