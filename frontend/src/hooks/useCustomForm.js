import { useState } from "react";

const useCustomForm = (initialValues = {}, onSubmit) => {
  const [formData, setFormValues] = useState(initialValues);

  const handleInputChange = (e) => {
    try{
      e.persist();
    }catch(er){

    }
    if (e.target.name === "is_owner") {
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

  return [formData, handleInputChange, handleSubmit, reset];
};

export default useCustomForm;
