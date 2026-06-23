import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
        <Solutions onOpen={setActiveService} />
        <About />
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
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              The Future Isn't Written. We Engineer It.
            </span>
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
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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
    setSubmitting(true);
    setSubmitError(null);
    const { error } = await supabase.from("contacts").insert({
      full_name: result.data.name,
      email: result.data.email,
      message: result.data.company
        ? `[Company: ${result.data.company}]\n\n${result.data.message}`
        : result.data.message,
    });
    setSubmitting(false);
    if (error) {
      setSubmitError("Something went wrong sending your message. Please try again.");
      return;
    }
    setSubmitted(true);
  }

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
    <footer id="careers" className="border-t border-white/10 bg-navy py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <TechNovaLogo />
        <p className="text-xs text-white/50">
          © {new Date().getFullYear()} TechNova Systems. The Future Isn't Written. We Engineer It.
        </p>
      </div>
    </footer>
  );
}
