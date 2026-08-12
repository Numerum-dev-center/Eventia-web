function Button({ children, as: Component = "button", type = "button", onClick, variant = "primary", size = "lg", fullWidth = true, disabled = false, className = "", ...rest }) {
  const classes = `ui-button ui-button--${variant} ui-button--${size} ${fullWidth ? "ui-button--full" : ""} ${className}`;
  if (Component !== "button") return <Component className={classes} {...rest}>{children}</Component>;
  return <button type={type} onClick={onClick} disabled={disabled} className={classes} {...rest}>{children}</button>;
}

export default Button;
