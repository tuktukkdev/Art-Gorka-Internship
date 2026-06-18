import { useState, useEffect } from "react";
import { FEEDBACK_FIELDS, FEEDBACK_INITIAL_VALUES } from "../constants/homeContent";
import { validateFeedbackField } from "../utils/formValidation";

export function useFeedbackForm() {
  const [values, setValues] = useState(FEEDBACK_INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

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
      setIsSuccess(true);
    }
  };

  const handleCloseSuccess = () => setIsSuccess(false);

  useEffect(() => {
    if (!isSuccess) return;
    const timer = setTimeout(() => setIsSuccess(false), 6000);
    return () => clearTimeout(timer);
  }, [isSuccess]);

  return { values, errors, handleChange, handleBlur, handleSubmit, isSuccess, handleCloseSuccess };
}
