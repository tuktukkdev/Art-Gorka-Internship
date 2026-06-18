const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api';

function buildParams(filters = {}) {
  const params = new URLSearchParams();

  if (filters.industry?.length)     params.set('industry',     filters.industry.join(','));
  if (filters.projectType?.length)  params.set('project_type', filters.projectType.join(','));
  if (filters.platform?.length)     params.set('platform',     filters.platform[0]);
  if (filters.status?.length)       params.set('status',       filters.status[0]);
  if (filters.service?.length)      params.set('service',      Array.isArray(filters.service) ? filters.service[0] : filters.service);

  return params;
}

export async function fetchProjects(filters = {}) {
  const query = buildParams(filters).toString();
  const res = await fetch(`${BASE_URL}/projects${query ? `?${query}` : ''}`);
  if (!res.ok) throw new Error('Failed to fetch projects');
  const { data } = await res.json();
  return data ?? [];
}

export async function fetchFilterOptions() {
  const res = await fetch(`${BASE_URL}/projects/filter-options`);
  if (!res.ok) throw new Error('Failed to fetch filter options');
  const { data } = await res.json();
  return data;
}

export async function fetchProjectById(id) {
  const res = await fetch(`${BASE_URL}/projects/${id}`);
  if (res.status === 404) throw new Error('not_found');
  if (!res.ok) throw new Error('Failed to fetch project');
  const { data } = await res.json();
  return data;
}
