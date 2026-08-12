function Input({ id, name, type = "text", placeholder, value, checked, onChange, autoComplete, icon: Icon, disabled = false, error, className = "" }) {
  if (type === "checkbox") return <input id={id} name={name} type="checkbox" checked={checked} onChange={onChange} disabled={disabled} className={`ui-checkbox ${className}`} />;
  return (
    <div className="ui-input-shell">
      <div className="ui-input-wrap">
        {Icon && <Icon size={17} className="ui-input-icon" />}
        <input id={id} name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} autoComplete={autoComplete} disabled={disabled} className={`ui-input ${Icon ? "has-icon" : ""} ${error ? "has-error" : ""} ${className}`} />
      </div>
      {error && <p className="ui-input-error">{error}</p>}
    </div>
  );
}

export default Input;
