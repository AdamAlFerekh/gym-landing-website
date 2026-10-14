import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black text-white">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-10 md:grid-cols-3 md:gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center bg-yellow-500 text-sm font-black text-black">
                G
              </span>

              <span className="text-xl font-black uppercase tracking-[0.2em]">
                Gym
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-gray-500">
              Train hard, stay consistent, and become the strongest version of
              yourself.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow-500">
              Quick Links
            </p>

            <div className="mt-5 flex flex-col gap-3 text-sm">
              <Link
                href="/"
                className="w-fit text-gray-400 transition hover:text-white"
              >
                Home
              </Link>

              <Link
                href="/offers"
                className="w-fit text-gray-400 transition hover:text-white"
              >
                Memberships
              </Link>

              <Link
                href="/booking"
                className="w-fit text-gray-400 transition hover:text-white"
              >
                Training
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow-500">
              Contact
            </p>

            <div className="mt-5 space-y-3 text-sm text-gray-400">
              <p>Beirut, Lebanon</p>
              <p>+961 70 763 057</p>
              <p>gymbro's@gym.com</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-4 border-t border-zinc-800 pt-6 text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 GYM. All rights reserved.</p>

          <p className="uppercase tracking-[0.2em]">Built for strength.</p>
        </div>
      </div>
    </footer>
  );
}
