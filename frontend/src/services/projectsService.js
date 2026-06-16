import projects from "../data/projects.json";
import { filterProjects } from "../utils/projectFilters";

export function getProjects(filters) {
  return filterProjects(projects, filters);
}
