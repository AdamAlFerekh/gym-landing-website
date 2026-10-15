"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  function goToSlide(index: number) {
    setActiveIndex((index + testimonials.length) % testimonials.length);
  }

  useEffect(() => {
    if (testimonials.length < 2) return;

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    setTouchStart(event.touches[0].clientX);
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    if (touchStart === null) return;

    const difference = touchStart - event.changedTouches[0].clientX;

    if (Math.abs(difference) > 50) {
      goToSlide(activeIndex + (difference > 0 ? 1 : -1));
    }

    setTouchStart(null);
  }

  if (testimonials.length === 0) return null;

  return (
    <section className="overflow-x-clip bg-black px-5 py-20 text-white sm:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow-500 sm:text-sm">
            Member Experiences
          </p>

          <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight sm:text-4xl md:text-5xl">
            More Than Just a Gym
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
            Real experiences from the people who train here.
          </p>
        </div>

        <div
          className="relative isolate mx-auto h-[440px] w-full max-w-7xl sm:h-[410px] md:h-[430px]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          aria-label="Member testimonials carousel"
        >
          {testimonials.map((testimonial, index) => {
            const total = testimonials.length;
            const rawOffset = (index - activeIndex + total) % total;

            const offset =
              rawOffset > Math.floor(total / 2) ? rawOffset - total : rawOffset;

            const isVisible = Math.abs(offset) <= 1;
            const isActive = index === activeIndex;

            return (
              <article
                key={`${testimonial.fullName}-${index}`}
                aria-hidden={!isActive}
                className={`absolute left-1/2 top-1/2 flex h-[400px] w-[78%] max-w-[440px] flex-col overflow-hidden border transition-[transform,opacity,filter] duration-700 ease-in-out sm:h-[370px] sm:w-[48%] sm:flex-row md:w-[42%] lg:w-[34%] ${
                  isActive
                    ? "border-yellow-500/60 bg-zinc-900 shadow-[0_0_35px_rgba(234,179,8,0.12)]"
                    : "border-white/10 bg-zinc-950"
                }`}
                style={{
                  transform: `translate(calc(-50% + ${offset * 100}%), -50%) scale(${isActive ? 1 : 0.86})`,
                  opacity: isVisible ? (isActive ? 1 : 0.42) : 0,
                  filter: isActive ? "none" : "brightness(0.55)",
                  zIndex: isActive ? 10 : 5,
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                {/* Member photo: top on mobile, left on desktop */}
                <div className="relative h-36 w-full shrink-0 overflow-hidden sm:h-full sm:w-[40%]">
                  <Image
                    src={testimonial.image}
                    alt={`Photo of ${testimonial.fullName}`}
                    fill
                    sizes="(max-width: 639px) 84vw, 145px"
                    className="object-cover object-[50%_20%] sm:object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/70 to-transparent sm:bg-gradient-to-r" />
                </div>

                {/* Testimonial details */}
                <div className="flex min-w-0 flex-1 flex-col px-5 pb-5 pt-4 sm:px-4 sm:py-5 md:px-5">
                  <div className="flex min-h-7 flex-nowrap items-center gap-1">
                    <span className="shrink-0 whitespace-nowrap text-base font-bold leading-none text-yellow-500">
                      {testimonial.rating.toFixed(1)}
                    </span>

                    <div className="flex shrink-0 items-center whitespace-nowrap">
                      <Rating
                        initialValue={testimonial.rating}
                        readonly
                        allowFraction
                        size={15}
                        fillColor="#EAB308"
                        emptyColor="#4B5563"
                        SVGstyle={{
                          display: "inline-block",
                          verticalAlign: "middle",
                        }}
                      />
                    </div>

                    <span className="shrink-0 whitespace-nowrap text-xs text-gray-500">
                      / 5
                    </span>
                  </div>

                  <blockquote className="mt-4 line-clamp-4 text-sm leading-7 text-gray-300">
                    “{testimonial.description}”
                  </blockquote>

                  <div className="mt-auto border-t border-white/10 pt-4">
                    <h3 className="text-sm font-semibold text-white">
                      {testimonial.fullName}
                    </h3>

                    <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-gray-500">
                      {testimonial.yearsAtGym}{" "}
                      {testimonial.yearsAtGym === 1 ? "year" : "years"} at the
                      gym
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {testimonials.length > 1 && (
          <div className="mt-5 flex justify-center gap-2">
            {testimonials.map((testimonial, index) => (
              <button
                key={`${testimonial.fullName}-dot-${index}`}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Show testimonial ${index + 1}`}
                aria-current={activeIndex === index ? "true" : undefined}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "w-8 bg-yellow-500"
                    : "w-2 bg-white/25 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
