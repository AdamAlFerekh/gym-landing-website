import { Membership } from "@/types/membership";

export const memberships: Membership[] = [
  {
    id: 1,
    duration: "1 Month",
    price: "$60",
  },
  {
    id: 2,
    duration: "3 Months",
    price: "$165",
    savings: "Save $15",
  },
  {
    id: 3,
    duration: "5 Months",
    price: "$250",
    savings: "Save $50",
    popular: true,
  },
];
