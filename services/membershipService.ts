type MembershipRegistration = {
  fullName: string;
  phone: string;
  email: string;
  membershipId: number;
};

export async function submitMembershipRegistration(
  registration: MembershipRegistration,
): Promise<void> {
  const response = await fetch("/api/membership-registrations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registration),
  });

  const data: { error?: string } = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error ?? "Could not save your registration. Please try again.",
    );
  }
}
