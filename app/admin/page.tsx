import { redirect } from "next/navigation";

import { logout } from "./actions";
import { createClient } from "@/lib/supabase-server";

export const instant = false;

export default async function AdminPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  const userId = data?.claims.sub;
  const ownerUserId = process.env.OWNER_SUPABASE_USER_ID;

  if (error || !userId) {
    redirect("/admin/login");
  }

  if (!ownerUserId || userId !== ownerUserId) {
    redirect("/admin/login");
  }

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <section className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Owner area</h1>
        <form action={logout} className="mt-6">
          <button
            type="submit"
            className="rounded-md bg-gray-900 px-4 py-2 font-medium text-white transition hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            Log out
          </button>
        </form>
      </section>
    </main>
  );
}
