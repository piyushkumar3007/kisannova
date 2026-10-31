import { Button } from "@/components/ui/button";
import { ArrowRight, PhoneCall, Sprout } from "lucide-react";
import { motion } from "motion/react";

// ─── Component ─────────────────────────────────────────────────────────────
export default function CTASection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="py-24 bg-primary relative overflow-hidden"
      data-ocid="cta.section"
    >
      {/* Decorative sonic rings */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className="absolute rounded-full border border-primary-foreground/10 sonic-ripple"
            style={{
              width: `${i * 180}px`,
              height: `${i * 180}px`,
              top: `${-(i * 90)}px`,
              left: `${-(i * 90)}px`,
              animationDelay: `${i * 0.35}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-8">
        {/* Icon badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-16 h-16 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 flex items-center justify-center"
        >
          <Sprout className="w-8 h-8 text-primary-foreground" />
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col items-center gap-4"
        >
          <span className="text-xs font-body font-semibold uppercase tracking-widest text-primary-foreground/70">
            Let’s Explore What’s Possible
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary-foreground leading-tight max-w-3xl">
            Curious About the Future of Crop Protection?
          </h2>
          <p className="text-base text-primary-foreground/80 font-body leading-relaxed max-w-xl">
            Connect with Team KisanNova to learn about our sonic-wave concept,
            our development approach, and the questions we are working to validate.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-col sm:flex-row gap-4 w-full justify-center"
        >
          <Button
            size="lg"
            onClick={() => scrollTo("contact")}
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-body font-semibold shadow-elevated transition-smooth group"
            data-ocid="cta.request_demo_button"
          >
            Request a Demo
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-smooth" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollTo("contact")}
            className="border-primary-foreground/40 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 font-body font-semibold transition-smooth"
            data-ocid="cta.get_pricing_button"
          >
            <PhoneCall className="w-4 h-4 mr-2" />
            Get Pricing
          </Button>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xs text-primary-foreground/60 font-body"
        >
          Free farm visit · No pressure · Full-season satisfaction guarantee
        </motion.p>
      </div>
    </section>
  );
}
