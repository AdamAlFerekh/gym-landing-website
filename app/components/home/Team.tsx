import { teamMembers } from "@/data/team";
import { TeamMember } from "@/types/team";
import ScrollReveal from "@/app/components/ScrollReveal";

export default function Team() {
  return (
    <section className="bg-black px-5 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <ScrollReveal>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow-500 sm:text-sm sm:tracking-[0.3em]">
              Meet The Team
            </p>

            <h2 className="mt-4 text-4xl font-black uppercase leading-[0.95] sm:text-5xl md:text-6xl">
              The People Behind
              <br />
              <span className="text-yellow-500">Your Progress.</span>
            </h2>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
              Our experienced team is here to guide you, challenge you, and help
              you achieve your fitness goals.
            </p>
          </div>
        </ScrollReveal>

        {/* Team */}
        <div className="mt-12 grid gap-10 sm:mt-16 md:grid-cols-3 md:gap-8">
          {teamMembers.map((member: TeamMember, index: number) => (
            <ScrollReveal key={member.id} delay={index * 150}>
              <div className="group transition-transform duration-300 ease-out hover:-translate-y-2">
                <div className="relative h-95 overflow-hidden bg-zinc-900 sm:h-105">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition duration-500 group-hover:from-black/90" />

                  <div className="absolute bottom-5 left-5 border-l-2 border-yellow-500 pl-4 transition-all duration-300 ease-out group-hover:pl-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-500">
                      {member.role}
                    </p>
                  </div>
                </div>

                <div className="border-b border-zinc-800 py-5 transition-colors duration-500 group-hover:border-yellow-500">
                  <h3 className="text-xl font-bold uppercase sm:text-2xl">
                    {member.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">
                    {member.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
