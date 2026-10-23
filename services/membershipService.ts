type MembershipRegistration = {
  fullName: string;
  phone: string;
  email: string;
  membershipId: number;
};

export async function submitMembershipRegistration(
  registration: MembershipRegistration,
): Promise<void> {
  let response: Response;
  try {
    response = await fetch("/api/membership-registrations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registration),
    });
  } catch {
    throw new Error(
      "Connection failed. Please check your internet connection and try again.",
    );
  }

  let data: { error?: unknown };

  try {
    data = (await response.json()) as { error?: unknown };
  } catch {
    throw new Error(
      "Could not process the registration response. Please try again.",
    );
  }

  if (!response.ok) {
    const errorMessage =
      typeof data.error === "string" && data.error.trim().length > 0
        ? data.error
        : "Could not save your registration. Please try again.";

    throw new Error(errorMessage);
  }
}
