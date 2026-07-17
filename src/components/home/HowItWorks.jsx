import { Search, Armchair, Ticket } from "lucide-react";
import "./HowItWorks.css";

const steps = [
  {
    icon: Search,
    title: "Search your route",
    description:
      "Enter your from, to, and travel date to see all available buses.",
  },
  {
    icon: Armchair,
    title: "Pick your seat",
    description:
      "Compare operators, timings, and fares, then choose the seat you want.",
  },
  {
    icon: Ticket,
    title: "Book and go",
    description:
      "Pay securely and get your ticket instantly, no counter queues.",
  },
];

function HowItWorks() {
  return (
    <section className="how-it-works">
      <div className="how-it-works-header">
        <span className="section-eyebrow">Booking in three steps</span>
        <h2 className="section-title">How It Works</h2>
      </div>

      <div className="steps-track">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div className="step" key={step.title}>
              <div className="step-marker">
                <div className="step-icon">
                  <Icon size={22} strokeWidth={2} />
                </div>
                <span className="step-number">{`0${index + 1}`}</span>
              </div>

              {index < steps.length - 1 && (
                <div className="step-connector" aria-hidden="true" />
              )}

              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default HowItWorks;
