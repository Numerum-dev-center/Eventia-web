import EviMascot from "../brand/EviMascot";

function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="ui-empty">
      <EviMascot variant="help" className="ui-empty-mascot" alt="Evi vous aide à poursuivre" />
      {Icon && <div className="ui-empty-icon"><Icon size={24} /></div>}
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {action && <div className="ui-empty-action">{action}</div>}
    </div>
  );
}

export default EmptyState;
