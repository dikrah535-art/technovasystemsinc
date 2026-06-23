import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import {
  Target,
  TrendingUp,
  ShieldCheck,
  Users,
  ArrowRight,
  ArrowLeft,
  Menu,
  X,
  Check,
  Briefcase,
  UserCheck,
  Crown,
  FileSpreadsheet,
  Mail,
  Phone,
  MapPin,
  Upload,
  MapPin as MapPinIcon,
  Building2,
  Clock,
  Cloud,
  Database,
  Lock,
  Cpu,
  Code2,
  GitBranch,
  Search,
  Star,
  Quote,
} from "lucide-react";
import { TechNovaLogo } from "@/components/TechNovaLogo";
import { ParticleField } from "@/components/ParticleField";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TechNova Systems — Intelligent Systems. Real Impact." },
      {
        name: "description",
        content:
          "TechNova Systems engineers scalable technology talent solutions — contingent staffing, direct placement, executive search, and RPO that power modern businesses.",
      },
      { property: "og:title", content: "TechNova Systems — Intelligent Systems. Real Impact." },
      {
        property: "og:description",
        content:
          "We engineer scalable technology talent solutions that power modern businesses.",
      },
    ],
  }),
  component: Index,
});

const navLinks = [
  { label: "Solutions", href: "#solutions" },
  { label: "Services", href: "#services" },
  { label: "Voices", href: "#testimonials" },
  { label: "About", href: "#about" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#contact" },
];

const attributes = [
  { icon: Target, title: "Focused", body: "We solve the right problems." },
  { icon: TrendingUp, title: "Scalable", body: "Built today for tomorrow." },
  { icon: ShieldCheck, title: "Reliable", body: "Engineering you can trust." },
  { icon: Users, title: "Impactful", body: "Real results. Real impact." },
];

const coreServices = [
  { icon: Cloud, title: "Cloud & Platform", body: "AWS, GCP and Azure architects who ship production-grade systems." },
  { icon: Database, title: "Data & Analytics", body: "Modern data stacks, lakehouses, and ML pipelines that compound." },
  { icon: Lock, title: "Security & Compliance", body: "From SOC 2 to zero-trust — security engineering, not theater." },
  { icon: Cpu, title: "AI & Machine Learning", body: "Applied ML, MLOps, and LLM platforms wired into your product." },
  { icon: Code2, title: "Product Engineering", body: "Full-stack squads that own outcomes — not just tickets." },
  { icon: GitBranch, title: "DevOps & SRE", body: "CI/CD, observability, and reliability for teams that ship daily." },
];

const testimonials = [
  {
    quote: "TechNova rebuilt our talent pipeline in 30 days. We cut time-to-hire in half and onboarded eight senior engineers before our roadmap slipped.",
    name: "Priya Natarajan",
    role: "VP Engineering, Lumen Health",
    rating: 5,
  },
  {
    quote: "The executive search was meticulous. Our new CTO was sourced confidentially and integrated in under 90 days — exactly as promised.",
    name: "Marcus Webb",
    role: "CEO, Northwind Robotics",
    rating: 5,
  },
  {
    quote: "They embed like a true engineering partner. Their RPO pod is indistinguishable from our internal team — only faster.",
    name: "Aisha Okonkwo",
    role: "Chief People Officer, Aperture AI",
    rating: 5,
  },
  {
    quote: "Vetted contractors landed in our standups within the week. The bar is genuinely high, and the bench is deep.",
    name: "Daniel Park",
    role: "Director of Platform, Skyloop",
    rating: 5,
  },
];

const heroPhrases = [
  "The Future Isn't Written.",
  "We Engineer It.",
];

type Service = {
  id: string;
  icon: typeof Briefcase;
  title: string;
  tagline: string;
  span: string;
  details: { headline: string; body: string; bullets: string[] };
};

const services: Service[] = [
  {
    id: "contingent",
    icon: Briefcase,
    title: "Contingent Staffing",
    tagline: "On-demand specialists, deployed in days — not months.",
    span: "md:col-span-2 md:row-span-2",
    details: {
      headline: "Flexible technology talent, ready when you scale.",
      body: "Engineer your delivery capacity with vetted contractors across cloud, data, security, and product engineering. We match for skill, culture, and velocity.",
      bullets: [
        "Pre-vetted talent network across 30+ tech stacks",
        "48-hour shortlist guarantee on most roles",
        "Transparent rate cards and timesheet tooling",
        "Compliance, payroll, and onboarding handled end-to-end",
      ],
    },
  },
  {
    id: "direct",
    icon: UserCheck,
    title: "Direct Placement",
    tagline: "Permanent hires built to compound.",
    span: "",
    details: {
      headline: "Hire the engineers who stay and ship.",
      body: "Our direct-placement practice combines deep technical screening with a structured culture-fit framework — built to reduce regrettable attrition.",
      bullets: [
        "Role calibration with hiring managers",
        "Live coding and systems-design assessments",
        "12-month replacement guarantee",
      ],
    },
  },
  {
    id: "exec",
    icon: Crown,
    title: "Executive Search",
    tagline: "Leaders who change trajectories.",
    span: "",
    details: {
      headline: "Find the leader your roadmap demands.",
      body: "A confidential retained-search practice for CTOs, VPs of Engineering, Heads of Data, and CISOs. We map markets, not just resumes.",
      bullets: [
        "Market mapping and discreet outreach",
        "Behavioral & leadership assessment",
        "Onboarding and 90-day integration support",
      ],
    },
  },
  {
    id: "rpo",
    icon: FileSpreadsheet,
    title: "Payroll & RPO",
    tagline: "Recruitment process outsourcing, engineered.",
    span: "md:col-span-2",
    details: {
      headline: "Embedded recruiting that scales with you.",
      body: "We operate as your talent function — sourcing, screening, scheduling, and offering — under your brand. Plus compliant payroll across the US and EMEA.",
      bullets: [
        "Dedicated pods aligned to business units",
        "ATS-agnostic with full reporting",
        "Global payroll and contractor management",
        "Cost-per-hire reduced by 30–45% on average",
      ],
    },
  },
];

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(160),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a bit more (10+ chars)").max(1000),
});

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [resumeOpen, setResumeOpen] = useState<{ role?: string } | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeService || resumeOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeService, resumeOpen]);

  return (
    <div className="min-h-screen bg-navy text-foreground">
      <Header
        scrolled={scrolled}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <main>
        <Hero />
        <Attributes />
        <CoreServices />
        <Solutions onOpen={setActiveService} />
        <About />
        <Testimonials />
        <Careers onApply={(role) => setResumeOpen({ role })} />
        <Contact />
      </main>
      <Footer />

      <AnimatePresence>
        {activeService && (
          <ServiceDetail service={activeService} onClose={() => setActiveService(null)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {resumeOpen && (
          <ResumeModal
            defaultRole={resumeOpen.role}
            onClose={() => setResumeOpen(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Header ---------- */
function Header({
  scrolled,
  menuOpen,
  setMenuOpen,
}: {
  scrolled: boolean;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
}) {
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? "glass-strong" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center">
          <TechNovaLogo />
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-white/70 transition hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-gold transition hover:scale-[1.03] md:inline-block"
        >
          Let's Connect
        </a>
        <button
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden rounded-md p-2 text-white"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden glass-strong"
          >
            <div className="space-y-1 px-4 pb-4 pt-2">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-md px-3 py-3 text-base font-medium text-white/80 hover:bg-white/5"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 block rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
              >
                Let's Connect
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ---------- Reveal helper ---------- */
const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-hero-gradient pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="absolute inset-0">
        <ParticleField />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium tracking-wide text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <Typewriter phrases={heroPhrases} />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Intelligent Systems.
              <br />
              <span className="text-gold">Real Impact.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-lg text-white/70 sm:text-xl">
              We engineer scalable technology talent solutions that power modern businesses — from contingent specialists to executive leadership.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-gold transition hover:scale-[1.04]"
              >
                Let's Connect
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </a>
              <a
                href="#solutions"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-base font-medium text-white transition hover:scale-[1.03] hover:bg-white/5"
              >
                Explore Solutions
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.4}>
          <div className="mt-20 grid grid-cols-2 gap-6 border-t border-white/10 pt-10 sm:grid-cols-4">
            {[
              ["98%", "Client retention"],
              ["48h", "Avg. shortlist"],
              ["30+", "Tech specializations"],
              ["12mo", "Placement guarantee"],
            ].map(([k, v]) => (
              <div key={v}>
                <div className="text-3xl font-bold text-white sm:text-4xl">{k}</div>
                <div className="mt-1 text-sm text-white/60">{v}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Brand Attributes ---------- */
function Attributes() {
  return (
    <section id="about" className="relative bg-navy py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-royal">
              Brand Attributes
            </div>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              How we engineer trust.
            </h2>
            <p className="mt-4 text-lg text-white/70">
              Four principles shape every engagement — from the first conversation to the systems we leave behind.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {attributes.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group h-full rounded-2xl glass p-6 transition hover:border-white/20"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-royal/15 text-royal ring-1 ring-royal/30">
                  <a.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">{a.title}</h3>
                <p className="mt-2 text-sm text-white/65">{a.body}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Solutions (Bento) ---------- */
function Solutions({ onOpen }: { onOpen: (s: Service) => void }) {
  return (
    <section id="solutions" className="relative bg-navy-deep py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                Solutions
              </div>
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Talent infrastructure for every stage of scale.
              </h2>
            </div>
            <p className="max-w-md text-white/70">
              Four practices, one engineering mindset. Mix and match to match your roadmap.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3 md:auto-rows-[260px]">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.06} className={s.span}>
              <motion.button
                onClick={() => onOpen(s)}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-7 text-left transition hover:border-white/25 hover:shadow-glow"
              >
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-royal/20 blur-3xl transition group-hover:bg-royal/40" />
                <div className="relative">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-gold/15 text-gold ring-1 ring-gold/30">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-white">{s.title}</h3>
                  <p className="mt-2 max-w-md text-sm text-white/65">{s.tagline}</p>
                </div>
                <div className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold">
                  Learn More
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </motion.button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Service Detail Drawer ---------- */
function ServiceDetail({ service, onClose }: { service: Service; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 260, damping: 32 }}
        onClick={(e) => e.stopPropagation()}
        className="relative h-full w-full max-w-xl overflow-y-auto bg-navy border-l border-white/10 p-6 sm:p-10"
      >
        <div className="flex items-center justify-between">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:scale-[1.03] hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <button
            aria-label="Close"
            onClick={onClose}
            className="rounded-full p-2 text-white/60 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-10">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gold/15 text-gold ring-1 ring-gold/30">
            <service.icon className="h-7 w-7" />
          </div>
          <div className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-royal">
            {service.title}
          </div>
          <h3 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl">
            {service.details.headline}
          </h3>
          <p className="mt-5 text-base text-white/70">{service.details.body}</p>

          <ul className="mt-8 space-y-3">
            {service.details.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-white/85">
                <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold/20 text-gold">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-sm">{b}</span>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            onClick={onClose}
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-gold transition hover:scale-[1.03]"
          >
            Talk to our team
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </motion.aside>
    </motion.div>
  );
}

/* ---------- About strip ---------- */
function About() {
  return (
    <section id="insights" className="relative bg-navy py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-royal">
              Why TechNova
            </div>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              A talent partner that thinks like an engineering team.
            </h2>
            <p className="mt-5 text-lg text-white/70">
              We pair the rigor of a delivery org with the empathy of a great recruiter. Every search is treated as a system: defined, observable, and optimized.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            ["Innovative", "Pushing boundaries with new ideas."],
            ["Expert", "Deep technology. Proven execution."],
            ["Partner", "Your goals. Our commitment."],
            ["Integrity", "Transparent. Honest. Always reliable."],
          ].map(([t, b], i) => (
            <Reveal key={t} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -3 }}
                className="rounded-2xl glass p-5"
              >
                <div className="text-base font-semibold text-gold">{t}</div>
                <p className="mt-2 text-sm text-white/70">{b}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  type FieldErrors = Partial<Record<"name" | "email" | "company" | "message", string>>;
  const [values, setValues] = useState({ name: "", email: "", company: "", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (payload: { full_name: string; email: string; message: string }) => {
      const { error } = await supabase.from("contacts").insert(payload);
      if (error) throw error;
    },
    onSuccess: () => {
      setSubmitted(true);
      qc.invalidateQueries({ queryKey: ["contacts"] });
    },
  });

  function validateField(field: keyof typeof values, val: string) {
    const partial = { ...values, [field]: val };
    const result = contactSchema.safeParse(partial);
    if (result.success) {
      setErrors((e) => ({ ...e, [field]: undefined }));
    } else {
      const fieldErr = result.error.issues.find((i) => i.path[0] === field);
      setErrors((e) => ({ ...e, [field]: fieldErr?.message }));
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = contactSchema.safeParse(values);
    if (!result.success) {
      const errs: FieldErrors = {};
      result.error.issues.forEach((i) => {
        errs[i.path[0] as keyof FieldErrors] = i.message;
      });
      setErrors(errs);
      return;
    }
    mutation.mutate({
      full_name: result.data.name,
      email: result.data.email,
      message: result.data.company
        ? `[Company: ${result.data.company}]\n\n${result.data.message}`
        : result.data.message,
    });
  }

  const submitting = mutation.isPending;
  const submitError = mutation.isError
    ? "Something went wrong sending your message. Please try again."
    : null;

  return (
    <section id="contact" className="relative overflow-hidden bg-navy-deep py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-royal/10 to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Contact
            </div>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Let's engineer your next chapter.
            </h2>
            <p className="mt-5 max-w-md text-lg text-white/70">
              Tell us where you're headed. We'll respond within one business day with a tailored point of view.
            </p>

            <ul className="mt-10 space-y-4 text-sm text-white/75">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gold" /> hello@technova.systems
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gold" /> +1 (234) 567-8000
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gold" /> Remote-first · HQ in Austin, TX
              </li>
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-3xl glass p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-start gap-5 py-8"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-gold/20 text-gold">
                    <Check className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white">Message received.</h3>
                    <p className="mt-2 text-white/70">
                      A member of our team will reach out within one business day.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setValues({ name: "", email: "", company: "", message: "" });
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:scale-[1.03] hover:text-white"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to form
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={onSubmit}
                  noValidate
                  className="space-y-5"
                >
                  <Field
                    label="Full name"
                    name="name"
                    value={values.name}
                    error={errors.name}
                    onChange={(v) => {
                      setValues((s) => ({ ...s, name: v }));
                      validateField("name", v);
                    }}
                  />
                  <Field
                    label="Work email"
                    name="email"
                    type="email"
                    value={values.email}
                    error={errors.email}
                    onChange={(v) => {
                      setValues((s) => ({ ...s, email: v }));
                      validateField("email", v);
                    }}
                  />
                  <Field
                    label="Company (optional)"
                    name="company"
                    value={values.company}
                    error={errors.company}
                    onChange={(v) => {
                      setValues((s) => ({ ...s, company: v }));
                      validateField("company", v);
                    }}
                  />
                  <Field
                    label="How can we help?"
                    name="message"
                    textarea
                    value={values.message}
                    error={errors.message}
                    onChange={(v) => {
                      setValues((s) => ({ ...s, message: v }));
                      validateField("message", v);
                    }}
                  />
                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-gold transition disabled:opacity-60 sm:w-auto"
                  >
                    {submitting ? "Sending..." : "Send message"}
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                  {submitError && (
                    <p className="text-sm text-red-300">{submitError}</p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  textarea,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  textarea?: boolean;
}) {
  const base =
    "w-full rounded-xl border bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-royal focus:ring-2 focus:ring-royal/30";
  const borderClass = error ? "border-red-400/60" : "border-white/10";
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/60">
        {label}
      </span>
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className={`${base} ${borderClass} resize-none`}
        />
      ) : (
        <input
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${base} ${borderClass}`}
        />
      )}
      {error && (
        <span className="mt-1.5 block text-xs text-red-300">{error}</span>
      )}
    </label>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <TechNovaLogo />
        <p className="text-xs text-white/50">
          © {new Date().getFullYear()} TechNova Systems. The Future Isn't Written. We Engineer It.
        </p>
      </div>
    </footer>
  );
}

/* ---------- Careers ---------- */
type JobPosting = {
  id: string;
  title: string;
  department: string;
  location: string;
  employment_type: string;
  description: string;
};

function useJobPostingsQuery() {
  const qc = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel("job_postings_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "job_postings" },
        () => qc.invalidateQueries({ queryKey: ["job_postings"] }),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [qc]);

  return useQuery<JobPosting[]>({
    queryKey: ["job_postings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("job_postings")
        .select("id,title,department,location,employment_type,description")
        .eq("is_active", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as JobPosting[];
    },
  });
}

function Careers({ onApply }: { onApply: (role?: string) => void }) {
  const { data: jobs, isLoading, isError } = useJobPostingsQuery();
  const [roleType, setRoleType] = useState<string>("All");
  const [location, setLocation] = useState<string>("All");
  const [skill, setSkill] = useState<string>("");

  const roleTypes = useMemo(
    () => ["All", ...Array.from(new Set((jobs ?? []).map((j) => j.employment_type)))],
    [jobs],
  );
  const locations = useMemo(
    () => ["All", ...Array.from(new Set((jobs ?? []).map((j) => j.location)))],
    [jobs],
  );

  const filtered = useMemo(() => {
    return (jobs ?? []).filter((j) => {
      if (roleType !== "All" && j.employment_type !== roleType) return false;
      if (location !== "All" && j.location !== location) return false;
      if (skill.trim()) {
        const q = skill.trim().toLowerCase();
        const blob = `${j.title} ${j.description} ${j.department}`.toLowerCase();
        if (!blob.includes(q)) return false;
      }
      return true;
    });
  }, [jobs, roleType, location, skill]);

  return (
    <section id="careers" className="relative bg-navy py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-royal">
                Careers
              </div>
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Browse open roles.
              </h2>
              <p className="mt-4 text-lg text-white/70">
                Engineer the future with us. Don't see a fit? Send your resume — we keep a warm bench.
              </p>
            </div>
            <button
              onClick={() => onApply()}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-gold transition hover:scale-[1.03]"
            >
              <Upload className="h-4 w-4" />
              Submit Your Resume
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-12 rounded-2xl glass p-4 sm:p-5">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_180px_180px]">
              <label className="relative block">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <input
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  placeholder="Search by skill, title, or department…"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 pl-9 pr-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-royal focus:ring-2 focus:ring-royal/30"
                />
              </label>
              <FilterSelect value={roleType} onChange={setRoleType} options={roleTypes} label="Role type" />
              <FilterSelect value={location} onChange={setLocation} options={locations} label="Location" />
            </div>
            <div className="mt-3 text-xs text-white/50">
              Showing <span className="text-white/80">{filtered.length}</span>
              {jobs ? <> of <span className="text-white/80">{jobs.length}</span></> : null} open roles
              <span className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-royal/15 px-2 py-0.5 text-royal">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-royal" />
                Live
              </span>
            </div>
          </div>
        </Reveal>

        <div id="opportunities" className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {isError && (
            <p className="text-sm text-red-300">We couldn't load open roles right now.</p>
          )}
          {isLoading &&
            [0, 1, 2, 3].map((i) => (
              <div key={i} className="h-44 animate-pulse rounded-2xl glass" />
            ))}
          {!isLoading && filtered.length === 0 && !isError && (
            <p className="text-white/60">No roles match those filters — try widening your search.</p>
          )}
          {filtered.map((job, i) => (
            <Reveal key={job.id} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -3 }}
                className="flex h-full flex-col justify-between rounded-2xl glass p-6"
              >
                <div>
                  <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                  <p className="mt-3 text-sm text-white/65">{job.description}</p>
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/55">
                    <span className="inline-flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5 text-gold" />
                      {job.department}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPinIcon className="h-3.5 w-3.5 text-gold" />
                      {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-gold" />
                      {job.employment_type}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onApply(job.title)}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold transition hover:translate-x-0.5"
                >
                  Apply Now
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Resume Modal ---------- */
const applicationSchema = z.object({
  full_name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().email("Enter a valid email").max(160),
  phone: z.string().trim().min(6, "Enter a valid phone").max(40),
  role_applied_for: z.string().trim().min(2, "Please enter a role").max(160),
});

const ALLOWED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_RESUME_BYTES = 5 * 1024 * 1024;

function ResumeModal({
  defaultRole,
  onClose,
}: {
  defaultRole?: string;
  onClose: () => void;
}) {
  const [values, setValues] = useState({
    full_name: "",
    email: "",
    phone: "",
    role_applied_for: defaultRole ?? "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (input: {
      data: z.infer<typeof applicationSchema>;
      file: File;
    }) => {
      const ext = input.file.name.includes(".")
        ? input.file.name.split(".").pop()
        : "bin";
      const safeName = input.data.full_name.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
      const path = `${Date.now()}-${safeName}-${crypto.randomUUID()}.${ext}`;
      const { error: uploadErr } = await supabase.storage
        .from("resumes")
        .upload(path, input.file, { contentType: input.file.type, upsert: false });
      if (uploadErr) throw new Error("upload");
      const { data: publicUrlData } = supabase.storage.from("resumes").getPublicUrl(path);
      const { error: insertErr } = await supabase.from("job_applications").insert({
        ...input.data,
        resume_url: publicUrlData.publicUrl,
      });
      if (insertErr) throw new Error("insert");
    },
    onSuccess: () => {
      setSubmitted(true);
      qc.invalidateQueries({ queryKey: ["job_applications"] });
    },
    onError: (err: Error) => {
      setSubmitError(
        err.message === "insert"
          ? "Your resume uploaded, but we couldn't save your application. Please contact us."
          : "We couldn't upload your resume. Please try again.",
      );
    },
  });
  const submitting = mutation.isPending;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function validateFile(f: File | null): string | null {
    if (!f) return "Please attach your resume (PDF or DOCX).";
    if (!ALLOWED_RESUME_TYPES.includes(f.type)) return "Resume must be a PDF or DOCX file.";
    if (f.size > MAX_RESUME_BYTES) return "Resume must be 5MB or smaller.";
    return null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    const parsed = applicationSchema.safeParse(values);
    const fileErr = validateFile(file);
    const newErrs: Record<string, string> = {};
    if (!parsed.success) {
      parsed.error.issues.forEach((i) => {
        newErrs[String(i.path[0])] = i.message;
      });
    }
    if (fileErr) newErrs.file = fileErr;
    setErrors(newErrs);
    if (Object.keys(newErrs).length > 0 || !parsed.success || !file) return;
    mutation.mutate({ data: parsed.data, file });
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-navy p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80 transition hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </button>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1.5 text-white/60 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-gold/20 text-gold">
              <Check className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-2xl font-semibold text-white">Application submitted.</h3>
            <p className="mt-2 text-white/70">
              Thanks — our talent team will review your resume and reach out if there's a match.
            </p>
            <button
              onClick={onClose}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-gold"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="mt-4 space-y-4">
            <h3 className="text-2xl font-semibold text-white">Submit Your Resume</h3>
            <p className="text-sm text-white/65">
              Share your details and we'll be in touch about matching roles.
            </p>

            <ModalField
              label="Full name"
              value={values.full_name}
              onChange={(v) => setValues((s) => ({ ...s, full_name: v }))}
              error={errors.full_name}
            />
            <ModalField
              label="Email"
              type="email"
              value={values.email}
              onChange={(v) => setValues((s) => ({ ...s, email: v }))}
              error={errors.email}
            />
            <ModalField
              label="Phone"
              type="tel"
              value={values.phone}
              onChange={(v) => setValues((s) => ({ ...s, phone: v }))}
              error={errors.phone}
            />
            <ModalField
              label="Role you're applying for"
              value={values.role_applied_for}
              onChange={(v) => setValues((s) => ({ ...s, role_applied_for: v }))}
              error={errors.role_applied_for}
            />

            <div>
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/60">
                Resume (PDF or DOCX, max 5MB)
              </span>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex w-full items-center justify-between gap-3 rounded-xl border border-dashed border-white/20 bg-white/[0.04] px-4 py-3 text-left text-sm text-white/75 hover:border-white/40"
              >
                <span className="truncate">{file ? file.name : "Choose a file..."}</span>
                <Upload className="h-4 w-4 text-gold" />
              </button>
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0] ?? null;
                  setFile(f);
                  const err = validateFile(f);
                  setErrors((prev) => ({ ...prev, file: err ?? "" }));
                }}
              />
              {errors.file && (
                <span className="mt-1.5 block text-xs text-red-300">{errors.file}</span>
              )}
            </div>

            {submitError && <p className="text-sm text-red-300">{submitError}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-gold transition disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit Application"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

function ModalField({
  label,
  value,
  onChange,
  error,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/60">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl border bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-royal focus:ring-2 focus:ring-royal/30 ${
          error ? "border-red-400/60" : "border-white/10"
        }`}
      />
      {error && <span className="mt-1.5 block text-xs text-red-300">{error}</span>}
    </label>
  );
}

/* ---------- Typewriter ---------- */
function Typewriter({ phrases }: { phrases: string[] }) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");

  useEffect(() => {
    const current = phrases[phraseIndex];
    let timer: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (text.length < current.length) {
        timer = setTimeout(() => setText(current.slice(0, text.length + 1)), 55);
      } else {
        timer = setTimeout(() => setPhase("holding"), 1400);
      }
    } else if (phase === "holding") {
      timer = setTimeout(() => setPhase("deleting"), 200);
    } else {
      if (text.length > 0) {
        timer = setTimeout(() => setText(current.slice(0, text.length - 1)), 28);
      } else {
        setPhraseIndex((i) => (i + 1) % phrases.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(timer);
  }, [text, phase, phraseIndex, phrases]);

  return (
    <span className="inline-flex items-center font-medium text-white/90" aria-live="polite">
      <span>{text || "\u00A0"}</span>
      <motion.span
        aria-hidden
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
        className="ml-0.5 inline-block h-3.5 w-[2px] bg-gold align-middle"
      />
    </span>
  );
}

/* ---------- Core Services strip ---------- */
function CoreServices() {
  return (
    <section id="services" className="relative bg-navy-deep py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Core Services
            </div>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Specialized talent across the modern stack.
            </h2>
            <p className="mt-4 text-lg text-white/70">
              Six practice areas. Deep benches. Engineers who've shipped what your roadmap needs next.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {coreServices.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group h-full rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.01] p-6 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] transition hover:border-white/25 hover:shadow-glow"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-royal/15 text-royal ring-1 ring-royal/30 transition group-hover:bg-gold/15 group-hover:text-gold group-hover:ring-gold/30">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-white/65">{s.body}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials grid ---------- */
function Testimonials() {
  return (
    <section id="testimonials" className="relative bg-navy-deep py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Voices
            </div>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Trusted by teams who ship.
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <motion.figure
                whileHover={{ y: -3 }}
                className="relative h-full rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.01] p-7 shadow-[0_20px_60px_-30px_rgba(37,99,235,0.4)]"
              >
                <Quote className="absolute right-6 top-6 h-8 w-8 text-royal/30" />
                <div className="flex items-center gap-1 text-gold">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-5 text-base leading-relaxed text-white/85">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-6 border-t border-white/10 pt-4">
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-white/55">{t.role}</div>
                </figcaption>
              </motion.figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Filter Select (Careers) ---------- */
function FilterSelect({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  label: string;
}) {
  return (
    <label className="relative block">
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none transition focus:border-royal focus:ring-2 focus:ring-royal/30"
      >
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-navy text-white">
            {opt === "All" ? `${label}: All` : opt}
          </option>
        ))}
      </select>
    </label>
  );
}
