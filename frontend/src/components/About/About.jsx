import { useRef } from "react";
import { Button } from "../Button";
import { StatItem } from "../StatItem";
import "./About.css";
import slider1 from "../../assets/images/slider-1.jpg";
import slider2 from "../../assets/images/slider-2.jpg";
import slider3 from "../../assets/images/slider-3.jpg";

const stats = [
  { id: "edits", value: "10 000+", label: "правок в дизайне внесено" },
  { id: "team", value: "15", label: "человек в команде" },
  { id: "years", value: "13", label: "лет в индустрии" },
  { id: "office", value: "150 м²", label: "площадь офиса" },
];

const sliderImages = [slider1, slider2, slider3];

export function About() {
  const sliderRef = useRef(null);
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0 });

  const handlePointerDown = (event) => {
    const slider = sliderRef.current;
    drag.current = {
      active: true,
      startX: event.pageX,
      scrollLeft: slider.scrollLeft,
    };
    slider.classList.add("about__slider--dragging");
  };

  const stopDragging = () => {
    drag.current.active = false;
    sliderRef.current?.classList.remove("about__slider--dragging");
  };

  const handlePointerMove = (event) => {
    if (!drag.current.active) return;
    event.preventDefault();
    const delta = event.pageX - drag.current.startX;
    sliderRef.current.scrollLeft = drag.current.scrollLeft - delta;
  };

  return (
    <section id="about" className="about">
      <div className="about__container">
        <div className="about__info">
          <h2 className="about__title title">Что-то про студию</h2>
          <p className="about__text text">
            Создаём эффективные веб-продукты и дизайн с 2011 года.
          </p>
          <p className="about__text text">
            Подход на стыке бизнеса, креатива и технологий, с акцентом на
            аналитику и юзабилити.
          </p>
        </div>
        <Button variant="secondary">Перейти на сайт студии</Button>
      </div>

      <div
        className="about__slider"
        ref={sliderRef}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      >
        {sliderImages.map((src) => (
          <img key={src} src={src} alt="" className="about__slider-item" />
        ))}
      </div>

      <div className="about__stats">
        {stats.map(({ id, value, label }) => (
          <StatItem key={id} value={value} label={label} />
        ))}
      </div>
    </section>
  );
}
