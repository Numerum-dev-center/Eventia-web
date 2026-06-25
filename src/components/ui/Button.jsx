function Button({
  children,
  type = "button",
  onClick,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        w-full py-4 rounded-2xl
        bg-orange-500
        text-white
        font-semibold
        text-lg
        hover:opacity-90
        transition
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;