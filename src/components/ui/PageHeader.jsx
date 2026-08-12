function PageHeader({ title, subtitle, action, eyebrow = "Eventia" }) {
  return (
    <div className="ui-page-header">
      <div className="ui-page-header-copy">
        <span>{eyebrow}</span>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action && <div className="ui-page-header-action">{action}</div>}
    </div>
  );
}

export default PageHeader;
