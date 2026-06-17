import projects from "../data/projects.json";
import { filterProjects } from "../utils/projectFilters";

export function getProjects(filters) {
  return filterProjects(projects, filters);
}

export function getProjectById(id) {
  return projects.find((p) => p.id === Number(id)) ?? null;
}
