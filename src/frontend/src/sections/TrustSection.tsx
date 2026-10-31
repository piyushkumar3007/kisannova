import SectionHeader from "@/components/ui/SectionHeader";
import {
  Award,
  FlaskConical,
  GraduationCap,
  Handshake,
  Leaf,
  Shield,
  Sprout,
  Users,
  Waves,
} from "lucide-react";
import { motion } from "motion/react";

// ─── Data ──────────────────────────────────────────────────────────────────
const CREDENTIALS = [
  /*
  {
    icon: <GraduationCap className="w-5 h-5" />,
    title: "IIT Research Backed",
    body: "Our sonic wave technology is developed in collaboration with agricultural scientists at IIT Bombay and IIT Roorkee, validated across 3 years of field trials.",
  },
  {
    icon: <FlaskConical className="w-5 h-5" />,
    title: "Peer-Reviewed Science",
    body: "AgriNova's bio-acoustic pest disruption method is documented in the Indian Journal of Agricultural Sciences and the Journal of Pest Management.",
  },
  {
    icon: <Award className="w-5 h-5" />,
    title: "Ministry of Agriculture Recognition",
    body: "Recognized under the Government of India's AgriStar InAgriNovation Program as one of the top 10 sustainable agriculture startups in 2023.",
  },
  {
    icon: <Handshake className="w-5 h-5" />,
    title: "State Agricultural Partnerships",
    body: "Formally partnered with Krishi Vigyan Kendras in Gujarat, Punjab, and Tamil Nadu for farmer training and on-ground deployment support.",
  },
  */
];

const TEAM_MEMBERS = [
  {
    name: "Piyush Kumar",
    role: "Team Lead & Project Architect",
    bio: "Leads the AgriNova initiative end-to-end — from concept to deployment. Coordinates research, engineering, and farmer outreach to bring the sonic drone vision to life.",
    initials: "PK",
    color: "bg-primary/20 text-primary",
  },
  {
    name: "Harshil Kiri",
    role: "Drone Systems Engineer",
    bio: "Designs and integrates the drone hardware powering AgriNova. Specialises in flight control, payload optimisation, and field-ready ruggedisation for Indian farm conditions.",
    initials: "HK",
    color: "bg-accent/20 text-accent",
  },
  {
    name: "Dhruv Lad",
    role: "Embedded Software Developer",
    bio: "Builds the firmware and signal-processing stack that drives AgriNova's sonic wave emission. Ensures precise frequency control and real-time adaptive response to pest patterns.",
    initials: "DL",
    color: "bg-secondary-foreground/10 text-foreground",
  },
  {
    name: "Riya Shrimali",
    role: "Agricultural Scientist",
    bio: "Bridges agronomy and technology — mapping crop-specific pest behaviour to tailor sonic protocols for wheat, rice, cotton, and horticulture across diverse Indian agro-climatic zones.",
    initials: "RS",
    color: "bg-accent/30 text-accent",
  },
  {
    name: "Nishtha Vaniya",
    role: "Research & Sustainability Analyst",
    bio: "Tracks field trial data, environmental impact metrics, and soil health outcomes. Ensures AgriNova's approach remains evidence-backed and aligned with sustainable farming goals.",
    initials: "NV",
    color: "bg-primary/30 text-primary",
  },
];

const MISSION_POINTS = [
  {
    icon: <Leaf className="w-5 h-5" />,
    label: "Zero chemical input farming",
  },
  {
    icon: <Sprout className="w-5 h-5" />,
    label: "Revived soil ecosystems",
  },
  {
    icon: <Users className="w-5 h-5" />,
    label: "Healthier farming families",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    label: "Food free of pesticide residue",
  },
];

// ─── Component ─────────────────────────────────────────────────────────────
export default function TrustSection() {
  return (
    <>
      {/* ── MISSION & ABOUT ───────────────────────────────────────────────── */}
      <section
        id="about"
        className="py-24 bg-muted/30"
        data-ocid="about.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Mission text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6"
            >
              <SectionHeader
                eyebrow="Team KisanNova"
                title="Advancing Agriculture with Sonic Wave Technology."
                align="left"
              />
              <p className="text-base text-muted-foreground font-body leading-relaxed">
                At Team KisanNova, we are exploring how emerging technology can help
                farmers protect crops with smarter, more sustainable tools. KisanNova
                brings a sonic-wave approach to pest management, designed to
                complement practical, field-focused farming methods.
              </p>
              <p className="text-base text-muted-foreground font-body leading-relaxed">
                Our vision is to combine engineering, agricultural insight, and
                responsible innovation to help farmers make informed choices.
                The concept centres on targeted sound-wave emission and a future
                where technology supports healthier, more resilient farms.
              </p>

              {/* Animated sonic-wave technology visual */}
              <div className="relative my-2 flex min-h-40 items-center justify-center overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-r from-accent/5 via-card to-primary/5">
                <div className="relative flex h-36 w-36 items-center justify-center" aria-label="Animated sonic wave illustration">
                  {[0, 1, 2, 3].map((ring) => (
                    <motion.span
                      key={ring}
                      aria-hidden="true"
                      className="absolute rounded-full border border-accent/50"
                      style={{ width: 44 + ring * 28, height: 44 + ring * 28 }}
                      animate={{ scale: [0.82, 1.12, 0.82], opacity: [0.2, 0.75, 0.2] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: ring * 0.42 }}
                    />
                  ))}
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-elevated">
                    <Waves className="h-6 w-6" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-4 right-4 text-center text-xs font-medium tracking-wide text-muted-foreground">
                  Sonic waves · Smart engineering · Sustainable farming
                </div>
              </div>

              {/* Mission points */}
              <div className="grid grid-cols-2 gap-4 mt-2">
                {MISSION_POINTS.map((point, i) => (
                  <motion.div
                    key={point.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex items-center gap-3"
                    data-ocid={`about.mission_point.${i + 1}`}
                  >
                    <div className="w-8 h-8 rounded-md bg-accent/10 flex items-center justify-center text-accent shrink-0">
                      {point.icon}
                    </div>
                    <span className="text-sm font-body text-foreground font-medium">
                      {point.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Credentials grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {CREDENTIALS.map((cred, i) => (
              
                <motion.div
                  key={cred.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-card border border-border rounded-xl p-5 shadow-subtle hover:shadow-elevated transition-smooth flex flex-col gap-3"
                  data-ocid={`about.credential.${i + 1}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    {cred.icon}
                  </div>
                  <h3 className="font-display font-semibold text-sm text-foreground">
                    {cred.title}
                  </h3>
                  <p className="text-xs text-muted-foreground font-body leading-relaxed">
                    {cred.body}
                  </p>
                </motion.div>
              
              ))}
            
            </div>
          </div>
        </div>
      </section>
      

      {/* ── TEAM ──────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-background" data-ocid="team.section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader
              eyebrow="The People Behind KisanNova"
              title="Team KisanNova"
              subtitle="Our team bridges the gap between cutting-edge acoustic biology and the everyday realities of farming in India."
            />
          </motion.div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {TEAM_MEMBERS.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="bg-card border border-border rounded-xl p-6 shadow-subtle hover:shadow-elevated transition-smooth flex flex-col gap-4"
                data-ocid={`team.member.${i + 1}`}
              >
                {/* Avatar */}
                <div
                  className={`w-14 h-14 rounded-full ${member.color} flex items-center justify-center font-display font-semibold text-lg`}
                >
                  {member.initials}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-base text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-xs text-accent font-body font-medium mt-0.5">
                    {member.role}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
