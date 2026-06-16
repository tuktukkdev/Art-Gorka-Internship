import { useMemo } from "react";
import { getProjects } from "../services/projectsService";

export function useProjects(filters) {
  const projects = useMemo(() => getProjects(filters), [filters]);

  return { projects };
}
