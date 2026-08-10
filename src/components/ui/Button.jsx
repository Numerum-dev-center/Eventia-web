const VARIANTS = {
  primary: "bg-orange-500 text-white hover:bg-orange-600 disabled:bg-orange-300",
  outline:
    "border border-gray-300 text-gray-700 hover:border-orange-400 hover:text-orange-600 bg-white disabled:opacity-50",
  ghost: "text-gray-600 hover:bg-gray-100 disabled:opacity-50",
  danger: "bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300",
};

const SIZES = {
  sm: "px-3 py-2 text-sm",
  md: "px-5 py-3.5 text-base",
  lg: "px-6 py-4 text-lg",
};

function Button({
  children,
  as: Component = "button",
  type = "button",
  onClick,
  variant = "primary",
  size = "lg",
  fullWidth = true,
  disabled = false,
  className = "",
  ...rest
}) {
  const classes = `
    ${fullWidth ? "w-full" : ""}
    inline-flex items-center justify-center gap-2
    rounded-2xl font-semibold
    transition disabled:cursor-not-allowed
    ${VARIANTS[variant]}
    ${SIZES[size]}
    ${className}
  `;

  if (Component !== "button") {
    return (
      <Component className={classes} {...rest}>
        {children}
      </Component>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} {...rest}>
      {children}
    </button>
  );
}

export default Button;
