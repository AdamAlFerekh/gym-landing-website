export default function Contact() {
  const whatsappNumber = "70763057";
  const emailAddress = "adamalferekh@gmail.com";

  return (
    <section
      id="contact"
      className="bg-zinc-950 px-5 py-20 text-white sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-500">
          Get In Touch
        </p>

        <h2 className="mt-3 text-3xl font-bold uppercase sm:text-4xl">
          Ready to Get Started?
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
          Have questions about memberships or training? Contact us and we will
          be happy to help.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-yellow-500 px-7 py-4 text-sm font-bold uppercase tracking-wider text-black transition hover:bg-yellow-400"
          >
            WhatsApp Us
            <span aria-hidden="true">↗</span>
          </a>

          {/* <a
            href={`mailto:${emailAddress}`}
            className="inline-flex items-center justify-center gap-2 border border-zinc-700 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:border-yellow-500 hover:text-yellow-500"
          >
            Send an Email
            <span aria-hidden="true">↗</span>
          </a> */}
        </div>
      </div>
    </section>
  );
}
