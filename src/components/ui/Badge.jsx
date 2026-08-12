function Badge({ children, tone = "neutral", className = "" }) {
  return <span className={`ui-badge ui-badge--${tone} ${className}`}>{children}</span>;
}

export default Badge;
