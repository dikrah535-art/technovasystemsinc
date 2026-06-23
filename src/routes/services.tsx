import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Users,
  Cpu,
  Cloud,
  Lock,
  Database,
  Rocket,
  Sparkles,
  Telescope,
} from "lucide-react";
import { TechNovaLogo } from "@/components/TechNovaLogo";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — TechNova Systems" },
      {
        name: "description",
        content:
          "IT Staffing, AI Consulting, Cloud & DevOps, Cybersecurity, and Data & Analytics — engineered for outcomes.",
      },
      { property: "og:title", content: "Services — TechNova Systems" },
      {
        property: "og:description",
        content:
          "Comprehensive technology services across staffing, AI, cloud, security, and data.",
      },
    ],
  }),
  component: ServicesPage,
});

type ServiceCard = {
  id: string;
  icon: typeof Users;
  eyebrow: string;
  title: string;
  body: string;
  stat: { value: string; label: string };
  bulletsTitle: string;
  bullets: string[];
  cta: string;
};

const SERVICES: ServiceCard[] = [
  {
    id: "it-staffing",
    icon: Users,
    eyebrow: "IT Staffing",
    title: "Engineering talent, deployed in days.",
    body:
      "Contingent specialists, direct hires, and embedded pods across cloud, data, security, and product engineering — vetted for skill, culture, and velocity.",
    stat: { value: "48h", label: "Average shortlist for qualified roles" },
    bulletsTitle: "Roles We Place",
    bullets: [
      "Senior & Staff Software Engineers",
      "Cloud / Platform / SRE Engineers",
      "Data Engineers, Analysts, ML Engineers",
      "Security Engineers & Architects",
      "Engineering Managers & Directors",
    ],
    cta: "Find Staffing Talent",
  },
  {
    id: "ai-consulting",
    icon: Cpu,
    eyebrow: "AI Consulting",
    title: "From AI strategy to production LLM systems.",
    body:
      "We design, build, and operationalize AI — from opportunity assessments and data readiness to retrieval pipelines, agents, and MLOps platforms.",
    stat: { value: "$15B+", label: "Generative AI market impact by 2030" },
    bulletsTitle: "Key Competencies",
    bullets: [
      "AI Readiness & Opportunity Assessment",
      "LLM & RAG Architecture",
      "Agentic Workflows & Tooling",
      "MLOps, Evaluation & Guardrails",
      "Responsible AI & Governance",
    ],
    cta: "Schedule an AI Assessment",
  },
  {
    id: "cloud-devops",
    icon: Cloud,
    eyebrow: "Cloud & DevOps",
    title: "Cloud-native platforms built to scale.",
    body:
      "Reference architectures, landing zones, Kubernetes platforms, and CI/CD pipelines across AWS, GCP, and Azure — paired with SRE expertise.",
    stat: { value: "99.95%", label: "Target SLO across managed platforms" },
    bulletsTitle: "Key Competencies",
    bullets: [
      "AWS / GCP / Azure Architecture",
      "Kubernetes & Service Mesh",
      "Terraform & GitOps Pipelines",
      "Observability & Cost Optimization",
      "Site Reliability Engineering",
    ],
    cta: "Find Cloud Talent",
  },
  {
    id: "cybersecurity",
    icon: Lock,
    eyebrow: "Cybersecurity",
    title: "Security engineering, not theater.",
    body:
      "Zero-trust architecture, SOC 2 / ISO readiness, and offensive testing led by engineers who've defended high-scale production systems.",
    stat: { value: "70%", label: "Of breaches start with identity — we close that gap" },
    bulletsTitle: "Key Competencies",
    bullets: [
      "Zero-Trust & IAM Engineering",
      "Cloud Security Posture Management",
      "SOC 2 / ISO 27001 Readiness",
      "AppSec, DevSecOps & SAST/DAST",
      "Incident Response & Threat Modeling",
    ],
    cta: "Find Security Talent",
  },
  {
    id: "data-analytics",
    icon: Database,
    eyebrow: "Data & Analytics",
    title: "Modern data stacks that compound.",
    body:
      "Lakehouses, streaming pipelines, semantic layers, and decision systems — engineered for clean lineage and product-grade reliability.",
    stat: { value: "10x", label: "Faster insights with our reference data platform" },
    bulletsTitle: "Key Competencies",
    bullets: [
      "Lakehouse Architecture (Snowflake / Databricks)",
      "dbt, Airflow & Streaming Pipelines",
      "Semantic Layer & BI Enablement",
      "Customer Data Platforms",
      "ML Feature Stores & Pipelines",
    ],
    cta: "Find Data Talent",
  },
];

const TIERS = [
  {
    icon: Rocket,
    chip: "Available Now",
    title: "Core Services",
    items: ["IT Staffing", "AI Consulting", "Cloud & DevOps", "Cybersecurity", "Data & Analytics"],
    tone: "text-emerald-300 bg-emerald-400/15 ring-emerald-400/40",
  },
  {
    icon: Sparkles,
    chip: "Within 6 Months",
    title: "Expanding Services",
    items: [
      "Managed AI Platforms",
      "FinOps & Cloud Optimization",
      "Industry-Specific Compliance Pods",
      "RPO at Enterprise Scale",
    ],
    tone: "text-gold bg-gold/15 ring-gold/40",
  },
  {
    icon: Telescope,
    chip: "12+ Months",
    title: "Future Vision",
    items: [
      "Autonomous Engineering Agents",
      "Sovereign AI Deployments",
      "Post-Quantum Security Practice",
      "Embedded Innovation Studios",
    ],
    tone: "text-royal bg-royal/15 ring-royal/40",
  },
];

function ServicesPage() {
  return (
    <div className="min-h-screen bg-navy text-foreground">
      <header className="border-b border-white/10 bg-navy/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center">
            <TechNovaLogo />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Back home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Services
            </div>
            <h1 className="mt-4 text-5xl font-bold tracking-tight text-white sm:text-6xl">
              Engineering the systems
              <br />
              <span className="text-gold">your roadmap demands.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/70">
              Five practice areas. One engineering mindset. Mix and match across staffing, AI, cloud, security, and data.
            </p>
          </div>
        </div>
      </section>

      {/* Service cards */}
      <section className="bg-navy-deep py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-7 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          {SERVICES.map((s) => (
            <motion.article
              key={s.id}
              id={s.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full flex-col rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.01] p-7 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] transition hover:border-white/25 hover:shadow-glow sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gold/15 text-gold ring-1 ring-gold/30">
                  <s.icon className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-royal/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-royal ring-1 ring-royal/40">
                  {s.eyebrow}
                </span>
              </div>
              <h2 className="mt-5 text-2xl font-semibold leading-tight text-white sm:text-3xl">
                {s.title}
              </h2>
              <p className="mt-3 text-sm text-white/70 sm:text-base">{s.body}</p>

              <div className="mt-6 rounded-2xl border border-gold/30 bg-gold/[0.08] p-5">
                <div className="text-3xl font-bold text-gold sm:text-4xl">{s.stat.value}</div>
                <div className="mt-1 text-xs font-medium text-white/70 sm:text-sm">
                  {s.stat.label}
                </div>
              </div>

              <div className="mt-6">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                  {s.bulletsTitle}
                </div>
                <ul className="mt-3 space-y-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-white/85">
                      <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-gold/20 text-gold">
                        <Check className="h-2.5 w-2.5" />
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7 pt-2">
                <Link
                  to="/"
                  hash="contact"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-gold transition hover:scale-[1.03]"
                >
                  {s.cta} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Roadmap / Service Tiers */}
      <section className="bg-navy py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-royal">
              Service Tiers
            </div>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Our roadmap — and where we're heading.
            </h2>
            <p className="mt-4 text-lg text-white/70">
              From the practices delivering value today to the capabilities we're investing in next.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {TIERS.map((t) => (
              <div
                key={t.title}
                className="flex h-full flex-col rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.01] p-7"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/5 text-white ring-1 ring-white/15">
                    <t.icon className="h-5 w-5" />
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1 ${t.tone}`}
                  >
                    {t.chip}
                  </span>
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-white">{t.title}</h3>
                <ul className="mt-5 space-y-2.5">
                  {t.items.map((i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-white/85">
                      <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-white/10 text-white/70">
                        <Check className="h-2.5 w-2.5" />
                      </span>
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#F59E0B] via-[#F59E0B] to-[#D97706] p-10 text-navy shadow-gold sm:p-14">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Not sure which service fits?
              </h2>
              <p className="mt-4 text-base text-navy/85 sm:text-lg">
                Spend 30 minutes with our team. We'll map your problem to the right capability — or tell you honestly when we're not the right partner.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/"
                hash="contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-white transition hover:scale-[1.03]"
              >
                Book a Free Consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/"
                hash="solutions"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-navy bg-transparent px-6 py-3.5 text-sm font-semibold text-navy transition hover:bg-navy hover:text-white"
              >
                View Hiring Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-navy py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <TechNovaLogo />
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} TechNova Systems. The Future Isn't Written. We Engineer It.
          </p>
        </div>
      </footer>
    </div>
  );
}