import "./TripDetailPanels.css";

function CancellationPolicy() {
  return (
    <div className="detail-panel">
      <h3 className="detail-panel-title">Cancellation Policy</h3>
      <ul className="policy-list">
        <li>Free cancellation up to 24 hours before departure.</li>
        <li>50% refund if cancelled within 24 hours of departure.</li>
        <li>No refund if cancelled within 6 hours of departure.</li>
      </ul>
    </div>
  );
}

export default CancellationPolicy;
