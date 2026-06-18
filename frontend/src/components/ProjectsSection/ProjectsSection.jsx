import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import { FilterTabs } from "../FilterTabs";
import { ProjectCard } from "../ProjectCard";
import { PROJECT_SERVICES } from "../../constants/projectFilters";
import { getProjectTags } from "../../utils/projectFilters";
import { useProjects } from "../../hooks/useProjects";
import "./ProjectsSection.css";

const serviceOptions = PROJECT_SERVICES.map((service) => ({
  value: service,
  label: service,
}));

export function ProjectsSection() {
  const [filters, setFilters] = useState({ service: "" });
  const { projects } = useProjects(filters);

  return (
    <section id="projects" className="projects">
      <div className="projects__head">
        <h2 className="subtitle">Какие-то наши проекты</h2>

        <FilterTabs
          allLabel="Все"
          options={serviceOptions}
          value={filters.service}
          onChange={(value) => setFilters({ service: value })}
        />
      </div>

      <ul className="projects__grid">
        {projects.slice(0, 4).map((project) => (
          <li key={project.id}>
            <ProjectCard
              project={{ ...project, tags: getProjectTags(project) }}
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
