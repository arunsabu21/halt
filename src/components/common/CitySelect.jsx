import { useState, useMemo } from "react";
import "./CitySelect.css";

function CitySelect({
  id,
  label,
  cities,
  value,
  onChange,
  error,
  hideErrorText,
}) {
  const [query, setQuery] = useState(value?.name || "");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    if (!query) return [];
    return cities
      .filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 6);
  }, [query, cities]);

  const handleSelect = (city) => {
    onChange(city);
    setQuery(city.name);
    setOpen(false);
  };

  return (
    <div className={`city-select${error ? " has-error" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="text"
        placeholder="Enter city"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          if (value) onChange(null);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 100)}
        autoComplete="off"
        aria-invalid={Boolean(error)}
        className={error ? "input-error" : ""}
      />
      {open && query && (
        <ul className="city-dropdown">
          {filtered.length > 0 ? (
            filtered.map((city) => (
              <li key={city.id} onMouseDown={() => handleSelect(city)}>
                {city.name}
              </li>
            ))
          ) : (
            <li className="city-dropdown-empty">No cities found</li>
          )}
        </ul>
      )}
      {error && !hideErrorText && <span className="field-error">{error}</span>}
    </div>
  );
}

export default CitySelect;
