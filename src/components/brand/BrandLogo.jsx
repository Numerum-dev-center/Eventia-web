function BrandLogo({ className = "", iconOnly = false, alt = "Eventia" }) {
  return (
    <span className={`eventia-logo ${iconOnly ? "eventia-logo--icon" : ""} ${className}`}>
      <img src="/eventia-logo.svg" alt={alt} />
    </span>
  );
}

export default BrandLogo;
