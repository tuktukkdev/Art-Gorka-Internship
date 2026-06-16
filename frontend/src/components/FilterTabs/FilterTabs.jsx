import "./FilterTabs.css";

export function FilterTabs({ allLabel, options, value, onChange }) {
  return (
    <div className="filter-tabs">
      <button
        type="button"
        className={`filter-tabs__item ${value === "" ? "active" : ""}`}
        onClick={() => onChange("")}
      >
        {allLabel}
      </button>

      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`filter-tabs__item ${value === option.value ? "active" : ""}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
