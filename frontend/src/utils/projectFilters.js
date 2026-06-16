import { PROJECT_FILTERS_CONFIG } from "../constants/projectFilters";

export function filterProjects(projects, filters) {
  return projects.filter((project) =>
    Object.entries(filters).every(([key, value]) => {
      if (Array.isArray(value)) {
        return value.length === 0 || value.includes(project[key]);
      }

      return !value || project[key] === value;
    })
  );
}

export function getProjectTags(project) {
  return PROJECT_FILTERS_CONFIG.map(({ key, options }) =>
    options.find((option) => option.value === project[key])
  )
    .filter(Boolean)
    .map((option) => option.label);
}

export function buildProjectsQuery(filters) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });

  return params.toString();
}
