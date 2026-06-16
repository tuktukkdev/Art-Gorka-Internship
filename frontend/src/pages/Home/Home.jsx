import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Categories } from "../../components/Categories";
import { About } from "../../components/About";
import { FilterTabs } from "../../components/FilterTabs";
import { ProjectCard } from "../../components/ProjectCard";
import { TableRow } from "../../components/TableRow";
import { AccordionItem } from "../../components/AccordionItem";
import { BenefitItem } from "../../components/BenefitItem";
import { ProcessStep } from "../../components/ProcessStep";
import { Footer } from "../../components/Footer";
import "./Home.css";
import { PROJECT_FILTERS_CONFIG } from "../../constants/projectFilters";
import { getProjectTags } from "../../utils/projectFilters";
import { useProjects } from "../../hooks/useProjects";

const projectTypeFilter = PROJECT_FILTERS_CONFIG.find(
  (filter) => filter.key === "projectType",
);

const serviceTable = [
  {
    name: "Исследование",
    text: "Погружаемся в ваш бизнес, разбираем текущую ситуацию, выясняем цели и задачи, изучаем целевую аудиторию, конкурентов и лучшие практики рынка",
  },
  {
    name: "Дизайн",
    text: "Проектируем продукт, который будет отвечать потребностям пользователей и решать задачи бизнеса",
  },
  {
    name: "Разработка",
    text: "Разрабатываем решение на оптимальном стеке технологий, с чистым кодом и оптимизацией",
  },
  {
    name: "Контент",
    text: "Создаём и редактируем контент, загружаем его через админ-панели",
  },
  {
    name: "Маркетинг",
    text: "Продвигаем ваш продукт, настраиваем рекламу, ведём соцсети",
  },
];

const accordionItems = [
  {
    title: "Исследование",
    text: `Постановка целей и задач проекта
Знакомство с бизнесом клиента / отраслью
Сбор информации и бизнес-требований
Определение команды проекта
Аудит текущего продукта
Анализ конкурентов
Исследование целевой аудитории / пользователей
  Наблюдение
  Опросы
  Интервью
Jobs-To-Be-Done
Job/user stories
Ценностное предложение
Карта пользовательского пути (CJM)
Анализ технических особенностей и определение подходящего стека технологий`,
  },
  {
    title: "Дизайн",
    text: `Информационная архитектура
Карта объектов / сущностей
Пользовательские сценарии (user flow)
Lo-fi прототипы
Визуально-смысловой анализ
Дизайн-концепция
Создание дизайн-макетов для экранов разного формата
Hi-fi прототипы (опционально)
Подготовка макетов к разработке
UI-кит / дизайн-система
Дизайн-ревью`,
  },
  {
    title: "Разработка",
    text: `Разработка архитектуры (компоненты, модули, взаимодействия и логика работы продукта)
Frontend-разработка
  HTML/CSS/JS
  React.js
  Vue.js
  Вёрстка для разных форматов экрана
Backend
  PHP
  Запросы
  Базы данных
  API
  Обработка данных
  Аутентификация
  Безопасность
Контроль версий через Git
Оптимизация кода
Оптимизация контента
Базовая SEO-оптимизация
Интеграции
  CMS
    1С-Битрикс
    Wordpress
    ModX
    Joomla
  CRM
  Системы аналитики
  Системы согласия
Тестирование и исправление ошибок
Выгрузка продукта на сервер (деплой)
Настройка хостинга`,
  },
  {
    title: "Контент",
    text: `Копирайтинг и рерайтинг
Создание 2D/3D иллюстраций и графики
Анимированная графика
Создание 3D-визуализации (компания-партнёр Paint Effect)
Обработка фото
Видеомонтаж
Подбор подрядчика для фото/видео съёмки
Контент-менеджмент
Разработка сценариев`,
  },
  {
    title: "Маркетинг",
    text: `Формирование бренда
Оформление соцсетей (ВК)
Ведение соцсетей (ВК)
Таргетированная реклама
Контекстная реклама
SEO-оптимизация
Рекламные баннеры и объявления
Оформление для маркетплейсов (OZON, Wildberries, мегамаркет)`,
  },
];

const benefits = [
  "Небольшая и дружная команда специалистов, не держим у себя лишних людей",
  "Настроены на долгосрочные отношения с клиентами",
  "Прозрачный и понятный процесс работы",
  "Здравый смысл в работе — наше всё",
];

const processSteps = [
  {
    title: "Знакомимся и обсуждаем проект",
    description: [
      "Оставляйте заявку на сайте, на почту или звоните по 8 (921) 0 250 250.",
      "Наш менеджер ответит вам, предварительно обсудим, какие задачи нужно решить. После этого предложим заполнить бриф, где вы сможете подробно рассказать о проекте.",
    ],
  },
  {
    title: "Организуем встречу",
    description: [
      "Онлайн или оффлайн. Погрузимся в детали проекта, уточним все пожелания и ожидания. Пройдёмся по ключевым моментам из брифа. Обсудим варианты решения задачи.",
    ],
  },
  {
    title: "Оцениваем и отправляем КП",
    description: [
      "После встречи собираем все требования и приступаем к оценке проекта.",
      "По итогу отправляем вам детальное коммерческое предложение с описанием всех этапов работы, сроками и стоимостью проекта.",
    ],
  },
  {
    title: "Знакомимся и обсуждаем проект",
    description: [
      "Онлайн или оффлайн. Погрузимся в детали проекта, уточним все пожелания и ожидания. Пройдёмся по ключевым моментам из брифа. Обсудим варианты решения задачи.",
    ],
  },
];

const feedbackFields = [
  { name: "name", type: "text", placeholder: "Имя" },
  { name: "phone", type: "tel", placeholder: "Телефон", required: true },
  { name: "email", type: "email", placeholder: "Email" },
];

const feedbackInitialValues = { name: "", phone: "", email: "" };

const validateFeedbackField = (name, value, isRequired = false) => {
  const trimmed = value.trim();

  if (!trimmed) return isRequired ? "Заполните это поле" : "";

  switch (name) {
    case "name": {
      if (trimmed.length < 2) return "Имя слишком короткое";
      if (trimmed.length > 50) return "Имя слишком длинное";
      if (
        !/^[A-Za-zА-ЯЁа-яё]([A-Za-zА-ЯЁа-яё\s-]*[A-Za-zА-ЯЁа-яё])?$/.test(
          trimmed,
        )
      ) {
        return "Только буквы, пробел и дефис";
      }
      return "";
    }
    case "phone": {
      const digits = trimmed.replace(/\D/g, "");
      if (digits.length < 10 || digits.length > 15) {
        return "Введите корректный номер телефона";
      }
      return "";
    }
    case "email": {
      if (trimmed.length > 254) return "Email слишком длинный";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
        return "Введите корректный email";
      }
      return "";
    }
    default:
      return "";
  }
};

export function Home() {
  const [filters, setFilters] = useState({ projectType: "" });
  const [openIndexes, setOpenIndexes] = useState([]);
  const [feedbackValues, setFeedbackValues] = useState(feedbackInitialValues);
  const [feedbackErrors, setFeedbackErrors] = useState({});

  const { projects } = useProjects(filters);

  const handleFeedbackChange = (event) => {
    const { name, value } = event.target;
    setFeedbackValues((prev) => ({ ...prev, [name]: value }));
    setFeedbackErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFeedbackBlur = (event) => {
    const { name, value } = event.target;
    const field = feedbackFields.find((f) => f.name === name);
    setFeedbackErrors((prev) => ({
      ...prev,
      [name]: validateFeedbackField(name, value, field?.required),
    }));
  };

  const handleFeedbackSubmit = (event) => {
    event.preventDefault();

    const errors = {};
    feedbackFields.forEach(({ name, required }) => {
      const error = validateFeedbackField(name, feedbackValues[name], required);
      if (error) errors[name] = error;
    });

    setFeedbackErrors(errors);

    if (Object.keys(errors).length === 0) {
      setFeedbackValues(feedbackInitialValues);
    }
  };

  const toggleOpen = (index) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <div className="page">
      <Header />

      <main>
        <div className="container">
          <section className="hero">
            <div className="hero__content">
              <h1 className="title">Тестовое задание</h1>
              <p className="text">на практику веб-разработчика в студии</p>
            </div>

            <div className="hero__actions">
              <Button variant="primary">Нажми меня</Button>
              <Button variant="secondary">Меня тоже нажми</Button>
            </div>
          </section>

          <Categories />
          <About />

          <section className="projects">
            <div className="projects__head">
              <h2 className="subtitle">Какие-то наши проекты</h2>

              <FilterTabs
                allLabel="Все"
                options={projectTypeFilter.options}
                value={filters.projectType}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, projectType: value }))
                }
              />
            </div>

            <ul className="projects__grid">
              {projects.slice(0, 4).map((project) => (
                <li key={project.id}>
                  <ProjectCard
                    project={{ ...project, tags: getProjectTags(project) }}
                  />
                </li>
              ))}
            </ul>

            <Button
              as={Link}
              to="/list-projects"
              variant="secondary"
              className="projects__more"
            >
              Посмотреть больше проектов
            </Button>
          </section>

          <section className="service">
            <h2 className="subtitle">Какая-то табличка</h2>

            <dl className="service-table">
              {serviceTable.map(({ name, text }) => (
                <TableRow key={name} name={name} text={text} />
              ))}
            </dl>
          </section>

          <section className="service_row">
            <h2 className="subtitle">Чем мы обычно занимаемся</h2>
            <div className="accordions">
              {accordionItems.map(({ title, text }, index) => (
                <AccordionItem
                  key={title}
                  title={title}
                  text={text}
                  isOpen={openIndexes.includes(index)}
                  onToggle={() => toggleOpen(index)}
                />
              ))}
            </div>
          </section>

          <section className="benefits">
            <h2 className="subtitle">Тут всякие классные штуки про нас</h2>
            <ul className="benefits-container">
              {benefits.map((text) => (
                <li key={text}>
                  <BenefitItem text={text} />
                </li>
              ))}
            </ul>
          </section>

          <section className="process">
            <h2 className="subtitle">Неизбежная прелюдия перед проектом</h2>
            {processSteps.map(({ title, description }, index) => (
              <ProcessStep
                key={index}
                number={index + 1}
                title={title}
                description={description}
              />
            ))}
          </section>
        </div>

        <section className="feedback section">
          <div className="feedback__container container">
            <div className="section-head">
              <h2 className="subtitle">Давайте обсудим ваш проект</h2>
              <p className="feedback-text">
                Заполните форму, и наш менеджер свяжется с вами
              </p>
            </div>
            <form
              className="feedback-form"
              onSubmit={handleFeedbackSubmit}
              noValidate
            >
              {feedbackFields.map(({ name, type, placeholder, required }) => (
                <div className="feedback-form__field" key={name}>
                  <div
                    className={`feedback-form__input-wrap${required ? " feedback-form__input-wrap--required" : ""}`}
                  >
                    <input
                      type={type}
                      name={name}
                      placeholder={placeholder}
                      value={feedbackValues[name]}
                      onChange={handleFeedbackChange}
                      onBlur={handleFeedbackBlur}
                      required={required}
                      className={`feedback-form__input ${
                        feedbackErrors[name] ? "feedback-form__input--error" : ""
                      }`}
                    />
                  </div>
                  {feedbackErrors[name] && (
                    <span className="feedback-form__error">
                      {feedbackErrors[name]}
                    </span>
                  )}
                </div>
              ))}
              <Button
                type="submit"
                variant="secondary"
                className="feedback-form__submit"
              >
                Отправить
              </Button>
            </form>

            <p className="feedback-info">
              Нажимая кнопку «Отправить» вы соглашаетесь на обработку
              персональных данных.
            </p>
          </div>
        </section>
        <section className="contact">
          <div className="container">
            <div className="section-head">
              <h2 className="subtitle">Свяжитесь с нами</h2>
              <p className="contact-text">
                Отвечаем в будние дни с 9:00 до 18:00
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
