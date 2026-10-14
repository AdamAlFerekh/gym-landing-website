"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/90 px-4 py-4 backdrop-blur-md sm:px-6 sm:py-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2 sm:gap-3">
          <span className="flex h-8 w-8 items-center justify-center bg-yellow-500 text-sm font-black text-black transition group-hover:bg-yellow-400 sm:h-9 sm:w-9">
            G
          </span>

          <span className="text-lg font-black uppercase tracking-[0.15em] text-white sm:text-xl sm:tracking-[0.2em]">
            Gym
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-3 sm:gap-6 md:gap-8">
          {/* Home */}
          <Link
            href="/"
            className={`group relative text-xs font-medium uppercase tracking-wider transition sm:text-sm ${
              pathname === "/"
                ? "text-yellow-500"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Home

            <span
              className={`absolute -bottom-2 left-0 h-px bg-yellow-500 transition-all duration-300 ${
                pathname === "/" ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </Link>

          {/* Memberships */}
          <Link
            href="/offers"
            className={`group relative text-xs font-medium uppercase tracking-wider transition sm:text-sm ${
              pathname === "/offers"
                ? "text-yellow-500"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Memberships

            <span
              className={`absolute -bottom-2 left-0 h-px bg-yellow-500 transition-all duration-300 ${
                pathname === "/offers"
                  ? "w-full"
                  : "w-0 group-hover:w-full"
              }`}
            />
          </Link>

          {/* Join / Training */}
          <Link
            href="/booking"
            className={`px-3 py-2 text-[10px] font-bold uppercase tracking-wider transition duration-300 sm:px-5 sm:py-3 sm:text-xs md:px-6 md:text-sm ${
              pathname === "/booking"
                ? "bg-yellow-400 text-black"
                : "bg-yellow-500 text-black hover:bg-yellow-400"
            }`}
          >
            <span className="sm:hidden">Train</span>
            <span className="hidden sm:inline">Training</span>
          </Link>

          {/* Join Now */}
          {/* <Link
            href="/offers"
            className="hidden border border-yellow-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-yellow-500 transition hover:bg-yellow-500 hover:text-black md:block md:px-5 md:py-3"
          >
            Join Now
          </Link> */}
        </div>
      </div>
    </nav>
  );
}
