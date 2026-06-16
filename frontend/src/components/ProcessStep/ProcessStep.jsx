import "./ProcessStep.css";

export function ProcessStep({ number, title, description }) {
  return (
    <div className="step-item">
      <div className="step-item-number">{number}</div>
      <div className="step-info">
        <h3 className="step-title">{title}</h3>
        <div className="step-description">
          {description.map((paragraph, index) =>
            typeof paragraph === "string" ? (
              <p key={index}>{paragraph}</p>
            ) : (
              <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.html }} />
            )
          )}
        </div>
      </div>
    </div>
  );
}
