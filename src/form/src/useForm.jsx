import { useState } from 'react';
import { IS_DEV } from '@miq/utils';

export default function useForm(defaultValues = {}) {
  const [values, setValues] = useState({ ...defaultValues });
  const [errors, setErrors] = useState({});

  const setValue = (key, value) => {
    setValues({ ...values, [key]: value });
  };

  const toggleCheck = (e) => {
    const { name } = e.target;
    return setValue(name, !values[name]);
  };

  const handleChange = (e) => {
    switch (e.target.type) {
      case 'checkbox':
        return toggleCheck(e);

      default:
        return setValue(e.target.name, e.target.value);
    }
  };

  const handleError = (err, log = true) => {
    if (!err || !err.response) {
      return;
    }

    const { response } = err;
    if (response.status !== 400) {
      IS_DEV && log && console.error(`Request error status: ${response.status}`);
      return err;
    }

    let newData = {};
    const { data } = response;

    if (IS_DEV && log) {
      console.error('ERROR=>', data);
    }

    Object.keys(data).forEach((key) => {
      let e = data[key];
      if (Array.isArray(e) && e.length > 0) {
        e = e[0];
      }
      newData = { ...newData, [key]: e.message || e };
    });

    setErrors({ ...newData });
  };
  return {
    values,
    handleChange,
    toggleCheck,
    setValue,
    setValues,
    errors,
    setErrors,
    handleError,
    hasErrors: () => Object.keys(errors).join() !== '',
  };
}
