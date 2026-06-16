import { useState } from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { ProjectCard } from "../../components/ProjectCard";
import { FilterGroup } from "../../components/FilterGroup";
import {
  PROJECT_FILTERS_CONFIG,
  DEFAULT_PROJECT_FILTERS,
} from "../../constants/projectFilters";
import { getProjectTags } from "../../utils/projectFilters";
import { useProjects } from "../../hooks/useProjects";
import { useGridAnimation } from "../../hooks/useGridAnimation";
import "./ListProjects.css";

export function ListProjects() {
  const [filters, setFilters] = useState(DEFAULT_PROJECT_FILTERS);
  const { projects } = useProjects(filters);
  const { displayed, gridClassName } = useGridAnimation(projects);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="page">
      <Header />

      <main>
        <div className="container">
          <section className="list-projects">
            <div className="list-projects__head">
              <h1 className="subtitle">Все проекты</h1>

              <div className="list-projects__filters">
                {PROJECT_FILTERS_CONFIG.map(({ key, label, allLabel, options }) => (
                  <FilterGroup
                    key={key}
                    label={label}
                    allLabel={allLabel}
                    options={options}
                    value={filters[key]}
                    onChange={(value) => handleFilterChange(key, value)}
                  />
                ))}
              </div>
            </div>

            <ul className={gridClassName}>
              {displayed.map((project) => (
                <li key={project.id}>
                  <ProjectCard
                    project={{ ...project, tags: getProjectTags(project) }}
                  />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
