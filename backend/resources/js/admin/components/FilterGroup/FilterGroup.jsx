import "./FilterGroup.css";

export function FilterGroup({ label, allLabel, options, value, onChange }) {
  const handleAllChange = () => {
    if (value.length > 0) onChange([]);
  };

  const handleOptionChange = (optionValue) => {
    const next = value.includes(optionValue)
      ? value.filter((item) => item !== optionValue)
      : [...value, optionValue];

    onChange(next);
  };

  return (
    <div className="filter-dropdown">
      <button type="button" className="filter-dropdown__toggle">
        <span className="filter-dropdown__label">{label}</span>
        <span className="filter-dropdown__arrow" aria-hidden="true"></span>
      </button>

      <div className="filter-dropdown__menu">
        <div className="filter-dropdown__panel">
          <label className="filter-dropdown__option">
            <input
              type="checkbox"
              className="filter-dropdown__checkbox"
              checked={value.length === 0}
              onChange={handleAllChange}
            />
            <span>{allLabel}</span>
          </label>

          {options.map((option) => (
            <label key={option.value} className="filter-dropdown__option">
              <input
                type="checkbox"
                className="filter-dropdown__checkbox"
                checked={value.includes(option.value)}
                onChange={() => handleOptionChange(option.value)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
