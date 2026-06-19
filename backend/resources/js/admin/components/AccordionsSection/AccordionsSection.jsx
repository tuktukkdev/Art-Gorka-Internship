import { useState } from "react";
import { AccordionItem } from "../AccordionItem";
import { ACCORDION_ITEMS } from "../../constants/homeContent";
import "./AccordionsSection.css";

export function AccordionsSection() {
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleOpen = (index) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <section className="service-row">
      <h2 className="subtitle">Чем мы обычно занимаемся</h2>
      <div className="accordions">
        {ACCORDION_ITEMS.map(({ title, text }, index) => (
          <AccordionItem
            key={title}
            title={title}
            text={text}
            isOpen={openIndexes.includes(index)}
            onToggle={() => toggleOpen(index)}
          />
        ))}
      </div>
    </section>
  );
}
