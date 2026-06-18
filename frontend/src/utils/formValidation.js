export function validateFeedbackField(name, value, isRequired = false) {
  const trimmed = value.trim();

  if (!trimmed) return isRequired ? "Заполните это поле" : "";

  switch (name) {
    case "name": {
      if (trimmed.length < 2) return "Имя слишком короткое";
      if (trimmed.length > 50) return "Имя слишком длинное";
      if (!/^[A-Za-zА-ЯЁа-яё]+$/.test(trimmed)) {
        return "Только буквы, без пробелов и дефисов";
      }
      return "";
    }
    case "phone": {
      const digits = trimmed.replace(/\D/g, "");
      const normalized = digits.startsWith("8") ? "7" + digits.slice(1) : digits;
      if (!/^7\d{10}$/.test(normalized)) {
        return "Введите российский номер (+7 или 8)";
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
}
