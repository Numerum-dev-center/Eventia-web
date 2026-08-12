function Card({ children, className = "", padding = "p-6" }) {
  return <div className={`ui-card ${padding} ${className}`}>{children}</div>;
}

export default Card;
