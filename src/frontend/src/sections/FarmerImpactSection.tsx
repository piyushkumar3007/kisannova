import SectionHeader from "@/components/ui/SectionHeader";
import StatCard from "@/components/ui/StatCard";
import { FlaskConical, Leaf, Sprout, Waves, Wheat } from "lucide-react";
import { motion } from "motion/react";

// ─── Data ──────────────────────────────────────────────────────────────────

const ENV_METRICS = [
  {
    icon: <Waves className="w-5 h-5" />,
    value: "Sonic",
    label: "Sound-Based Technology",
    description:
      "Exploring how carefully designed sound-wave approaches may support future crop-protection methods.",
    ocid: "impact.env_stat.1",
  },
  {
    icon: <Sprout className="w-5 h-5" />,
    value: "Crop",
    label: "Farmer-Focused Design",
    description:
      "Designed around real agricultural challenges, crop needs, and practical use in farming environments.",
    ocid: "impact.env_stat.2",
  },
  {
    icon: <FlaskConical className="w-5 h-5" />,
    value: "Test",
    label: "Research Before Claims",
    description:
      "Performance should be evaluated through transparent testing across crops, pests, and field conditions.",
    ocid: "impact.env_stat.3",
  },
  {
    icon: <Leaf className="w-5 h-5" />,
    value: "Future",
    label: "Sustainability in Focus",
    description:
      "Working toward agricultural inAgriNovations that consider farmers, natural resources, and long-term sustainability.",
    ocid: "impact.env_stat.4",
  },
];

const YIELD_METRICS = [
  {
    icon: <Waves className="w-5 h-5" />,
    value: "Sound",
    label: "Sonic-Wave Exploration",
    description:
      "Exploring sound-based technology as a potential tool in modern crop-protection strategies.",
    ocid: "impact.yield_stat.1",
  },
  {
    icon: <Sprout className="w-5 h-5" />,
    value: "Field",
    label: "Real-World Conditions",
    description:
      "Crop type, pest pressure, climate, and field conditions all matter when evaluating agricultural technology.",
    ocid: "impact.yield_stat.2",
  },
  {
    icon: <FlaskConical className="w-5 h-5" />,
    value: "Evidence",
    label: "Measured Outcomes",
    description:
      "Yield, crop-loss, and cost benefits should be published only when supported by documented trials and transparent calculations.",
    ocid: "impact.yield_stat.3",
  },
];

const SUPPORTED_CROPS = [
  {
    icon: <Wheat className="w-6 h-6" />,
    name: "Wheat",
    seasons: "Rabi",
    ocid: "impact.crop.1",
  },
  {
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <title>Rice crop icon</title>
        <path d="M12 22V12" />
        <path d="M5 12c2.5-2 5-3 7-3s4.5 1 7 3" />
        <path d="M5 17c2.5-2 5-3 7-3s4.5 1 7 3" />
        <path d="M12 2c-1 2-2 4-2 6" />
        <path d="M12 2c1 2 2 4 2 6" />
      </svg>
    ),
    name: "Rice",
    seasons: "Kharif",
    ocid: "impact.crop.2",
  },
  {
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <title>Cotton crop icon</title>
        <path d="M12 22V10" />
        <path d="M5 10c1-4 4-6 7-6s6 2 7 6" />
        <path d="M9 22c0-4 1-8 3-10" />
        <path d="M15 22c0-4-1-8-3-10" />
      </svg>
    ),
    name: "Cotton",
    seasons: "Kharif",
    ocid: "impact.crop.3",
  },
  {
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <title>Vegetables crop icon</title>
        <circle cx="8" cy="14" r="4" />
        <circle cx="16" cy="10" r="3" />
        <path d="M8 10V4" />
        <path d="M16 7V3" />
      </svg>
    ),
    name: "Vegetables",
    seasons: "Year-round",
    ocid: "impact.crop.4",
  },
  {
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <title>Orchards crop icon</title>
        <circle cx="12" cy="9" r="5" />
        <path d="M12 14v8" />
        <path d="M8 18h8" />
        <path d="M7 7c-1-2-1-4 0-5" />
        <path d="M17 7c1-2 1-4 0-5" />
      </svg>
    ),
    name: "Orchards",
    seasons: "Perennial",
    ocid: "impact.crop.5",
  },
  {
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <title>Pulses crop icon</title>
        <ellipse cx="12" cy="13" rx="5" ry="3.5" />
        <path d="M12 9.5V4" />
        <path d="M8 11c-2-1.5-3-3-2.5-5" />
        <path d="M16 11c2-1.5 3-3 2.5-5" />
      </svg>
    ),
    name: "Pulses",
    seasons: "Rabi & Kharif",
    ocid: "impact.crop.6",
  },
];

// ─── Components ─────────────────────────────────────────────────────────────

function CropCard({
  crop,
  index,
}: {
  crop: (typeof SUPPORTED_CROPS)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="flex flex-col items-center gap-3 bg-card border border-border rounded-xl p-5 shadow-subtle hover:shadow-elevated hover:-translate-y-0.5 transition-smooth text-center"
      data-ocid={crop.ocid}
    >
      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
        {crop.icon}
      </div>
      <span className="font-display font-semibold text-sm text-foreground">
        {crop.name}
      </span>
      <span className="text-xs text-muted-foreground font-body">
        {crop.seasons}
      </span>
    </motion.div>
  );
}

// ─── Main Section ────────────────────────────────────────────────────────────

export default function FarmerImpactSection() {
  return (
    <>
      {/* ── ENVIRONMENTAL IMPACT ─────────────────────────────────────────── */}
      <section
        id="sustainability"
        className="py-24 bg-muted/30"
        data-ocid="impact.env_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader
              eyebrow="For Earth & Future Generations"
              title="Exploring a More Thoughtful Future for Agriculture"
              subtitle="KisanNova is exploring sonic-wave technology as a potential addition to modern crop-protection approaches, with responsible research at the centre of progress."
              align="center"
            />
          </motion.div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ENV_METRICS.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <StatCard
                  icon={metric.icon}
                  value={metric.value}
                  label={metric.label}
                  description={metric.description}
                  data-ocid={metric.ocid}
                />
              </motion.div>
            ))}
          </div>

          {/* Visual callout bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 bg-accent/10 border border-accent/20 rounded-xl px-6 py-5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
            data-ocid="impact.env_callout"
          >
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
              <Leaf className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="font-body font-semibold text-sm text-foreground">
                Innovation Guided by Research
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                We will share performance and environmental findings as they are
                validated through documented testing. We do not present unverified
                yield, safety, or cost figures as proven outcomes.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SONIC INAgriNovaTION ────────────────────────────────────────────── */}
      <section
        id="yield"
        className="py-24 bg-background"
        data-ocid="impact.yield_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6"
            >
              <SectionHeader
                eyebrow="Research-Led Progress"
                title="Smarter Farming Through Sonic Innovation"
                subtitle="Agriculture deserves new ideas backed by careful testing. KisanNova is exploring how sonic-wave technology could contribute to future crop-protection solutions."
                align="left"
              />

              <div
                className="bg-card border border-border rounded-xl p-6 shadow-subtle mt-2"
                data-ocid="impact.cost_comparison"
              >
                <p className="text-xs font-body font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                  Our Approach
                </p>
                <div className="flex flex-col gap-5">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center shrink-0 text-accent">
                      <Waves className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-body font-semibold text-foreground">Explore sonic-wave technology</p>
                      <p className="text-xs text-muted-foreground mt-1">Investigate sound-based approaches to agricultural challenges.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center shrink-0 text-accent">
                      <Sprout className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-body font-semibold text-foreground">Keep farmers at the centre</p>
                      <p className="text-xs text-muted-foreground mt-1">Consider crop needs, usability, and the realities of field conditions.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center shrink-0 text-accent">
                      <FlaskConical className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-body font-semibold text-foreground">Measure before making claims</p>
                      <p className="text-xs text-muted-foreground mt-1">Yield, pest-control, safety, and cost results need transparent validation.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="flex flex-col gap-5">
              {YIELD_METRICS.map((metric, i) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                >
                  <StatCard
                    icon={metric.icon}
                    value={metric.value}
                    label={metric.label}
                    description={metric.description}
                    data-ocid={metric.ocid}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SUPPORTED CROPS ──────────────────────────────────────────────── */}
      <section
        id="crops"
        className="py-24 bg-primary/5"
        data-ocid="impact.crops_section"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader
              eyebrow="Works Across India's Major Crops"
              title="Your Crop Is Protected"
              subtitle="KisanNova's sonic frequencies are calibrated for the pest profiles of India's most important crops — from paddy fields to orchards."
              align="center"
            />
          </motion.div>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {SUPPORTED_CROPS.map((crop, i) => (
              <CropCard key={crop.name} crop={crop} index={i} />
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 text-center text-sm text-muted-foreground font-body"
            data-ocid="impact.crops_footnote"
          >
            Don't see your crop?{" "}
            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-accent font-medium hover:underline transition-smooth"
            >
              Talk to our agronomists
            </button>{" "}
            — KisanNova has been piloted on 30+ crop varieties across India.
          </motion.p>
        </div>
      </section>


    </>
  );
}
