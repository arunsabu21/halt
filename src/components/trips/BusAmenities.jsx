import { Check } from "lucide-react";
import "./TripDetailPanels.css";

function BusAmenities({ amenities, busType }) {
  return (
    <div className="detail-panel">
      <h3 className="detail-panel-title">Bus Features</h3>
      <span className="bus-type-badge">{busType.replace(/_/g, " ")}</span>

      {amenities.length > 0 ? (
        <ul className="amenity-list">
          {amenities.map((amenity) => (
            <li className="amenity-item" key={amenity}>
              <Check size={14} /> {amenity}
            </li>
          ))}
        </ul>
      ) : (
        <p className="detail-panel-empty">No amenities listed for this bus.</p>
      )}
    </div>
  );
}

export default BusAmenities;
