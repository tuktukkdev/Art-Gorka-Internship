export const PROJECT_SERVICES = [
  "SEO",
  "Дизайн",
  "Разработка сайта",
  "Контекстная реклама",
  "Обслуживание",
  "SMM",
];

export const PROJECT_FILTERS_CONFIG = [
  {
    key: "industry",
    label: "Отрасль",
    allLabel: "Все отрасли",
    dynamic: true,
    options: [],
  },
  {
    key: "projectType",
    label: "Тип проекта",
    allLabel: "Все типы",
    dynamic: true,
    options: [],
  },
  {
    key: "status",
    label: "Статус",
    allLabel: "Все статусы",
    options: [
      { value: "В разработке", label: "В разработке" },
      { value: "Завершено", label: "Завершено" },
      { value: "Поддержка", label: "Поддержка" },
      { value: "Архивировано", label: "Архивировано" },
    ],
  },
  {
    key: "platform",
    label: "Платформа",
    allLabel: "Все платформы",
    options: [
      { value: "Wordpress", label: "Wordpress" },
      { value: "Bitrix", label: "Bitrix" },
      { value: "Кастомная платформа", label: "Кастомная платформа" },
      { value: "Другое", label: "Другое" },
    ],
  },
];

export const DEFAULT_PROJECT_FILTERS = PROJECT_FILTERS_CONFIG.reduce(
  (filters, { key }) => ({ ...filters, [key]: [] }),
  {}
);
