import "./EmptyState.css";

function EmptyState({ image, imageAlt, title, message }) {
  return (
    <div className="empty-state">
      <img src={image} alt={imageAlt} className="empty-state-image" />
      <h2 className="empty-state-title">{title}</h2>
      <p className="empty-state-text">{message}</p>
    </div>
  );
}

export default EmptyState;
