const VARIANTS = {
  welcome: "/mascot/evi-welcome.png",
  analytics: "/mascot/evi-analytics.png",
  success: "/mascot/evi-success.png",
  help: "/mascot/evi-help.png",
  security: "/mascot/evi-security.png",
};

function EviMascot({ variant = "welcome", className = "", alt = "Evi, la mascotte Eventia" }) {
  return <img className={`evi-mascot ${className}`} src={VARIANTS[variant] || VARIANTS.welcome} alt={alt} loading="lazy" decoding="async" />;
}

export default EviMascot;
