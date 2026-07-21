import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BusHero from "../../assets/hero-bus.svg";
import CitySelect from "../common/CitySelect";
import { useCities } from "../../hooks/useCities";
import "./Hero.css";

function Hero() {
  const navigate = useNavigate();
  const { data: cities = [] } = useCities();

  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const nextErrors = {};
    if (!source) nextErrors.source = "Select a departure city";
    if (!destination) nextErrors.destination = "Select a destination city";
    if (!date) nextErrors.date = "Select a travel date";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const params = new URLSearchParams({
      source: source.name,
      destination: destination.name,
      travel_date: date,
    });
    navigate(`/search?${params.toString()}`);
  };

  const errorList = Object.values(errors).filter(Boolean);

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

        <form className="search-box" onSubmit={handleSubmit} noValidate>
          <CitySelect
            id="from"
            label="From"
            cities={cities}
            value={source}
            onChange={(city) => {
              setSource(city);
              if (city) setErrors((prev) => ({ ...prev, source: null }));
            }}
            error={errors.source}
            hideErrorText
          />

          <div className="search-divider" aria-hidden="true" />

          <CitySelect
            id="to"
            label="To"
            cities={cities}
            value={destination}
            onChange={(city) => {
              setDestination(city);
              if (city) setErrors((prev) => ({ ...prev, destination: null }));
            }}
            error={errors.destination}
            hideErrorText
          />

          <div className="search-divider" aria-hidden="true" />

          <div
            className={`search-field search-field-date${errors.date ? " has-error" : ""}`}
          >
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                if (e.target.value)
                  setErrors((prev) => ({ ...prev, date: null }));
              }}
              min={new Date().toISOString().split("T")[0]}
              className={errors.date ? "input-error" : ""}
            />
          </div>

          <button type="submit" className="search-button">
            Search Buses
          </button>
        </form>

        {errorList.length > 0 && (
          <p className="search-error" role="alert">
            {errorList.join(" · ")}
          </p>
        )}
      </div>

      <div className="hero-image">
        <div className="hero-route-line" aria-hidden="true" />
        <img src={BusHero} alt="Bus Illustration" />
      </div>
    </section>
  );
}

export default Hero;
