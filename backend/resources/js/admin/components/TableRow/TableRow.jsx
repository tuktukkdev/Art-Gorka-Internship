import "./TableRow.css";

export function TableRow({ name, text }) {
  return (
    <div className="table-row">
      <dt className="table-item-name">{name}</dt>
      <dd className="table-item-text">{text}</dd>
    </div>
  );
}
