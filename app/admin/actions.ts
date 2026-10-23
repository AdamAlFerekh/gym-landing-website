"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase-server";

export async function logout() {
  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.signOut({ scope: "local" });

    if (error) {
      console.error("Supabase sign-out failed:", error.message);
    }
  } catch (error) {
    console.error("Unexpected sign-out failure:", error);
  }

  redirect("/admin/login");
}
