export function validateFeedbackField(name, value, isRequired = false) {
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
}
