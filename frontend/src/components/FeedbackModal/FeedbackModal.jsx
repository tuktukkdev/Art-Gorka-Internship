import { useEffect } from "react";
import { Button } from "../Button";
import CloseBtn from "../../assets/images/close-btn.svg?react";
import { FEEDBACK_MODAL_FIELDS } from "../../constants/homeContent";
import { useFeedbackModal } from "../../hooks/useFeedbackModal";
import "./FeedbackModal.css";

export function FeedbackModal({ onClose }) {
  const { values, errors, handleChange, handleBlur, handleSubmit, isSuccess } = useFeedbackModal();

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="feedback-modal-overlay" onClick={onClose}>
      <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>
        <button className="feedback-modal__close" onClick={onClose} type="button">
          <CloseBtn />
        </button>

        {isSuccess ? (
          <>
            <div className="feedback-modal__head">
              <h2 className="feedback-modal__title">Спасибо за обращение</h2>
              <p className="feedback-modal__desc">
                Мы уже получили вашу заявку, свяжемся с вами в течение дня
              </p>
            </div>
            <Button
              variant="primary"
              className="feedback-modal__submit"
              onClick={onClose}
              type="button"
            >
              Хорошо, закрыть
            </Button>
          </>
        ) : (
          <>
            <div className="feedback-modal__head">
              <h2 className="feedback-modal__title">Оставьте заявку</h2>
              <p className="feedback-modal__desc">
                Заполните форму, и наш менеджер свяжется с вами
              </p>
            </div>

            <form className="feedback-modal__form" onSubmit={handleSubmit} noValidate>
              {FEEDBACK_MODAL_FIELDS.map(({ name, type, tag, placeholder, required }) => (
                <div className="feedback-modal__field" key={name}>
                  <div className={`feedback-modal__input-wrap${required ? " feedback-modal__input-wrap--required" : ""}`}>
                    {tag === "textarea" ? (
                      <textarea
                        name={name}
                        placeholder={placeholder}
                        value={values[name]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`feedback-modal__input feedback-modal__textarea${errors[name] ? " feedback-modal__input--error" : ""}`}
                      />
                    ) : (
                      <input
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        value={values[name]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required={required}
                        className={`feedback-modal__input${errors[name] ? " feedback-modal__input--error" : ""}`}
                      />
                    )}
                  </div>
                  {errors[name] && (
                    <span className="feedback-modal__error">{errors[name]}</span>
                  )}
                </div>
              ))}

              <Button type="submit" variant="primary" className="feedback-modal__submit">
                Отправить
              </Button>
            </form>

            <p className="feedback-modal__info">
              Нажимая кнопку «Отправить» вы соглашаетесь на{" "}
              <a href="#" className="feedback-modal__link">обработку персональных данных.</a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
