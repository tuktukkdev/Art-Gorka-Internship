import { CategoryCard } from "../CategoryCard";
import "./Categories.css";
import categoryCardLandings from "../../assets/images/category_card_landings.jpg";
import categoryCardCorporative from "../../assets/images/category_card_corporative.jpg";

const categories = [
  {
    id: "landings",
    to: "/",
    image: categoryCardLandings,
    title: "Лендинги",
  },
  {
    id: "corporative",
    to: "/",
    image: categoryCardCorporative,
    title: "Корпоративные сайты",
  },
];

export function Categories() {
  return (
    <div className="categories">
      {categories.map(({ id, to, image, title }) => (
        <CategoryCard key={id} to={to} image={image} title={title} />
      ))}
    </div>
  );
}
