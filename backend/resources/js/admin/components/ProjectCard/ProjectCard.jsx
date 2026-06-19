import { useNavigate } from "react-router-dom";
import "./ProjectCard.css";
import iconLink from "../../assets/images/icon-link.svg";

export function ProjectCard({ project }) {
  const navigate = useNavigate();

  return (
    <div
      className="project_card media-zoom"
      onClick={() => navigate(`/projects/${project.id}`)}
    >
      <div className="project-card-image-wrapper">
        <img
          src={project.image}
          alt={project.title}
          className="media-zoom__image"
        />
      </div>
      <div className="project-card-content">
        <p className="project-card-name">{project.title}</p>
        <div className="project-card-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-card-tag">
              {tag}
            </span>
          ))}
        </div>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="project-card-link"
          onClick={(e) => e.stopPropagation()}
        >
          <img src={iconLink} alt="" className="project-card-link-icon" />
          {project.url.replace(/^https?:\/\//, "")}
        </a>
      </div>
    </div>
  );
}
