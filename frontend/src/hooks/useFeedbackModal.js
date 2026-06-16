import { useState } from "react";
import { FEEDBACK_MODAL_FIELDS, FEEDBACK_MODAL_INITIAL_VALUES } from "../constants/homeContent";
import { validateFeedbackField } from "../utils/formValidation";

export function useFeedbackModal() {
  const [values, setValues] = useState(FEEDBACK_MODAL_INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    const field = FEEDBACK_MODAL_FIELDS.find((f) => f.name === name);
    setErrors((prev) => ({
      ...prev,
      [name]: validateFeedbackField(name, value, field?.required),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    FEEDBACK_MODAL_FIELDS.forEach(({ name, required }) => {
      const error = validateFeedbackField(name, values[name], required);
      if (error) nextErrors[name] = error;
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setValues(FEEDBACK_MODAL_INITIAL_VALUES);
      setIsSuccess(true);
    }
  };

  return { values, errors, handleChange, handleBlur, handleSubmit, isSuccess };
}
