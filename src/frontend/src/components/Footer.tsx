import { Leaf, Mail, MapPin, Phone } from "lucide-react";

const FOOTER_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Technology", href: "#technology" },
  { label: "Results", href: "#results" },
  { label: "About KisanNova", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-card border-t border-border" data-ocid="footer">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-semibold text-lg text-foreground">
                  Nova
                </span>
                <span className="text-[10px] text-muted-foreground font-body tracking-widest uppercase">
                  by KisanNova
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground font-body leading-relaxed max-w-xs">
              KisanNova is dedicated to empowering Indian farmers with innovative,
              sustainable agricultural solutions — ensuring a healthier planet
              for generations to come.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-widest text-muted-foreground mb-4">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    type="button"
                    className="text-sm text-muted-foreground hover:text-foreground transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                    data-ocid={`footer.${link.label.toLowerCase()}_link`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-widest text-muted-foreground mb-4">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-accent" />
                <span>contact@kisannova.in</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-accent" />
                <span>+91 96628-58459</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-accent" />
                <span>Ahmedabad, Gujarat, India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            © {year}
            {/* 
<a
  href={caffeineUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="underline underline-offset-2 hover:text-foreground transition-smooth"
>
  caffeine.ai
</a> 
*/}

          </p>
          <p className="text-xs text-muted-foreground">
            A KisanNova Initiative. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
