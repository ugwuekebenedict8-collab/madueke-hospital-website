import {
  Activity,
  Baby,
  Building2,
  ClipboardList,
  FlaskConical,
  Microscope,
  Scan,
  Scissors,
  ShieldCheck,
  Stethoscope,
  Syringe,
  Sparkles,
  Users,
  Clock,
  HandHeart,
  CalendarCheck,
  Layers,
  type LucideIcon,
} from "lucide-react";

/**
 * All hospital content below is PLACEHOLDER data.
 * Replace with real hospital information before going live.
 */

export const HOSPITAL = {
  name: "Madueke Memorial Hospital and Maternity",
  shortName: "Madueke Memorial Hospital",
  tagline: "Compassionate Care. Better Health.",
  description:
    "A modern hospital focused on compassionate, patient-centered care delivered by experienced healthcare professionals.",
  address: "No. 13 SunnyDan Street, Onitsha, Anambra State",
  phone: "09066571186",
  emergencyPhone: "09066571186",
  ambulance: "Ambulance number to be confirmed",
  email: "maduekememorialhospital.com",
  hours: [
    { label: "Outpatient Clinics", value: "Monday – Friday, 8:00 – 18:00" },
    { label: "Weekend Clinics", value: "Saturday, 9:00 – 14:00" },
    { label: "Emergency Department", value: "Open 24 hours, every day" },
    { label: "Visiting Hours", value: "11:00 – 13:00 and 16:00 – 19:00" },
  ],
};

export type NavItem = { label: string; to: string };

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Care Directory", to: "/services" },
  { label: "Our Team", to: "/doctors" },
  { label: "Careers", to: "/careers" },
  { label: "Patients", to: "/patients" },
  { label: "Resources", to: "/resources" },
  { label: "Contact", to: "/contact" },
];

export type Service = {
  slug: string;
  name: string;
  short: string;
  category: string;
  department: string;
  icon: LucideIcon;
  overview: string;
  conditions: string[];
  treatments: string[];
  facilities: string[];
  faqs: { q: string; a: string }[];
};

const genericFaqs = (name: string) => [
  {
    q: `Do I need a referral for ${name}?`,
    a: "Referral requirements vary. Please contact our appointments desk to confirm what is needed for your visit.",
  },
  {
    q: "How long does a first consultation take?",
    a: "First consultations typically allow enough time for a full discussion of your history, examination and next steps.",
  },
  {
    q: "What should I bring to my appointment?",
    a: "Bring a valid ID, any previous medical records or imaging, a list of current medications, and your insurance details if applicable.",
  },
];

const makeService = (
  slug: string,
  name: string,
  short: string,
  category: string,
  department: string,
  icon: LucideIcon,
  conditions: string[],
  treatments: string[],
): Service => ({
  slug,
  name,
  short,
  category,
  department,
  icon,
  overview: ` Our ${name.toLowerCase()} team provides assessment, diagnosis and ongoing care in a calm, modern environment. Care plans are discussed with you in plain language so you understand each step. This content is a placeholder and should be reviewed by a qualified clinician before publication.`,
  conditions,
  treatments,
  facilities: [
    "Modern consultation rooms",
    "On-site diagnostic support",
    "Accessible facilities for patients with reduced mobility",
    "Comfortable family waiting areas",
  ],
  faqs: genericFaqs(name),
});

export const SERVICES: Service[] = [
  makeService(
    "general-medicine",
    "General Medicine",
    "Everyday medical care, health checks and long-term condition management.",
    "Primary Care",
    "Internal Medicine",
    Stethoscope,
    ["General illness", "High blood pressure", "Diabetes review", "Routine health checks"],
    ["Consultation and assessment", "Medication review", "Referral to specialists", "Follow-up care"],
  ),
  makeService(
    "pediatrics",
    "Pediatrics",
    "Gentle, attentive care for infants, children and adolescents.",
    "Family Care",
    "Pediatrics",
    Baby,
    ["Childhood illness", "Growth and development", "Immunisation review", "Childhood asthma"],
    ["Child consultation", "Developmental checks", "Vaccination services", "Parent guidance"],
  ),
  makeService(
    "obstetrics-gynecology",
    "Obstetrics & Gynecology",
    "Care for women through pregnancy and across every stage of life.",
    "Family Care",
    "Obstetrics & Gynecology",
    HandHeart,
    ["Pregnancy care", "Menstrual concerns", "Fertility questions", "Menopause support"],
    ["Antenatal care", "Ultrasound scanning", "Gynecological consultation", "Postnatal follow-up"],
  ),
  makeService(
    "general-surgery",
    "General Surgery",
    "Surgical assessment and planned procedures in modern theatres.",
    "Surgical Care",
    "Surgery",
    Scissors,
    ["Hernia", "Gallbladder conditions", "Abdominal pain", "Minor lumps"],
    ["Surgical consultation", "Day-case procedures", "Pre-operative assessment", "Post-operative care"],
  ),
  makeService(
    "radiology-imaging",
    "Radiology & Imaging",
    "Diagnostic imaging supported by modern equipment.",
    "Diagnostics",
    "Radiology",
    Scan,
    ["Injury assessment", "Abdominal imaging", "Chest imaging", "Pregnancy scans"],
    ["X-ray", "Ultrasound", "CT referral", "Reporting by radiologists"],
  ),
  makeService(
    "laboratory-diagnostics",
    "Laboratory Diagnostics",
    "Accurate laboratory testing with clear, timely results.",
    "Diagnostics",
    "Laboratory",
    FlaskConical,
    ["Blood tests", "Infection screening", "Routine panels", "Monitoring tests"],
    ["Sample collection", "Laboratory analysis", "Result reporting", "Clinician review"],
  ),
  makeService(
    "emergency-medicine",
    "Emergency Medicine",
    "Around-the-clock assessment and treatment of urgent conditions.",
    "Urgent Care",
    "Emergency Medicine",
    Activity,
    ["Severe pain", "Breathing difficulty", "Injuries", "Sudden illness"],
    ["Triage and assessment", "Emergency treatment", "Observation", "Admission coordination"],
  ),
  makeService(
    "preventive-healthcare",
    "Preventive Healthcare",
    "Screening, vaccination and health checks to help you stay well.",
    "Primary Care",
    "Internal Medicine",
    ShieldCheck,
    ["Routine screening", "Lifestyle risk", "Vaccination review", "Workplace health checks"],
    ["Health check packages", "Vaccination services", "Screening tests", "Lifestyle advice"],
  ),
];

export const SERVICE_CATEGORIES = [
  "All",
  "Primary Care",
  "Family Care",
  "Surgical Care",
  "Diagnostics",
  "Urgent Care",
];

export type Department = {
  slug: string;
  name: string;
  short: string;
  icon: LucideIcon;
  services: string[];
  overview: string;
  facilities: string[];
  hours: string;
  contact: string;
};

const makeDept = (
  slug: string,
  name: string,
  short: string,
  icon: LucideIcon,
  services: string[],
): Department => ({
  slug,
  name,
  short,
  icon,
  services,
  overview: ` The ${name} department brings together experienced clinicians, nursing staff and support teams in one place. Our focus is clear communication, comfort and continuity of care. Replace this text with the department's own description.`,
  facilities: [
    "Dedicated consultation rooms",
    "Modern clinical equipment",
    "On-site diagnostic access",
    "Quiet family waiting area",
  ],
  hours: "[Mon – Fri, 8:00 – 18:00 · Sat, 9:00 – 14:00]",
  contact: "Contact the main hospital line",
});

export const DEPARTMENTS: Department[] = [
  makeDept("internal-medicine", "Internal Medicine", "Comprehensive adult medical care and long-term condition management.", Stethoscope, ["General Medicine", "Preventive Healthcare", "Health checks"]),
  makeDept("pediatrics", "Pediatrics", "Child-friendly care from newborns to adolescents.", Baby, ["Pediatrics", "Immunisation", "Growth checks"]),
  makeDept("obstetrics-gynecology", "Obstetrics & Gynecology", "Pregnancy, women's health and gynecological care.", HandHeart, ["Antenatal care", "Gynecology", "Ultrasound"]),
  makeDept("surgery", "Surgery", "Planned and day-case surgical procedures.", Scissors, ["General Surgery", "Pre-op assessment", "Day surgery"]),
  makeDept("radiology", "Radiology", "Diagnostic imaging and reporting.", Scan, ["X-ray", "Ultrasound", "CT coordination"]),
  makeDept("laboratory", "Laboratory", "Clinical laboratory testing and diagnostics.", Microscope, ["Blood tests", "Screening", "Monitoring"]),
  makeDept("emergency-medicine", "Emergency Medicine", "24/7 assessment and treatment of urgent conditions.", Activity, ["Triage", "Emergency treatment", "Observation"]),
];

export type TeamMember = {
  slug: string;
  name: string;
  image?: string;
  specialty: string;
  department: string;
  age?: string;
  qualification?: string;
  experience?: string;
  languages?: string[];
  availability: string;
  bio: string;
  expertise: string[];
  consultation?: string;
  phone?: string;
  bookable?: boolean;
};

export const TEAM: TeamMember[] = [
  {
    slug: "dr-moses-ugwueke",
    name: "Dr. Moses Ugwueke",
    image: "/daddy.JPG",
    specialty: "Medical Director & Family Doctor",
    department: "Family Medicine",
    age: "63 years",
    qualification: "MBBS, FWACP",
    experience: "30+ years",
    languages: ["English", "Igbo"],
    availability: "Monday to Friday",
    bio: "Dr. Moses Ugwueke is an experienced family doctor with over three decades of dedication to patient care. At 63 years old, he brings extensive clinical experience and a commitment to caring for individuals and families.\n\nAs the founder and medical director of his private hospital, Dr. Moses Ugwueke is dedicated to providing quality, personalized healthcare in a safe and welcoming environment. His approach combines professional expertise with genuine care for every patient.\n\nBeyond medicine, he is a proud father of six children and values family, integrity, and service to his community.",
    expertise: ["Family medicine", "Preventive care", "Care for all ages"],
    consultation: "Contact the appointments team for current clinic times.",
    phone: "09066571186",
    bookable: true,
  },
  {
    slug: "nurse-ineh-modesta",
    name: "Nurse Ineh Modesto",
    image: "/modesta.jpeg",
    specialty: "Matron and Head of Nurses",
    department: "Nursing",
    age: "63 years",
    experience: "25 years",
    availability: "Monday to Saturday, 10:00 AM to 4:00 PM",
    bio: "Ineh Modesta is a dedicated and experienced matron with 25 years of experience in gynecology and women's healthcare. At 63, she brings extensive knowledge and compassionate care to her patients, supporting women's health and well-being. She is available Monday to Saturday, from 10:00 AM to 4:00 PM.",
    expertise: ["Gynecology", "Women's healthcare", "Nursing leadership"],
    consultation: "Monday to Saturday, 10:00 AM to 4:00 PM.",
    bookable: true,
  },
  {
    slug: "nurse-ike-ifeatu",
    name: "Nurse Ike Ifeatu",
    image: "/ifeatu.jpeg",
    specialty: "Nurse and Monitoring & Evaluation Officer",
    department: "Monitoring and Evaluation",
    age: "50 years",
    qualification: "S/N",
    availability: "During assigned duty hours and for emergencies",
    bio: "Name: Ike Ifeatu A.\nAge: 50 years\nRole/Designation: Nurse\nSpecialization/Department: Monitoring and Evaluation (M&E) Officer; Routine Immunization (R.I.) Officer\nQualification: S/N\nAvailability: During assigned duty hours and for emergencies\nContact: 09066571186",
    expertise: ["Monitoring and Evaluation", "Routine Immunization"],
    phone: "09066571186",
    bookable: true,
  },
  {
    slug: "eze-nneka",
    name: "Eze Nneka",
    image: "/eze.png",
    specialty: "Accountant",
    department: "Accounting",
    age: "40 years",
    experience: "19 years",
    availability: "Monday to Saturday, 8:00 AM to 3:00 PM",
    bio: "Name: Eze Nneka\nAge: 40 years\nRole/Designation: Accountant\nSpecialization: Accounting\nYears of Experience: 19 years\nAvailability: Monday – Saturday, 8:00 AM – 3:00 PM",
    expertise: ["Accounting"],
  },
  {
    slug: "anakwe-ogo-chukwu-theodora",
    name: "Anakwe Ogochukwu Theodora",
    specialty: "Laboratory Scientist",
    department: "Laboratory",
    age: "35 years",
    qualification: "OND, BNSC",
    experience: "20 years",
    availability: "Monday to Saturday, 9:00 AM to 6:00 PM",
    bio: "Anakwe Ogochukwu Theodora\nAge: 35 years\nRole: Laboratory Scientist\nSpecialization: General Laboratory Services\nExperience: 20 years\nQualifications: OND, BNSC\nAvailability: Monday – Saturday, 9:00 AM – 6:00 PM\nContact: 08066208550",
    expertise: ["General Laboratory Services"],
    phone: "08066208550",
  },
];

export type Article = {
  slug: string;
  title: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  excerpt: string;
  author: string;
  body: string[];
};

export const ARTICLE_CATEGORIES = [
  "All",
  "General Health",
  "Nutrition",
  "Children's Health",
  "Heart Health",
  "Wellness",
  "Preventive Care",
];

const body = (title: string) => [
  `Health information: This article is placeholder content written for layout purposes. Replace it with content reviewed by a qualified healthcare professional before publishing.`,
  `${title} is a topic many people ask about during routine consultations. General information can help you prepare useful questions, but it is not a substitute for personal medical advice.`,
  `Small, consistent habits usually matter more than dramatic changes. Regular sleep, balanced meals, movement during the day and attending scheduled check-ups all contribute to long-term wellbeing.`,
  `If you notice a new symptom, a symptom that is getting worse, or anything that worries you, speak with a healthcare professional. In an emergency, contact the emergency department directly.`,
];

export const ARTICLES: Article[] = [
  {
    slug: "understanding-preventive-healthcare",
    title: "Understanding Preventive Healthcare",
    category: "Preventive Care",
    image: "/understand.jpg",
    date: "2026-08-12",
    readTime: "5 min read",
    excerpt: "Why routine checks and screening matter, and how to plan them around your life.",
    author: "Madueke Health Editorial Team",
    body: body("Preventive healthcare"),
  },
  {
    slug: "healthy-habits-for-everyday-life",
    title: "Healthy Habits for Everyday Life",
    category: "Wellness",
    image: "/healthy.jpg",
    date: "2026-08-02",
    readTime: "4 min read",
    excerpt: "Simple, realistic habits that support long-term wellbeing without big lifestyle overhauls.",
    author: "Madueke Health Editorial Team",
    body: body("Everyday healthy habits"),
  },
  {
    slug: "when-should-you-see-a-doctor",
    title: "When Should You See a Doctor?",
    category: "General Health",
    image: "/when.jpg",
    date: "2026-07-21",
    readTime: "6 min read",
    excerpt: "General guidance on recognising when a symptom deserves professional attention.",
    author: "Madueke Health Editorial Team",
    body: body("Knowing when to seek care"),
  },
  {
    slug: "childrens-health-essentials",
    title: "Children's Health Essentials",
    category: "Children's Health",
    image: "/children.jpg",
    date: "2026-07-08",
    readTime: "5 min read",
    excerpt: "Growth, routine checks and everyday care questions parents commonly ask.",
    author: "Madueke Health Editorial Team",
    body: body("Children's health"),
  },
  {
    slug: "eating-well-on-a-busy-schedule",
    title: "Eating Well on a Busy Schedule",
    category: "Nutrition",
    image: "/eating.jpg",
    date: "2026-06-24",
    readTime: "4 min read",
    excerpt: "Practical approaches to balanced meals when time is short.",
    author: "Madueke Health Editorial Team",
    body: body("Balanced eating"),
  },
  {
    slug: "looking-after-your-heart",
    title: "Looking After Your Heart",
    category: "Heart Health",
    image: "/heart.jpg",
    date: "2026-06-10",
    readTime: "6 min read",
    excerpt: "General information about heart-healthy routines and when to ask for a review.",
    author: "Madueke Health Editorial Team",
    body: body("Heart health"),
  },
];

/** Named sample testimonials for layout; replace with consented, verified patient reviews. */
export const TESTIMONIALS = [
  {
    name: "Ugwueke Victor",
    initials: "PA",
    rating: 5,
    text: "The team explained everything clearly and I never felt rushed during my appointment.",
  },
  {
    name: "Chinedu Eze",
    initials: "PB",
    rating: 5,
    text: "Booking was simple and the facilities were clean, calm and comfortable.",
  },
  {
    name: "Mmesoma Okeke",
    initials: "PC",
    rating: 4,
    text: "Staff were kind and patient with my elderly mother throughout her visit.",
  },
  {
    name: "Nonso Umeh",
    initials: "PD",
    rating: 5,
    text: "Clear follow-up instructions and a genuinely caring approach from start to finish.",
  },
];

export const STATS = [
  { value: "15+", label: "Years of Care", note: "Placeholder value" },
  { value: "25+", label: "Nurses", note: "A dedicated nursing team" },
  { value: "7", label: "Care Departments", note: "Services and departments in one directory" },
  { value: "24/7", label: "Emergency Support", note: "Placeholder value" },
];

export const WHY_US = [
  { icon: Users, title: "Experienced Professionals", text: "Qualified healthcare professionals across multiple specialties." },
  { icon: Building2, title: "Modern Facilities", text: "A comfortable environment supported by modern medical equipment." },
  { icon: HandHeart, title: "Patient-Centered Care", text: "Care focused on communication, comfort and individual needs." },
  { icon: CalendarCheck, title: "Convenient Appointments", text: "Simple appointment scheduling that fits around your day." },
  { icon: Layers, title: "Comprehensive Services", text: "Multiple healthcare services available in one location." },
  { icon: ShieldCheck, title: "Supportive Environment", text: "A welcoming environment for patients and their families." },
];

export const QUICK_CARDS = [
  { icon: Activity, title: "24/7 Emergency Care", text: "Immediate access to emergency services.", to: "/emergency" },
  { icon: Stethoscope, title: "Experienced Care Team", text: "Meet the people supporting your care.", to: "/doctors" },
  { icon: Building2, title: "Modern Facilities", text: "Comfortable and well-equipped healthcare facilities.", to: "/about" },
  { icon: HandHeart, title: "Patient-Centered Care", text: "Healthcare designed around each patient's needs.", to: "/patients" },
];

export const VALUES = [
  { icon: HandHeart, title: "Compassion", text: "We treat every patient with kindness and respect." },
  { icon: ShieldCheck, title: "Integrity", text: "We communicate honestly and act in your best interest." },
  { icon: Sparkles, title: "Excellence", text: "We hold ourselves to high clinical and service standards." },
  { icon: Users, title: "Respect", text: "We listen carefully and value every person's dignity." },
  { icon: Syringe, title: "Safety", text: "Patient safety guides every process and decision." },
  { icon: ClipboardList, title: "Innovation", text: "We adopt modern tools that genuinely improve care." },
];

export const FAQ_GROUPS: { category: string; items: { q: string; a: string }[] }[] = [
  {
    category: "Appointments",
    items: [
      { q: "How do I book an appointment?", a: "Use the appointment form on this website or contact our appointments desk. Online requests are reviewed by our team before confirmation." },
      { q: "Can I choose my doctor?", a: "Yes. You can request a specific doctor when booking, subject to their clinic availability." },
      { q: "How do I reschedule or cancel?", a: "Contact the appointments desk as early as possible so the slot can be offered to another patient." },
    ],
  },
  {
    category: "Services",
    items: [
      { q: "What services are available?", a: "Our services directory lists every specialty currently offered, along with the associated department." },
      { q: "Do you offer health check packages?", a: "Preventive health check options are available. Contact us for current details." },
    ],
  },
  {
    category: "Emergency Care",
    items: [
      { q: "Is the emergency department always open?", a: "Yes, the emergency department operates 24 hours a day, every day." },
      { q: "Do I need an appointment for emergency care?", a: "No. Emergency patients are assessed on arrival and seen in order of clinical urgency." },
    ],
  },
  {
    category: "Billing",
    items: [
      { q: "How can I pay for my visit?", a: "Accepted payment methods will be listed here once confirmed by the hospital." },
      { q: "Can I get an itemised bill?", a: "Yes, itemised statements can be requested from the billing desk." },
    ],
  },
  {
    category: "Insurance",
    items: [
      { q: "Which insurers do you work with?", a: "A list of accepted insurance providers will be published here." },
      { q: "Do I need pre-authorisation?", a: "Some plans require pre-authorisation. Please check with your insurer before your visit." },
    ],
  },
  {
    category: "Patient Visits",
    items: [
      { q: "What are the visiting hours?", a: "Visiting hours are listed on the Patient Information page and may vary by ward." },
      { q: "How many visitors are allowed?", a: "Visitor limits vary by ward to protect patient rest and privacy." },
    ],
  },
  {
    category: "Medical Records",
    items: [
      { q: "How do I request my records?", a: "Submit a written request with valid identification to the medical records office." },
      { q: "How long does a request take?", a: "Processing times will be confirmed by the hospital's records team." },
    ],
  },
];

export const JOBS = [
  { title: "Registered Nurse", department: "Inpatient Services", location: "Madueke Memorial Hospital and Maternity", type: "Full-time", text: "Support ward-based patient care as part of a multidisciplinary team." },
  { title: "Medical Officer", department: "Internal Medicine", location: "Madueke Memorial Hospital and Maternity", type: "Full-time", text: "Assess and manage adult patients in outpatient and inpatient settings." },
];

export const LEADERSHIP = [
  { name: "Dr. Moses Ugwueke", role: "Managing Director", initials: "MU" },
  { name: "Nurse Ineh Modesta", role: "Matron and Head of Nurses", initials: "IM" },
  { name: "Nurse Ike Ifeatu", role: "Monitoring and Evaluation Officer", initials: "IF" },
  { name: "Eze Nneka", role: "Accountant", initials: "EN" },
];

export const TRUST_POINTS = ["Experienced Medical Team", "Modern Facilities", "Patient-Centered Care"];
