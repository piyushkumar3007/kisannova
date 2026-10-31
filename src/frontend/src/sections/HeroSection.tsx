import { Button } from "@/components/ui/button";
import { BadgeCheck, ChevronDown, Leaf, TrendingUp, Waves } from "lucide-react";
import { motion } from "motion/react";

// ─── Value Proposition Pillars ──────────────────────────────────────────────
const PILLARS = [
  {
    icon: <TrendingUp className="w-5 h-5" />,
    label: "Sonic Innovation",
    description: "Exploring sound-based approaches to crop protection",
  },
  {
    icon: <Waves className="w-5 h-5" />,
    label: "Research-Led",
    description: "Testing ideas before making performance claims",
  },
  {
    icon: <Leaf className="w-5 h-5" />,
    label: "Farmer-Focused",
    description: "Technology shaped around real farming challenges",
  },
];

interface HeroSectionProps {
  onRequestDemo?: () => void;
  onSeeHowItWorks?: () => void;
}

export default function HeroSection({
  onRequestDemo,
  onSeeHowItWorks,
}: HeroSectionProps) {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const handleRequestDemo = () => {
    if (onRequestDemo) {
      onRequestDemo();
    } else {
      scrollTo("contact");
    }
  };

  const handleSeeHowItWorks = () => {
    if (onSeeHowItWorks) {
      onSeeHowItWorks();
    } else {
      scrollTo("technology");
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden"
      data-ocid="hero.section"
    >
      {/* ── Background: lush field image + dual overlay ────────────────── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/kisannova-field-bg.dim_1600x900.jpg"
          alt=" farm field"
          className="w-full h-full object-cover"
        />
        {/* Dark tint for text readability */}
        <div className="absolute inset-0 bg-foreground/60" />
        {/* Warm terracotta gradient from left */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-foreground/30 to-transparent" />
        {/* Bottom fade to bg-background for seamless section transition */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* ── Sonic Ripple Rings (decorative, right side) ─────────────────── */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 hidden lg:flex items-center justify-center z-10 pointer-events-none"
        aria-hidden="true"
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className="absolute rounded-full border border-primary-foreground/20 sonic-ripple"
            style={{
              width: `${i * 130}px`,
              height: `${i * 130}px`,
              animationDelay: `${i * 0.45}s`,
            }}
          />
        ))}
        {/* Center glow dot */}
        <span className="w-4 h-4 rounded-full bg-accent/80 relative z-10" />
      </div>

      {/* ── Main Content ────────────────────────────────────────────────── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col gap-10">
        {/* Brand identity block */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start gap-1"
          data-ocid="hero.brand"
        >
          {/* AgriNova name */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center shadow-elevated">
              <BadgeCheck className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="font-display text-2xl font-bold text-primary-foreground tracking-tight">
              KisanNova
            </span>
          </div>
          {/* KisanNova team credit */}
          {/*
          <span className="text-xs font-body font-medium text-primary-foreground/90 tracking-widest uppercase pl-11 drop-shadow-sm">
            by Team KisanNova
          </span>}
          {/* KisanNova team credit */}
          
        </motion.div>

        {/* Headline block */}
        <div className="max-w-3xl flex flex-col gap-5">
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-1.5 w-fit text-xs font-body font-bold uppercase tracking-widest text-white bg-black/45 border border-white/35 px-3 py-1.5 rounded-full backdrop-blur-sm"
            data-ocid="hero.badge"
          >
            <Waves className="w-3.5 h-3.5" />
            100% Chemical-Free Pest Control
          </motion.span>

          {/* Primary headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-primary-foreground leading-[1.08] tracking-tight"
            data-ocid="hero.headline"
          >
            Protect Your Crops.{" "}
            <span className="text-[#b9f6c8] relative drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
              Protect the Planet.
              {/* Underline accent */}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent/60 origin-left rounded-full"
                aria-hidden="true"
              />
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="text-lg sm:text-xl text-white font-body leading-relaxed max-w-2xl drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]"
            data-ocid="hero.subheadline"
          >
            Nova sends sound waves through your field that confuse and drive
            away harmful insects — without a single drop of pesticide. Your
            crops grow strong. Your soil stays alive. Your family stays safe.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.38 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <Button
              type="button"
              size="lg"
              onClick={handleRequestDemo}
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-elevated transition-smooth font-body font-semibold px-8 text-base"
              data-ocid="hero.request_demo_button"
            >
              Request a Demo
            </Button>
            <Button
              type="button"
              size="lg"
              variant="outline"
              onClick={handleSeeHowItWorks}
              className="border-primary-foreground/40 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 backdrop-blur-sm transition-smooth font-body font-semibold px-8 text-base"
              data-ocid="hero.see_how_it_works_button"
            >
              See How It Works
            </Button>
          </motion.div>
        </div>

        {/* ── Value Proposition Pillars ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 pt-2"
          data-ocid="hero.pillars"
        >
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.55 + i * 0.1 }}
              className="flex items-start gap-3 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-xl px-5 py-4 flex-1"
              data-ocid={`hero.pillar.${i + 1}`}
            >
              <div className="w-9 h-9 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0 text-accent">
                {pillar.icon}
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="font-display font-semibold text-primary-foreground text-sm tracking-wide">
                  {pillar.label}
                </span>
                <span className="text-xs text-white/90 font-body leading-snug drop-shadow-sm">
                  {pillar.description}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll Cue ─────────────────────────────────────────────────── */}
      <motion.button
        type="button"
        onClick={() => scrollTo("technology")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/85 hover:text-white drop-shadow-sm transition-smooth flex flex-col items-center gap-1.5 group"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2.2 }}
        aria-label="Scroll down to see how it works"
        data-ocid="hero.scroll_cue"
      >
        <span className="text-xs font-body tracking-[0.2em] uppercase opacity-70 group-hover:opacity-100 transition-smooth">
          Discover
        </span>
        <ChevronDown className="w-4 h-4" />
      </motion.button>
    </section>
  );
}
