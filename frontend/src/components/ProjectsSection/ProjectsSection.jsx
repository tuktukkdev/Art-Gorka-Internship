import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import { FilterTabs } from "../FilterTabs";
import { ProjectCard } from "../ProjectCard";
import { PROJECT_FILTERS_CONFIG } from "../../constants/projectFilters";
import { getProjectTags } from "../../utils/projectFilters";
import { useProjects } from "../../hooks/useProjects";
import "./ProjectsSection.css";

const projectTypeFilter = PROJECT_FILTERS_CONFIG.find(
  (filter) => filter.key === "projectType",
);

export function ProjectsSection() {
  const [filters, setFilters] = useState({ projectType: "" });
  const { projects } = useProjects(filters);

  return (
    <section id="projects" className="projects">
      <div className="projects__head">
        <h2 className="subtitle">Какие-то наши проекты</h2>

        <FilterTabs
          allLabel="Все"
          options={projectTypeFilter.options}
          value={filters.projectType}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, projectType: value }))
          }
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
