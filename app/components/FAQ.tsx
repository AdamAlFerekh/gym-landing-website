"use client";

import { questions } from "@/data/faq_questions";
import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-black px-5 py-20 text-white sm:px-6 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.25em] text-yellow-500">
          Got Questions?
        </p>

        <h2 className="mt-3 text-center text-3xl font-bold uppercase sm:text-4xl">
          Frequently Asked Questions
        </h2>

        <div className="mt-12 space-y-3">
          {questions.map((item, index) => (
            <div key={item.question} className="border border-zinc-800">
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:text-yellow-500"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold">{item.question}</span>

                <span className="text-xl text-yellow-500">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div className="border-t border-zinc-800 px-5 py-4 text-sm leading-7 text-gray-400">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
