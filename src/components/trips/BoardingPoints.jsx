import { MapPin } from "lucide-react";
import { formatTime } from "../../utils/formatTime";
import "./TripDetailPanels.css";

function BoardingPoints({ stops }) {
  return (
    <div className="detail-panel">
      <h3 className="detail-panel-title">Route & Stops</h3>
      <ul className="stop-list">
        {stops.map((stop, index) => (
          <li className="stop-item" key={stop.id}>
            <span className="stop-marker">
              <MapPin size={14} />
            </span>
            <span className="stop-city">
              {stop.city}
              {index === 0 && <span className="stop-tag">Boarding</span>}
              {index === stops.length - 1 && (
                <span className="stop-tag stop-tag-drop">Drop</span>
              )}
            </span>
            {stop.time && (
              <span className="stop-time">{formatTime(stop.time)}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BoardingPoints;
