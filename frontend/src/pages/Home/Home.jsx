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
import { CopyEmailButton } from "../../components/CopyEmailButton";
import {
  SERVICE_TABLE,
  BENEFITS,
  PROCESS_STEPS,
  MAPS_URL,
  CONTACT_EMAIL,
} from "../../constants/homeContent";
import avatar1 from "../../assets/images/person_avatar_1.svg";
import avatar2 from "../../assets/images/person_avatar_2.svg";
import mapFrame from "../../assets/images/map-frame.jpg";
import "./Home.css";

const CONTACT_PERSONS = [
  { avatar: avatar1, name: "Константин", phone: "tel:+79999999999", phoneDisplay: "8 (999) 999 99 99" },
  { avatar: avatar2, name: "Александр", phone: "tel:+79999999999", phoneDisplay: "8 (999) 999 99 99" },
];

export function Home() {
  return (
    <div className="page">
      <Header />

      <main>
        <div className="container">
          <section className="hero">
            <div className="hero__content">
              <h1 className="title">Тестовое задание</h1>
              <p className="text">
                на практику веб-разработчика в студии{" "}
                <a href="https://artgorka.ru/" target="_blank" rel="noreferrer" className="hero__link">
                  Art gorka
                </a>
              </p>
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
            <div className="contact__inner">
              <div className="contact__info">
                <div className="section-head">
                  <h2 className="subtitle">Свяжитесь с нами</h2>
                  <p className="contact-text">Отвечаем в будние дни с 9:00 до 18:00</p>
                </div>

                <div className="contact__columns">
                  <div className="contact__persons">
                    {CONTACT_PERSONS.map(({ avatar, name, phone, phoneDisplay }) => (
                      <div key={name} className="contact__person">
                        <img src={avatar} alt={name} className="contact__avatar" />
                        <div>
                          <a href={phone} className="contact__phone">{phoneDisplay}</a>
                          <p className="contact__person-name">{name}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="contact__details">
                    <div>
                      <a href="tel:88002228684" className="contact__link">8 800 222 86 84</a>
                      <p className="contact__label">Бесплатные звонки по России</p>
                    </div>

                    <div className="contact__detail-row">
                      <a href={`mailto:${CONTACT_EMAIL}`} className="contact__link">{CONTACT_EMAIL}</a>
                      <CopyEmailButton email={CONTACT_EMAIL} />
                    </div>

                    <a href={MAPS_URL} className="contact__link" target="_blank" rel="noreferrer">
                      Великий Новгород, ул. Студенческая, 14 (4 этаж)
                    </a>
                  </div>
                </div>
              </div>

              <a href={MAPS_URL} target="_blank" rel="noreferrer" className="contact__map-link">
                <img src={mapFrame} alt="Карта студии" className="contact__map-img" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
