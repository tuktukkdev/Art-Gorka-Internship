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

export function getFilterLabel(key, value) {
  const filter = PROJECT_FILTERS_CONFIG.find((f) => f.key === key);
  return filter?.options.find((o) => o.value === value)?.label ?? value;
}

