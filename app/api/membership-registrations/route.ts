import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { memberships } from "@/data/memberships";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

export async function POST(request: Request) {
  if (!supabaseUrl || !supabaseSecretKey) {
    console.error("Supabase server configuration is missing.");

    return NextResponse.json(
      { error: "Registration service is unavailable." },
      { status: 500 },
    );
  }

  try {
    const body = await request.json();

    const { fullName, phone, email, membershipId } = body;

    if (
      typeof fullName !== "string" ||
      fullName.trim().length < 3 ||
      fullName.trim().length > 100 ||
      typeof phone !== "string" ||
      phone.length > 30 ||
      typeof email !== "string" ||
      email.length > 254 ||
      typeof membershipId !== "number"
    ) {
      return NextResponse.json(
        { error: "Please provide valid registration details." },
        { status: 400 },
      );
    }

    const normalizedPhone = phone.replace(/[\s()-]/g, "");
    const phoneNumber = normalizedPhone.startsWith("00961")
      ? "+961" + normalizedPhone.slice(5)
      : normalizedPhone;

    const isValidPhone =
      /^(?:03\d{6}|(?:70|71|76|78|79|81)\d{6}|\+961(?:3\d{6}|(?:70|71|76|78|79|81)\d{6}))$/.test(
        phoneNumber,
      );

    const normalizedEmail = email.trim().toLowerCase();

    if (!isValidPhone || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid phone number and email." },
        { status: 400 },
      );
    }

    const membership = memberships.find((item) => item.id === membershipId);

    if (!membership) {
      return NextResponse.json(
        { error: "Please select a valid membership." },
        { status: 400 },
      );
    }

    const supabase = createClient(supabaseUrl, supabaseSecretKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const { error } = await supabase.from("membership_registrations").insert({
      full_name: fullName.trim(),
      phone: phoneNumber,
      email: normalizedEmail,
      membership_duration: membership.duration,
      membership_price: membership.price,
    });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          {
            error:
              "This phone number is already registered. Please contact the gym for assistance.",
          },
          { status: 409 },
        );
      }

      console.error("Membership registration insert failed:", error.message);

      return NextResponse.json(
        { error: "Could not save your registration. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Registration saved successfully." },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid request. Please try again." },
      { status: 400 },
    );
  }
}
