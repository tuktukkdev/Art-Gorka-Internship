import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import { FilterTabs } from "../FilterTabs";
import { ProjectCard } from "../ProjectCard";
import { useProjects } from "../../hooks/useProjects";
import "./ProjectsSection.css";

export function ProjectsSection() {
  const [service, setService] = useState("");
  const { projects } = useProjects({});

  const stackOptions = useMemo(() => {
    const unique = [...new Set(projects.flatMap((p) => p.stack ?? []))];
    return unique.map((s) => ({ value: s, label: s }));
  }, [projects]);

  const filtered = service
    ? projects.filter((p) => Array.isArray(p.stack) && p.stack.includes(service))
    : projects;

  return (
    <section id="projects" className="projects">
      <div className="projects__head">
        <h2 className="subtitle">Какие-то наши проекты</h2>

        <FilterTabs
          allLabel="Все"
          options={stackOptions}
          value={service}
          onChange={setService}
        />
      </div>

      <ul className="projects__grid">
        {filtered.slice(0, 4).map((project) => (
          <li key={project.id}>
            <ProjectCard
              project={{ ...project, tags: project.stack ?? [] }}
            />
          </li>
        ))}
      </ul>

      <Button
        as={Link}
        to="/list-projects"
        variant="secondary"
        className="projects__more"
      >
        Посмотреть больше проектов
      </Button>
    </section>
  );
}
