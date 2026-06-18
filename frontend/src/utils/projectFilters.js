import { PROJECT_FILTERS_CONFIG } from "../constants/projectFilters";

export function filterProjects(projects, filters) {
  return projects.filter((project) =>
    Object.entries(filters).every(([key, selectedValues]) => {
      if (!Array.isArray(selectedValues) || selectedValues.length === 0) return true;

      const config = PROJECT_FILTERS_CONFIG.find((f) => f.key === key);
      if (config?.multiValue) {
        const projectValues = String(project[key]).split(", ");
        return selectedValues.some((v) => projectValues.includes(v));
      }

      return selectedValues.includes(project[key]);
    })
  );
}

export function getProjectTags(project) {
  return PROJECT_FILTERS_CONFIG.flatMap(({ key, options, dynamic, multiValue }) => {
    if (dynamic) {
      return project[key] ? [project[key]] : [];
    }
    if (multiValue) {
      const projectValues = String(project[key]).split(", ");
      return projectValues
        .map((v) => options.find((o) => o.value === v))
        .filter(Boolean)
        .map((o) => o.label);
    }
    const match = options.find((o) => o.value === project[key]);
    return match ? [match.label] : [];
  });
}

export function getFilterLabel(key, value) {
  const filter = PROJECT_FILTERS_CONFIG.find((f) => f.key === key);
  return filter?.options.find((o) => o.value === value)?.label ?? value;
}

