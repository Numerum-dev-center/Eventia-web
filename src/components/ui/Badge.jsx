const TONES = {
  neutral: "bg-blue-50 text-blue-600",
  ok: "bg-emerald-50 text-emerald-600",
  warn: "bg-amber-50 text-amber-700",
  danger: "bg-red-50 text-red-600",
  muted: "bg-gray-100 text-gray-500",
};

function Badge({ children, tone = "neutral", className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;
