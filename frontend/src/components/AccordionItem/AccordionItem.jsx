import { useId } from "react";
import union from "../../assets/images/Union.svg";
import "./AccordionItem.css";

// Преобразует текст (каждый пункт списка с новой строки, без маркеров,
// уровень вложенности задаётся отступом в 2 пробела) в маркированный
// список с вложенными <ul><li> по числу уровней
function parseAccordionLines(text) {
  return text
    .split("\n")
    .filter((line) => line.trim())
    .map((line) => ({
      level: Math.floor(line.match(/^ */)[0].length / 2),
      text: line.trim(),
    }));
}

function buildAccordionTree(lines, level = 0, start = 0) {
  const nodes = [];
  let i = start;

  while (i < lines.length && lines[i].level === level) {
    const node = { text: lines[i].text, children: [] };
    i++;

    if (i < lines.length && lines[i].level > level) {
      const result = buildAccordionTree(lines, level + 1, i);
      node.children = result.nodes;
      i = result.next;
    }

    nodes.push(node);
  }

  return { nodes, next: i };
}

function AccordionListItems({ nodes }) {
  return (
    <ul className="accordion-text-list">
      {nodes.map((node, index) => (
        <li className="accordion-text-line" key={index}>
          {node.text}
          {node.children.length > 0 && (
            <AccordionListItems nodes={node.children} />
          )}
        </li>
      ))}
    </ul>
  );
}

function AccordionList({ text }) {
  const { nodes } = buildAccordionTree(parseAccordionLines(text));
  return <AccordionListItems nodes={nodes} />;
}

export function AccordionItem({ title, text, isOpen, onToggle }) {
  const panelId = useId();

  return (
    <div className={`accordion ${isOpen ? "open" : ""}`}>
      <h3>
        <button
          type="button"
          className="accordion-head"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
        >
          <span className={`accordion-name ${isOpen ? "active" : ""}`}>
            {title}
          </span>

          <span className={`icon-button ${isOpen ? "open" : ""}`} aria-hidden="true">
            <img src={union} alt="" className="icon-union" />
          </span>
        </button>
      </h3>

      <div id={panelId} className={`accordion-text ${isOpen ? "open" : ""}`}>
        <div className="accordion-text-inner">
          <AccordionList text={text} />
        </div>
      </div>
    </div>
  );
}
