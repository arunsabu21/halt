import { ShieldCheck, CreditCard, MapPin, Headphones } from "lucide-react";
import "./WhyChooseHalt.css";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified operators",
    description: "Every bus partner is vetted for safety and service quality.",
  },
  {
    icon: CreditCard,
    title: "Secure payments",
    description: "Bank-grade encryption on every transaction, every time.",
  },
  {
    icon: MapPin,
    title: "Live tracking",
    description: "Know exactly where your bus is, right up to boarding.",
  },
  {
    icon: Headphones,
    title: "24/7 support",
    description: "Real help whenever your journey needs it, day or night.",
  },
];

function WhyChooseHalt() {
  return (
    <section className="why-choose">
      <div className="why-choose-header">
        <span className="section-eyebrow">Why travel with us</span>
        <h2 className="section-title">Why Choose Halt</h2>
      </div>

      <div className="features-grid">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div className="feature-card" key={feature.title}>
              <div className="feature-icon">
                <Icon size={22} strokeWidth={2} />
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default WhyChooseHalt;
