import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import "./Header.css";
import logo from "../../assets/images/logo.svg";

const navItems = ["Студия", "Проекты", "Услуги", "Контакты"];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header${isScrolled ? " header--scrolled" : ""}`}>
      <div className="container header__inner">
        <div className="left-side">
          <Link to="/" className="logo" aria-label="На главную">
            <img src={logo} alt="Логотип" className="logo_image" />
          </Link>

          <nav className="nav_list" aria-label="Основная навигация">
            {navItems.map((label) => (
              <a key={label} href="#" className="nav_item">
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div className="right-side">
          <a href="tel:88002228684" className="phone_link">
            8 800 222 86 84
          </a>
          <Button variant="secondary">Обсудить проект</Button>
        </div>
      </div>
    </header>
  );
}
