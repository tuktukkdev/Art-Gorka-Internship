import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/Button";
import { getProjectById } from "../../services/projectsService";
import { getFilterLabel } from "../../utils/projectFilters";
import "./ProjectDetail.css";
import iconLink from "../../assets/images/icon-link.svg";

function ParamValues({ value }) {
  const items = String(value).split(", ");
  return (
    <div className="project-detail__param-values">
      {items.map((item) => (
        <span key={item} className="project-detail__param-value">
          {item}
        </span>
      ))}
    </div>
  );
}

export function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = getProjectById(id);

  if (!project) {
    return (
      <div className="page">
        <Header />
        <main className="project-detail-not-found">
          <p className="text">Проект не найден</p>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Вернуться назад
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const displayUrl = project.url.replace(/^https?:\/\//, "");

  return (
    <div className="page">
      <Header />

      <main>
        <div className="container">
          <section className="project-detail">
            <button
              className="project-detail__back"
              onClick={() => navigate(-1)}
            >
              <span className="project-detail__back-arrow">←</span>
              Назад
            </button>

            <h1 className="project-detail__title subtitle">{project.title}</h1>

            <div className="project-detail__hero">
              <img
                src={project.image}
                alt={project.title}
                className="project-detail__hero-image"
              />
            </div>

            <div className="project-detail__body">
              <div className="project-detail__description">
                <p className="text">{project.description}</p>
              </div>

              <div className="project-detail__params">
                <div className="project-detail__param">
                  <span className="project-detail__param-label">Отрасль</span>
                  <ParamValues value={getFilterLabel("industry", project.industry)} />
                </div>

                <div className="project-detail__param">
                  <span className="project-detail__param-label">Тип проекта</span>
                  <ParamValues value={getFilterLabel("projectType", project.projectType)} />
                </div>

                <div className="project-detail__param">
                  <span className="project-detail__param-label">Платформа</span>
                  <ParamValues value={project.platform} />
                </div>

                <div className="project-detail__param">
                  <span className="project-detail__param-label">Статус</span>
                  <ParamValues value={project.status} />
                </div>

                <div className="project-detail__param">
                  <span className="project-detail__param-label">URL</span>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-detail__param-link"
                  >
                    <img
                      src={iconLink}
                      alt=""
                      className="project-detail__param-link-icon"
                    />
                    {displayUrl}
                  </a>
                </div>

                {project.stack && project.stack.length > 0 && (
                  <div className="project-detail__param">
                    <span className="project-detail__param-label">Услуги</span>
                    <div className="project-detail__param-values">
                      {project.stack.map((item) => (
                        <span key={item} className="project-detail__param-value">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-detail__cta"
                >
                  <Button variant="primary">Открыть сайт</Button>
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
