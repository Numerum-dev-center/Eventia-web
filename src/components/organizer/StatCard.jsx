function StatCard({ title, value, icon, active, onMouseEnter }) {
  return (
    <article onMouseEnter={onMouseEnter} className={`db-stat-card ${active ? "is-active" : ""}`}>
      <div className="db-stat-copy"><span>{title}</span><strong>{value}</strong><small>Mis à jour en temps réel</small></div>
      <div className="db-stat-icon">{icon}</div>
    </article>
  );
}

export default StatCard;
