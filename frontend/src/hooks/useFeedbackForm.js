import { useState } from "react";
import { FEEDBACK_FIELDS, FEEDBACK_INITIAL_VALUES } from "../constants/homeContent";
import { validateFeedbackField } from "../utils/formValidation";

export function useFeedbackForm() {
  const [values, setValues] = useState(FEEDBACK_INITIAL_VALUES);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    const field = FEEDBACK_FIELDS.find((f) => f.name === name);
    setErrors((prev) => ({
      ...prev,
      [name]: validateFeedbackField(name, value, field?.required),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};
    FEEDBACK_FIELDS.forEach(({ name, required }) => {
      const error = validateFeedbackField(name, values[name], required);
      if (error) nextErrors[name] = error;
    });

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setValues(FEEDBACK_INITIAL_VALUES);
    }
  };

  return { values, errors, handleChange, handleBlur, handleSubmit };
}
