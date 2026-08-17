function Skeleton({
  width = "100%",
  height = "1rem",
  className = "",
  children,
  style = {},
}) {
  return (
    <span
      className={`evi-skeleton ${className}`}
      style={{ width, height, ...style }}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

export default Skeleton;
