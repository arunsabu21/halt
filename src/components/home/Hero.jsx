import BusHero from "../../assets/hero-bus.svg";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="hero-eyebrow">Pan-India bus booking</span>

        <h1 className="hero-title">
          Travel Smarter,
          <br />
          Book <span className="hero-title-accent">Faster.</span>
        </h1>

        <p className="hero-subtitle">
          Search buses, compare prices, and book your journey across India in
          minutes.
        </p>

        <form className="search-box" onSubmit={(e) => e.preventDefault()}>
          <div className="search-field">
            <label htmlFor="from">From</label>
            <input id="from" type="text" placeholder="Enter city" />
          </div>

          <div className="search-divider" aria-hidden="true" />

          <div className="search-field">
            <label htmlFor="to">To</label>
            <input id="to" type="text" placeholder="Enter city" />
          </div>

          <div className="search-divider" aria-hidden="true" />

          <div className="search-field search-field-date">
            <label htmlFor="date">Date</label>
            <input id="date" type="date" />
          </div>

          <button type="submit" className="search-button">
            Search Buses
          </button>
        </form>
      </div>

      <div className="hero-image">
        <div className="hero-route-line" aria-hidden="true" />
        <img src={BusHero} alt="Bus Illustration" />
      </div>
    </section>
  );
}

export default Hero;
