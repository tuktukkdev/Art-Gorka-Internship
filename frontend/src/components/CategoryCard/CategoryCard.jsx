import { Link } from "react-router-dom";
import "./CategoryCard.css";

export function CategoryCard({ to, image, title }) {
  return (
    <Link to={to} className="category-card media-zoom">
      <img src={image} alt="" className="media-zoom__image" />
      <span className="category-card__title">{title}</span>
    </Link>
  );
}
