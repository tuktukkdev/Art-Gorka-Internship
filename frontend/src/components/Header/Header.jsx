import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../Button";
import { useModal } from "../../context/ModalContext";
import "./Header.css";
import logo from "../../assets/images/logo.svg";
import BurgerIcon from "../../assets/images/burger_menu_button.svg?react";
import CloseIcon from "../../assets/images/close-btn.svg?react";

const navItems = [
  { label: "Студия", to: "/#about" },
  { label: "Проекты", to: "/#projects" },
  { label: "Услуги", to: "/#service" },
  { label: "Контакты", to: "/#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openModal } = useModal();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const closeMenu = () => setIsMenuOpen(false);

  const handleNavClick = (e, to) => {
    const id = to.split("#")[1];
    if (location.pathname === "/" && id) {
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
        window.history.replaceState(null, "", `#${id}`);
        closeMenu();
      }
    }
  };

  const handleLogoClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.replaceState(null, "", "/");
      closeMenu();
    }
  };

  return (
    <header className={`header${isScrolled ? " header--scrolled" : ""}${isMenuOpen ? " header--menu-open" : ""}`}>
      <div className="container header__inner">
        <div className="left-side">
          <Link to="/" className="logo" aria-label="На главную" onClick={handleLogoClick}>
            <img src={logo} alt="Логотип" className="logo_image" />
          </Link>

          <nav className="nav_list" aria-label="Основная навигация">
            {navItems.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className="nav_item"
                onClick={(e) => handleNavClick(e, to)}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="right-side">
          <a href="tel:88002228684" className="phone_link">
            8 800 222 86 84
          </a>
          <Button variant="secondary" className="header__cta" onClick={openModal}>
            Обсудить проект
          </Button>
        </div>

        <div className="burger-group">
          {isMenuOpen && (
            <button
              className="burger-btn burger-btn--close"
              onClick={closeMenu}
              aria-label="Закрыть меню"
            >
              <CloseIcon className="burger-btn__icon burger-btn__icon--close" />
            </button>
          )}
          <button
            className="burger-btn"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            <BurgerIcon className="burger-btn__icon" />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu">
          <div className="container mobile-menu__inner">
            <nav className="mobile-menu__nav">
              {navItems.map(({ label, to }) => (
                <Link
                  key={label}
                  to={to}
                  className="mobile-menu__link"
                  onClick={(e) => handleNavClick(e, to)}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="mobile-menu__bottom">
              <a href="tel:88002228684" className="mobile-menu__phone">
                8 800 222 86 84
              </a>
              <Button
                variant="secondary"
                className="mobile-menu__cta"
                onClick={() => { openModal(); closeMenu(); }}
              >
                Обсудить проект
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
