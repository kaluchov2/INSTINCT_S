import { Experience, FAQItem, ContactInfo } from "@/types";

export const EXPERIENCES: Experience[] = [
  {
    id: "elite-mountain",
    title: "Elite Mountain",
    description:
      "Push your limits at high altitude with breathtaking views. Experience intense training sessions in the mountains where nature challenges your physical and mental strength.",
    imageSrc: "https://res.cloudinary.com/drg5lhdiw/image/upload/v1749594388/cld-sample-2.jpg",
    imageAlt: "Mountain bootcamp training at high altitude",
    features: ["High-altitude training", "Mountain hiking", "Strength conditioning"],
  },
  {
    id: "los-cabos",
    title: "ka'an Los Cabos Bootcamp",
    description:
      "Train on pristine beaches with the power of the ocean as your backdrop. Combine beach workouts with ocean activities for a complete athletic experience.",
    imageSrc: "https://res.cloudinary.com/drg5lhdiw/image/upload/v1749594388/cld-sample-2.jpg",
    imageAlt: "Beach bootcamp training in Los Cabos",
    features: ["Beach training", "Ocean activities", "Sunset sessions"],
  },
  {
    id: "hyrox-training",
    title: "Specific Hyrox Training",
    description:
      "Prepare for competition with targeted Hyrox training in natural settings. Build endurance, strength, and technique needed to excel in competitive fitness.",
    imageSrc: "https://res.cloudinary.com/drg5lhdiw/image/upload/v1749594388/cld-sample-2.jpg",
    imageAlt: "Hyrox competition preparation training",
    features: ["Competition prep", "Interval training", "Performance tracking"],
  },
  {
    id: "running-era",
    title: "Running Era Experience",
    description:
      "Discover the joy of trail running through stunning natural landscapes. From beginner-friendly paths to challenging terrain, awaken your running instincts.",
    imageSrc: "https://res.cloudinary.com/drg5lhdiw/image/upload/v1749594388/cld-sample-2.jpg",
    imageAlt: "Trail running experience in nature",
    features: ["Trail running", "Endurance building", "Scenic routes"],
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What fitness level do I need?",
    answer:
      "Our bootcamps are designed for all fitness levels. We provide modifications and progressions so everyone from beginners to elite athletes can participate and be challenged appropriately.",
  },
  {
    question: "What should I bring to a bootcamp?",
    answer:
      "Bring comfortable athletic clothing, proper footwear for outdoor activities, water bottle, sunscreen, and a positive attitude. Specific gear lists will be provided upon registration for each bootcamp.",
  },
  {
    question: "How long are the bootcamps?",
    answer:
      "Bootcamp durations vary from intensive weekend experiences to week-long immersive programs. Check individual bootcamp details for specific schedules and duration options.",
  },
  {
    question: "Are meals included?",
    answer:
      "Yes! All our bootcamps include nutritious, athlete-focused meals designed to fuel your training. We accommodate dietary restrictions and preferences with advance notice.",
  },
  {
    question: "What makes ka'an different from traditional gyms?",
    answer:
      "We believe in training where nature intended. Our bootcamps take you outside the four walls of a gym to mountains, beaches, and beautiful natural environments where you'll awaken primal instincts and connect with your surroundings.",
  },
  {
    question: "Can I book a private or group session?",
    answer:
      "Absolutely! We offer private sessions for individuals and custom group bookings for teams, corporations, or friend groups. Contact us to discuss your specific needs and preferences.",
  },
];

export const CONTACT_INFO: ContactInfo = {
  email: "info@kaan.com",
  phone: "+1 (555) 123-4567",
  location: "Multiple locations across mountains and beaches",
  socialLinks: [
    {
      platform: "Instagram",
      url: "https://instagram.com/kaan",
      icon: "instagram",
    },
    {
      platform: "Facebook",
      url: "https://facebook.com/kaan",
      icon: "facebook",
    },
    {
      platform: "Twitter",
      url: "https://twitter.com/kaan",
      icon: "twitter",
    },
  ],
};

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#who-are-we" },
  { label: "Experiences", href: "#experiences" },
  { label: "Book Now", href: "#calendar" },
  { label: "FAQ", href: "#faq" },
];
