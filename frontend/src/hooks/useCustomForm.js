import { useState } from "react";

const useCustomForm = (initialValues = {}, onSubmit) => {
  const [formData, setFormValues] = useState(initialValues);
  const [checked, setChecked] = useState(false)

  const handleInputChange = (e) => {
    e.persist();
    if (e.target.name === "isOwner") {
      setChecked(!checked);
      setFormValues({...formData, [e.target.name]: e.target.checked });
    } else {
      setFormValues({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const reset = () => {
    setFormValues(initialValues);
  };

  return [formData, checked, handleInputChange, handleSubmit, reset];
};

export default useCustomForm;
