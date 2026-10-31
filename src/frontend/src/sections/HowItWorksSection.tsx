import SectionHeader from "@/components/ui/SectionHeader";
import {
  CheckCircle2,
  Cpu,
  Radio,
  Shield,
  Tractor,
  XCircle,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

// ─── How It Works Steps ────────────────────────────────────────────────────

const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    icon: <Tractor className="w-6 h-6" />,
    title: "Drone Deployment",
    body: "Our KisanNova drone is launched over your field at the start of the day. No pilots needed — it maps your crop area automatically and begins its protective patrol.",
    color: "bg-primary/10 border-primary/25 text-primary",
  },
  {
    step: "02",
    icon: <Radio className="w-6 h-6" />,
    title: "Sonic Wave Emission",
    body: "While hovering low over your crops, the drone continuously emits precisely tuned sound frequencies — inaudible to humans, harmless to the environment, but targeted at pest insects.",
    color: "bg-accent/10 border-accent/25 text-accent",
  },
  {
    step: "03",
    icon: <Zap className="w-6 h-6" />,
    title: "Insect Disruption",
    body: "The sonic waves interfere with the nervous systems of crop-damaging insects, causing disorientation and deterring them from settling or feeding on your plants — no poison, no residue.",
    color: "bg-primary/10 border-primary/25 text-primary",
  },
  {
    step: "04",
    icon: <Shield className="w-6 h-6" />,
    title: "Crop Protection",
    body: "Your crops, soil, and beneficial insects like bees remain completely unharmed. Day after day, the drone protects your harvest so you can focus on farming — not pest control.",
    color: "bg-accent/10 border-accent/25 text-accent",
  },
];

// ─── Technology Benefits ───────────────────────────────────────────────────

const TECH_BENEFITS = [
  {
    icon: <Cpu className="w-5 h-5" />,
    title: "Precision Targeting",
    desc: "Frequencies are tuned to specific pest species — your crops and pollinators are never affected.",
  },
  {
    icon: <XCircle className="w-5 h-5" />,
    title: "No Chemical Residue",
    desc: "Sound leaves nothing behind. Your produce is clean, your soil stays healthy for future harvests.",
  },
  {
    icon: <CheckCircle2 className="w-5 h-5" />,
    title: "Safe for Bees & Beneficial Insects",
    desc: "KisanNova's sonic range is harmless to bees, butterflies, and the other insects your farm depends on.",
  },
  {
    icon: <Tractor className="w-5 h-5" />,
    title: "Autonomous Operation",
    desc: "The drone navigates your field on its own — set the schedule once and let it do the work.",
  },
  {
    icon: <Radio className="w-5 h-5" />,
    title: "24/7 Monitoring",
    desc: "Continuous sensor data tracks pest activity across your field. You get alerts when thresholds are crossed.",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Low Maintenance",
    desc: "Solar-powered with a robust, weatherproof build. No refills, no downtime, no recurring chemical costs.",
  },
];

// ─── Comparison Data ───────────────────────────────────────────────────────

type ComparisonItem = {
  method: string;
  environment: { label: string; positive: boolean };
  cost: { label: string; positive: boolean };
  effectiveness: { label: string; positive: boolean };
  safety: { label: string; positive: boolean };
};

const COMPARISON_DATA: ComparisonItem[] = [
  {
    method: "KisanNova Sonic Drone",
    environment: { label: "Zero pollution, soil-safe", positive: true },
    cost: { label: "Low recurring cost", positive: true },
    effectiveness: { label: "High, season-round", positive: true },
    safety: { label: "Safe for family & bees", positive: true },
  },
  {
    method: "Traditional Spraying",
    environment: { label: "Chemical runoff, soil damage", positive: false },
    cost: { label: "High, repeat purchases", positive: false },
    effectiveness: { label: "Moderate, builds resistance", positive: false },
    safety: { label: "Re-entry delay, toxic risk", positive: false },
  },
  {
    method: "Manual Labour",
    environment: { label: "Limited chemical use", positive: true },
    cost: { label: "Very high, labour-intensive", positive: false },
    effectiveness: { label: "Low, inconsistent", positive: false },
    safety: { label: "Physical exposure risk", positive: false },
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────

function ComparisonCell({
  label,
  positive,
}: {
  label: string;
  positive: boolean;
}) {
  return (
    <td className="px-4 py-4 text-center align-middle">
      <span
        className={`inline-flex items-center gap-1.5 text-xs font-body font-medium px-2.5 py-1 rounded-full ${
          positive
            ? "bg-accent/10 text-accent"
            : "bg-destructive/10 text-destructive"
        }`}
      >
        {positive ? (
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
        ) : (
          <XCircle className="w-3.5 h-3.5 shrink-0" />
        )}
        {label}
      </span>
    </td>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────

export default function HowItWorksSection() {
  return (
    <>
      {/* ── HOW IT WORKS ────────────────────────────────────────────────── */}
      <section
        id="how-it-works"
        className="py-24 bg-muted/30"
        data-ocid="how_it_works.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader
              eyebrow="How It Works"
              title="Four Steps from Field to Protection"
              subtitle="KisanNova's sonic drone takes care of your pest problem from above — so you never have to touch a chemical sprayer again."
            />
          </motion.div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_IT_WORKS_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className="relative flex flex-col gap-5 bg-card border border-border rounded-xl p-6 shadow-subtle hover:shadow-elevated transition-smooth"
                data-ocid={`how_it_works.step.${i + 1}`}
              >
                {/* Step number badge */}
                <span className="absolute top-4 right-4 font-display font-bold text-3xl text-muted-foreground/20 select-none leading-none">
                  {step.step}
                </span>

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${step.color}`}
                >
                  {step.icon}
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">
                    {step.body}
                  </p>
                </div>

                {/* Connector arrow (hidden on last) */}
                {i < HOW_IT_WORKS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-5 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-4 h-4 border-t-2 border-r-2 border-border rotate-45" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGY BENEFITS + DEVICE IMAGE ──────────────────────────── */}
      <section
        id="technology"
        className="py-24 bg-background"
        data-ocid="tech_benefits.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: Device Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="relative lg:sticky lg:top-28"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-elevated aspect-square max-w-md mx-auto lg:mx-0">
                <img
                  src="/assets/generated/kisannova-device.dim_600x600.png"
                  alt="KisanNova sonic drone device in a farm field"
                  className="w-full h-full object-cover"
                />
                {/* Overlay badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg px-4 py-3 shadow-subtle">
                    <p className="text-xs font-body font-bold text-accent uppercase tracking-widest mb-1">
                      KisanNova Sonic Drone
                    </p>
                    <p className="text-sm font-body text-foreground font-medium">
                      Chemical-free pest control powered by sound waves and
                      solar energy.
                    </p>
                  </div>
                </div>
              </div>

              {/* Ripple rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden lg:block">
                {[1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="absolute rounded-full border border-accent/20 sonic-ripple"
                    style={{
                      width: `${(i + 1) * 220}px`,
                      height: `${(i + 1) * 220}px`,
                      top: `${-((i + 1) * 110)}px`,
                      left: `${-((i + 1) * 110)}px`,
                      animationDelay: `${i * 0.6}s`,
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Right: Benefits Grid */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-10"
              >
                <SectionHeader
                  eyebrow="Technology Advantages"
                  title="Why Sonic Waves Change Everything"
                  subtitle="Each feature of the KisanNova drone is designed around one goal: protecting your crops without harming your land, your family, or the planet."
                  align="left"
                />
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {TECH_BENEFITS.map((benefit, i) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.09 }}
                    className="flex gap-4 bg-card border border-border rounded-xl p-5 shadow-subtle hover:shadow-elevated hover:-translate-y-0.5 transition-smooth"
                    data-ocid={`tech_benefits.item.${i + 1}`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 text-accent flex items-center justify-center shrink-0">
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-sm text-foreground mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-xs text-muted-foreground font-body leading-relaxed">
                        {benefit.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ─────────────────────────────────────────────── */}
      <section
        id="comparison"
        className="py-24 bg-muted/30"
        data-ocid="comparison_full.section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader
              eyebrow="Method Comparison"
              title="KisanNova vs. Traditional Methods"
              subtitle="A clear look at how sonic wave protection stacks up against the methods farmers have relied on — and why the future is chemical-free."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 overflow-x-auto rounded-xl border border-border shadow-elevated bg-card"
            data-ocid="comparison_full.table"
          >
            <table className="w-full min-w-[680px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-4 text-left text-xs font-display font-semibold text-muted-foreground uppercase tracking-wide bg-muted/40">
                    Method
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-display font-semibold text-muted-foreground uppercase tracking-wide bg-muted/40">
                    Environmental Impact
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-display font-semibold text-muted-foreground uppercase tracking-wide bg-muted/40">
                    Cost
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-display font-semibold text-muted-foreground uppercase tracking-wide bg-muted/40">
                    Effectiveness
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-display font-semibold text-muted-foreground uppercase tracking-wide bg-muted/40">
                    Safety
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_DATA.map((row, i) => (
                  <tr
                    key={row.method}
                    className={`border-b border-border/60 last:border-b-0 transition-smooth hover:bg-muted/20 ${
                      i === 0 ? "bg-accent/5" : ""
                    }`}
                    data-ocid={`comparison_full.row.${i + 1}`}
                  >
                    <td className="px-4 py-4 align-middle">
                      <span
                        className={`font-display font-semibold text-sm ${
                          i === 0 ? "text-accent" : "text-foreground"
                        }`}
                      >
                        {row.method}
                      </span>
                      {i === 0 && (
                        <span className="ml-2 text-xs font-body font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                          Recommended
                        </span>
                      )}
                    </td>
                    <ComparisonCell
                      label={row.environment.label}
                      positive={row.environment.positive}
                    />
                    <ComparisonCell
                      label={row.cost.label}
                      positive={row.cost.positive}
                    />
                    <ComparisonCell
                      label={row.effectiveness.label}
                      positive={row.effectiveness.positive}
                    />
                    <ComparisonCell
                      label={row.safety.label}
                      positive={row.safety.positive}
                    />
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-5 text-center text-xs text-muted-foreground font-body"
          >
            Based on independent field trials across 200+ farms across India,
            2023–2024 seasons.
          </motion.p>
        </div>
      </section>
    </>
  );
}
