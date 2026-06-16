import { useState, useEffect, useRef } from "react";
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
import "./ListProjects.css";

const GRID_COLLAPSE_DURATION = 200;
const GRID_GAP_DELAY = 150;
const GRID_APPEAR_DURATION = 250;

export function ListProjects() {
  const [filters, setFilters] = useState(DEFAULT_PROJECT_FILTERS);
  const { projects } = useProjects(filters);

  const [displayedProjects, setDisplayedProjects] = useState(projects);
  const [gridPhase, setGridPhase] = useState("idle");
  const prevProjectsRef = useRef(projects);

  useEffect(() => {
    if (prevProjectsRef.current === projects) return;

    setGridPhase("collapsing");

    const collapseTimer = setTimeout(() => {
      setDisplayedProjects(projects);
      prevProjectsRef.current = projects;
      setGridPhase("hidden");
    }, GRID_COLLAPSE_DURATION);

    return () => clearTimeout(collapseTimer);
  }, [projects]);

  useEffect(() => {
    if (gridPhase !== "hidden") return;

    const gapTimer = setTimeout(() => setGridPhase("appearing"), GRID_GAP_DELAY);

    return () => clearTimeout(gapTimer);
  }, [gridPhase]);

  useEffect(() => {
    if (gridPhase !== "appearing") return;

    const appearTimer = setTimeout(() => setGridPhase("idle"), GRID_APPEAR_DURATION);

    return () => clearTimeout(appearTimer);
  }, [gridPhase]);

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

            <ul
              className={
                gridPhase === "idle"
                  ? "list-projects__grid"
                  : `list-projects__grid list-projects__grid--${gridPhase}`
              }
            >
              {displayedProjects.map((project) => (
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
