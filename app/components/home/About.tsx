import ScrollReveal from "@/app/components/ScrollReveal";

export default function About() {
  return (
    <section className="bg-zinc-950 px-5 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          {/* Image */}
          <ScrollReveal>
            <div className="relative h-[380px] overflow-hidden sm:h-[500px]">
              <img
                src="/gym_interior.jpg"
                alt="Gym interior"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 border-l-2 border-yellow-500 pl-4 sm:bottom-6 sm:left-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-500 sm:text-sm sm:tracking-[0.3em]">
                  Built For Strength
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Text */}
          <ScrollReveal delay={150}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow-500 sm:text-sm sm:tracking-[0.3em]">
                About the Gym
              </p>

              <h2 className="mt-4 text-4xl font-black uppercase leading-[0.95] sm:text-5xl md:text-6xl">
                More Than
                <br />
                <span className="text-yellow-500">Just A Gym.</span>
              </h2>

              <p className="mt-7 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
                We believe that strength is built through discipline,
                consistency, and the right environment. Our gym is designed to
                help you train with purpose and become a stronger version of
                yourself.
              </p>

              <p className="mt-5 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
                Whether you are just starting your fitness journey or looking to
                take your performance to the next level, our team is here to
                help you reach your goals.
              </p>

              <div className="mt-8 h-px w-16 bg-yellow-500" />
            </div>
          </ScrollReveal>
        </div>

        {/* Stats */}
        <ScrollReveal delay={100} className="mt-16 md:mt-20">
          <div className="mt-16 grid grid-cols-2 border-y border-zinc-800 md:mt-20 md:grid-cols-4">
            <div className="border-b border-zinc-800 px-4 py-7 md:border-b-0 md:border-r md:px-6 md:py-8">
              <p className="text-3xl font-bold text-yellow-500 sm:text-4xl">
                5+
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-gray-500 sm:text-xs sm:tracking-[0.2em]">
                Years Experience
              </p>
            </div>

            <div className="border-b border-zinc-800 px-4 py-7 md:border-b-0 md:border-r md:px-6 md:py-8">
              <p className="text-3xl font-bold text-yellow-500 sm:text-4xl">
                500+
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-gray-500 sm:text-xs sm:tracking-[0.2em]">
                Members
              </p>
            </div>

            <div className="px-4 py-7 md:border-r md:px-6 md:py-8">
              <p className="text-3xl font-bold text-yellow-500 sm:text-4xl">
                10+
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-gray-500 sm:text-xs sm:tracking-[0.2em]">
                Trainers
              </p>
            </div>

            <div className="px-4 py-7 md:px-6 md:py-8">
              <p className="text-3xl font-bold text-yellow-500 sm:text-4xl">
                24/7
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-gray-500 sm:text-xs sm:tracking-[0.2em]">
                Access
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
