import { Button } from "../Button";
import CloseBtn from "../../assets/images/close-btn.svg?react";
import "./SuccessModal.css";

export function SuccessModal({ onClose }) {
  return (
    <div className="success-modal-overlay" onClick={onClose}>
      <div className="success-modal" onClick={(e) => e.stopPropagation()}>
        <button className="success-modal__close" onClick={onClose} type="button">
          <CloseBtn />
        </button>
        <h3 className="success-modal__title">Спасибо!</h3>
        <p className="success-modal__text">
          Наш менеджер свяжется с вами в ближайшее время с 09:00 до 19:00
        </p>
        <Button
          variant="primary"
          className="success-modal__btn"
          onClick={onClose}
          type="button"
        >
          Хорошо
        </Button>
      </div>
    </div>
  );
}
