import SectionHeader from "@/components/ui/SectionHeader";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";

// ─── Data ──────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: "How safe are sonic waves for my crops and plants?",
    a: "Completely safe. KisanNova's sonic frequencies are calibrated specifically to disrupt the nervous systems of crop-pest insects — like stem borers, aphids, and whiteflies. Plants, soil microbes, earthworms, birds, mammals, and beneficial insects like bees are entirely unaffected. Over 3 years of field trials across Indian farms showed zero adverse effects on plant health or biodiversity.",
  },
  {
    q: "Does it work at night or during cloudy weather?",
    a: "Yes, KisanNova works round the clock. The device has a built-in high-capacity rechargeable battery that stores solar energy during the day. It continues operating through the night and during overcast days for up to 72 hours without direct sunlight. Pest insects are active at all hours — and so is KisanNova.",
  },
  {
    q: "What crops is KisanNova suitable for?",
    a: "KisanNova has been tested and validated on a wide range of crops including rice/paddy, wheat, cotton, sugarcane, maize, soybean, tomato, chilli, brinjal, okra, and most fruit orchards. Our agronomy team works with you to configure the right frequency profiles for your specific crop and primary pest challenge.",
  },
  {
    q: "What is the battery life and how often do I need to charge it?",
    a: "The built-in lithium solar battery provides 72 hours of continuous operation on a single full charge. Under normal Indian sunlight conditions (5–6 hours of direct sun per day), the solar panel keeps the battery topped up indefinitely. No manual charging is required during normal use — just install and leave it.",
  },
  {
    q: "Is KisanNova approved by the government or any agricultural body?",
    a: "Yes. KisanNova has received clearance from the Central Insecticides Board & Registration Committee (CIBRC) as a non-chemical pest management device. We are also recognized under the Government of India's AgriStar InAgriNovation Program and are deployed through Krishi Vigyan Kendras in Gujarat, Punjab, and Tamil Nadu as part of state-supported sustainable farming initiatives.",
  },
  {
    q: "How do I get started? Is the setup complicated?",
    a: "Getting started is simple. Our team will visit your farm for a free assessment, recommend the number of units needed for your land size, and install everything for you. Setup takes less than 30 minutes for a standard 5-acre field. We also provide a full orientation so you know exactly what to expect. Most farmers are up and running — and seeing early results — within their first week.",
  },
];

// ─── FAQ Item Component ─────────────────────────────────────────────────────
function FaqItem({
  item,
  index,
}: {
  item: (typeof FAQ_ITEMS)[0];
  index: number;
}) {
  return (
    <details
      className="group border border-border rounded-xl overflow-hidden bg-card hover:border-primary/30 transition-smooth"
      data-ocid={`faq.item.${index + 1}`}
    >
      <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-body font-medium text-foreground hover:bg-muted/40 transition-smooth">
        <span className="text-base">{item.q}</span>
        <ChevronDown className="w-5 h-5 shrink-0 text-muted-foreground group-open:rotate-180 transition-smooth" />
      </summary>
      <div className="px-6 pb-6 pt-2 text-sm text-muted-foreground font-body leading-relaxed border-t border-border/60 bg-muted/20">
        {item.a}
      </div>
    </details>
  );
}

// ─── Component ─────────────────────────────────────────────────────────────
export default function FAQSection() {
  return (
    <section id="faq" className="py-24 bg-background" data-ocid="faq.section">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            eyebrow="Common Questions"
            title="Answers for Farmers, From Farmers"
            subtitle="We hear these questions on every farm visit. Here are straight answers — no jargon, no sales pitch."
          />
        </motion.div>

        <div className="mt-12 flex flex-col gap-3">
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <FaqItem item={item} index={i} />
            </motion.div>
          ))}
        </div>

        {/* Still have questions prompt */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 text-center bg-muted/30 border border-border/60 rounded-xl px-6 py-6"
          data-ocid="faq.still_have_questions"
        >
          <p className="text-sm font-body font-medium text-foreground mb-1">
            Still have questions?
          </p>
          <p className="text-sm text-muted-foreground font-body">
            Call us on{" "}
            <a
              href="tel:+919876543210"
              className="text-accent font-semibold hover:underline transition-smooth"
              data-ocid="faq.phone_link"
            >
              +91 96628-58459
            </a>{" "}
            or write to{" "}
            <a
              href="mailto:hello@kisannova.in"
              className="text-accent font-semibold hover:underline transition-smooth"
              data-ocid="faq.email_link"
            >
              contact@kisannova.in
            </a>
            . Our agronomy team responds within 24 hours.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
