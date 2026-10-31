import Layout from "@/components/Layout";
import CTASection from "@/sections/CTASection";
import ContactSection from "@/sections/ContactSection";
import FAQSection from "@/sections/FAQSection";
import FarmerImpactSection from "@/sections/FarmerImpactSection";
import HeroSection from "@/sections/HeroSection";
import HowItWorksSection from "@/sections/HowItWorksSection";
import TrustSection from "@/sections/TrustSection";

// ─── Page ───────────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <Layout>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <HeroSection />

      {/* ── HOW IT WORKS + TECHNOLOGY BENEFITS + COMPARISON TABLE ────────── */}
      <HowItWorksSection />

      {/* ── ENVIRONMENTAL IMPACT + YIELD + CROPS ──────────── */}
      <FarmerImpactSection />

      {/* ── ABOUT KisanNova + TEAM (Trust Section) ───────────────────────────── */}
      <TrustSection />

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <FAQSection />

      {/* ── SECOND CTA ───────────────────────────────────────────────────── */}
      <CTASection />

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <ContactSection />
    </Layout>
  );
}
