export const PROJECT_FILTERS_CONFIG = [
  {
    key: "industry",
    label: "Отрасль",
    allLabel: "Все отрасли",
    options: [
      { value: "beauty", label: "Красота и уход" },
      { value: "retail", label: "Розничная торговля" },
      { value: "horeca", label: "Кафе и рестораны" },
      { value: "construction", label: "Строительство" },
      { value: "automotive", label: "Автобизнес" },
      { value: "fitness", label: "Фитнес" },
      { value: "legal", label: "Юридические услуги" },
      { value: "travel", label: "Туризм" },
      { value: "education", label: "Образование" },
      { value: "manufacturing", label: "Производство" },
    ],
  },
  {
    key: "projectType",
    label: "Тип проекта",
    allLabel: "Все типы",
    options: [
      { value: "landing", label: "Лендинг" },
      { value: "corporate-site", label: "Корпоративный сайт" },
      { value: "online-store", label: "Интернет-магазин" },
      { value: "ads", label: "Контекстная реклама" },
      { value: "smm", label: "SMM" },
    ],
  },
];

export const DEFAULT_PROJECT_FILTERS = PROJECT_FILTERS_CONFIG.reduce(
  (filters, { key }) => ({ ...filters, [key]: [] }),
  {}
);
