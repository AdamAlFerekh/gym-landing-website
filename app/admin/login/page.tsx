import LoginForm from "./login-form";

export default function AdminLoginPage() {
  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden bg-zinc-950 px-5 py-16 text-white sm:px-6 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-yellow-500/10 blur-3xl"
      />

      <section className="relative w-full max-w-md border border-yellow-500/30 bg-zinc-950/95 p-6 shadow-[0_0_80px_rgba(234,179,8,0.12)] backdrop-blur-sm sm:p-8">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center bg-yellow-500 text-base font-black text-black">
            G
          </span>
          <span className="text-lg font-black uppercase tracking-[0.2em] text-white">
            Gym
          </span>
        </div>

        <div className="mt-10 border-b border-zinc-800 pb-7">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-500">
            Owner access
          </p>
          <h1 className="mt-3 text-4xl font-black uppercase leading-[0.9] tracking-tight text-white sm:text-5xl">
            Owner login
          </h1>
          <p className="mt-4 text-sm leading-6 text-gray-400 sm:text-base">
            Sign in to access the gym owner area.
          </p>
        </div>

        <LoginForm />
      </section>
    </main>
  );
}
