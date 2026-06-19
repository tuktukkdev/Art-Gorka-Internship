import "./StatItem.css";

export function StatItem({ value, label }) {
  return (
    <div className="stat">
      <p className="stat__value">{value}</p>
      <p className="text">{label}</p>
    </div>
  );
}
