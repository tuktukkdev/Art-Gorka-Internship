import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Categories } from "../../components/Categories";
import { About } from "../../components/About";
import { TableRow } from "../../components/TableRow";
import { BenefitItem } from "../../components/BenefitItem";
import { ProcessStep } from "../../components/ProcessStep";
import { Footer } from "../../components/Footer";
import { ProjectsSection } from "../../components/ProjectsSection";
import { AccordionsSection } from "../../components/AccordionsSection";
import { FeedbackSection } from "../../components/FeedbackSection";
import { SERVICE_TABLE, BENEFITS, PROCESS_STEPS } from "../../constants/homeContent";
import "./Home.css";

export function Home() {
  return (
    <div className="page">
      <Header />

      <main>
        <div className="container">
          <section className="hero">
            <div className="hero__content">
              <h1 className="title">Тестовое задание</h1>
              <p className="text">на практику веб-разработчика в студии <a href="https://artgorka.ru/" target="_blank" rel="noreferrer" className="hero__link">Art gorka</a></p>
            </div>

            <div className="hero__actions">
              <Button variant="primary">Нажми меня</Button>
              <Button variant="secondary">Меня тоже нажми</Button>
            </div>
          </section>

          <Categories />
          <About />
          <ProjectsSection />

          <section id="service" className="service">
            <h2 className="subtitle">Какая-то табличка</h2>
            <dl className="service-table">
              {SERVICE_TABLE.map(({ name, text }) => (
                <TableRow key={name} name={name} text={text} />
              ))}
            </dl>
          </section>

          <AccordionsSection />

          <section className="benefits">
            <h2 className="subtitle">Тут всякие классные штуки про нас</h2>
            <ul className="benefits-container">
              {BENEFITS.map((text) => (
                <li key={text}>
                  <BenefitItem text={text} />
                </li>
              ))}
            </ul>
          </section>

          <section className="process">
            <h2 className="subtitle">Неизбежная прелюдия перед проектом</h2>
            {PROCESS_STEPS.map(({ title, description }, index) => (
              <ProcessStep
                key={index}
                number={index + 1}
                title={title}
                description={description}
              />
            ))}
          </section>
        </div>

        <FeedbackSection />

        <section id="contact" className="contact">
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
