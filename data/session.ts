import { Session } from "@/types/booking";

export const sessions: Session[] = [
  {
    id: 1,
    name: "Personal Training",
    description:
      "One-on-one training designed around your personal goals and fitness level.",
    image: "/personal_trainer.jpg",
    duration: "60 minutes",
    price: "$25",
    features: [
      "Personalized workout",
      "One-on-one coaching",
      "Progress tracking",
    ],
  },
  {
    id: 2,
    name: "Group Training",
    description:
      "Train together, stay motivated, and push yourself in a group environment.",
    image: "/group_training.jpg",
    duration: "60 minutes",
    price: "$15",
    features: [
      "Small group training",
      "Professional coach",
      "Motivating environment",
    ],
  },
  {
    id: 3,
    name: "Consultation",
    description:
      "Discuss your goals and create a training approach that works for you.",
    image: "/consultation.jpg",
    duration: "30 minutes",
    price: "$10",
    features: [
      "Fitness assessment",
      "Goal discussion",
      "Training recommendations",
    ],
  },
];
