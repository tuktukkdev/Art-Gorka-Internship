import "./BenefitItem.css";

export function BenefitItem({ text }) {
  return (
    <div className="benefit-item">
      <div className="benefit-item-text">{text}</div>
    </div>
  );
}
