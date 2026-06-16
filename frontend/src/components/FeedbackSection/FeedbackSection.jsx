import { Button } from "../Button";
import { FEEDBACK_FIELDS } from "../../constants/homeContent";
import { useFeedbackForm } from "../../hooks/useFeedbackForm";
import "./FeedbackSection.css";

export function FeedbackSection() {
  const feedback = useFeedbackForm();

  return (
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
          onSubmit={feedback.handleSubmit}
          noValidate
        >
          {FEEDBACK_FIELDS.map(({ name, type, placeholder, required }) => (
            <div className="feedback-form__field" key={name}>
              <div
                className={`feedback-form__input-wrap${required ? " feedback-form__input-wrap--required" : ""}`}
              >
                <input
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  value={feedback.values[name]}
                  onChange={feedback.handleChange}
                  onBlur={feedback.handleBlur}
                  required={required}
                  className={`feedback-form__input ${
                    feedback.errors[name] ? "feedback-form__input--error" : ""
                  }`}
                />
              </div>
              {feedback.errors[name] && (
                <span className="feedback-form__error">
                  {feedback.errors[name]}
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
  );
}
