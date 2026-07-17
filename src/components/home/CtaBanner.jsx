import { ArrowRight } from "lucide-react";
import "./CtaBanner.css";

function CtaBanner() {
  return (
    <section className="cta-banner">
      <div className="cta-route-line" aria-hidden="true" />

      <div className="cta-content">
        <h2 className="cta-title">Ready for your next journey?</h2>
        <p className="cta-subtitle">
          Join thousands of travellers who book smarter with Halt.
        </p>

        <button type="button" className="cta-button">
          Search Buses
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}

export default CtaBanner;
