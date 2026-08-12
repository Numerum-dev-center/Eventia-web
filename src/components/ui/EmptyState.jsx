function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="ui-empty">
      {Icon && <div className="ui-empty-icon"><Icon size={24} /></div>}
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {action && <div className="ui-empty-action">{action}</div>}
    </div>
  );
}

export default EmptyState;
