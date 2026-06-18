import { useState, useEffect } from "react";
import { fetchFilterOptions } from "../api/projects";

export function useProjectFilterOptions() {
  const [filterOptions, setFilterOptions] = useState({ industry: [], projectType: [] });

  useEffect(() => {
    fetchFilterOptions()
      .then(setFilterOptions)
      .catch(() => {});
  }, []);

  return { filterOptions };
}
