import SectionHeader from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────
interface FormState {
  name: string;
  farmSize: string;
  cropType: string;
  state: string;
  message: string;
}

const INITIAL_FORM: FormState = {
  name: "",
  farmSize: "",
  cropType: "",
  state: "",
  message: "",
};

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Other",
];

const CROP_OPTIONS = [
  "Rice / Paddy",
  "Wheat",
  "Cotton",
  "Sugarcane",
  "Maize / Corn",
  "Soybean",
  "Vegetables (tomato, chilli, brinjal)",
  "Fruit Orchard",
  "Pulses / Lentils",
  "Groundnut",
  "Other",
];

const FARM_SIZE_OPTIONS = [
  "Less than 2 acres",
  "2 – 5 acres",
  "5 – 10 acres",
  "10 – 25 acres",
  "More than 25 acres",
];

const CONTACT_DETAILS = [
  {
    icon: <Phone className="w-5 h-5" />,
    label: "Farmer Helpline",
    value: "+91 96628-58459",
    href: "tel:+919876543210",
    ocid: "contact.phone_link",
  },
  {
    icon: <Mail className="w-5 h-5" />,
    label: "Email Us",
    value: "contact@kisannova.in",
    href: "mailto:hello@kisannova.in",
    ocid: "contact.email_link",
  },
  {
    icon: <MessageCircle className="w-5 h-5" />,
    label: "WhatsApp",
    value: "+91 96628-58459",
    href: "https://wa.me/919662858459",
    ocid: "contact.whatsapp_link",
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: "Head Office",
    value: "Ahmedabad, Gujarat, India",
    href: undefined,
    ocid: "contact.address",
  },
];

// ─── Component ─────────────────────────────────────────────────────────────
export default function ContactSection() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const inputClass =
    "w-full px-4 py-3 text-sm font-body bg-background border border-input rounded-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-smooth";

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm(INITIAL_FORM);
  };

  return (
    <section
      id="contact"
      className="py-24 bg-muted/30"
      data-ocid="contact.section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            eyebrow="Get in Touch"
            title="Let's Talk About Your Farm"
            subtitle="Fill in a few details and our agronomy team will reach out within 24 hours to schedule your free farm visit."
          />
        </motion.div>

        <div className="mt-14 grid lg:grid-cols-5 gap-12 items-start">
          {/* Contact details sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4">
              {CONTACT_DETAILS.map((detail) => (
                <div
                  key={detail.label}
                  className="flex items-start gap-4"
                  data-ocid={detail.ocid}
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    {detail.icon}
                  </div>
                  <div>
                    <p className="text-xs font-body font-semibold uppercase tracking-widest text-muted-foreground">
                      {detail.label}
                    </p>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        target={
                          detail.href.startsWith("https") ? "_blank" : undefined
                        }
                        rel="noopener noreferrer"
                        className="text-sm font-body text-foreground font-medium hover:text-accent transition-smooth"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <p className="text-sm font-body text-foreground font-medium">
                        {detail.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Guarantee badge */}
            <div className="bg-card border border-border rounded-xl p-5 shadow-subtle mt-4">
              <p className="text-sm font-display font-semibold text-foreground mb-2">
                Our Promise to You
              </p>
              <ul className="flex flex-col gap-2">
                {[
                  "Free farm visit, no obligation",
                  "Response within 24 hours",
                  "Full-season satisfaction guarantee",
                  "Transparent pricing, no hidden costs",
                ].map((promise) => (
                  <li
                    key={promise}
                    className="flex items-center gap-2 text-xs font-body text-muted-foreground"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    {promise}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div
                className="bg-card border border-border rounded-xl p-10 shadow-elevated text-center flex flex-col items-center gap-5"
                data-ocid="contact.success_state"
              >
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                  <Mail className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-xl text-foreground">
                  Request Received!
                </h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed max-w-xs">
                  Our agronomy team will review your details and reach out
                  within 24 hours to schedule your free farm visit.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSubmitted(false)}
                  className="mt-2 font-body font-medium transition-smooth"
                  data-ocid="contact.submit_another_button"
                >
                  Submit Another Request
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-card border border-border rounded-xl p-8 shadow-elevated flex flex-col gap-5"
                data-ocid="contact.form"
              >
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-name"
                    className="text-sm font-body font-medium text-foreground"
                  >
                    Your Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Ramesh Patel"
                    className={inputClass}
                    data-ocid="contact.name_input"
                  />
                </div>

                {/* Farm Size + Crop Type */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-farmSize"
                      className="text-sm font-body font-medium text-foreground"
                    >
                      Farm Size <span className="text-destructive">*</span>
                    </label>
                    <select
                      id="contact-farmSize"
                      name="farmSize"
                      required
                      value={form.farmSize}
                      onChange={handleChange}
                      className={inputClass}
                      data-ocid="contact.farm_size_select"
                    >
                      <option value="">Select farm size</option>
                      {FARM_SIZE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-cropType"
                      className="text-sm font-body font-medium text-foreground"
                    >
                      Primary Crop <span className="text-destructive">*</span>
                    </label>
                    <select
                      id="contact-cropType"
                      name="cropType"
                      required
                      value={form.cropType}
                      onChange={handleChange}
                      className={inputClass}
                      data-ocid="contact.crop_type_select"
                    >
                      <option value="">Select crop type</option>
                      {CROP_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* State */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-state"
                    className="text-sm font-body font-medium text-foreground"
                  >
                    State <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="contact-state"
                    name="state"
                    required
                    value={form.state}
                    onChange={handleChange}
                    className={inputClass}
                    data-ocid="contact.state_select"
                  >
                    <option value="">Select your state</option>
                    {INDIAN_STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-message"
                    className="text-sm font-body font-medium text-foreground"
                  >
                    Tell Us About Your Pest Challenge{" "}
                    <span className="text-muted-foreground font-normal">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Which insects are damaging your crops? Which season is worst? Any past chemical use you'd like to move away from?"
                    className={`${inputClass} resize-none`}
                    data-ocid="contact.message_textarea"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full font-body font-semibold transition-smooth mt-1"
                  data-ocid="contact.submit_button"
                >
                  Request Free Demo Visit
                </Button>
                <p className="text-xs text-muted-foreground text-center font-body">
                  We'll reach out within 24 hours. No sales pressure, ever.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
