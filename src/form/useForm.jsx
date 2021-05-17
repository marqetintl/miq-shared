import { useState } from "react";

export default function useForm(defaultValues = {}) {
    const [values, setValues] = useState({ ...defaultValues });
    const [errors, setErrors] = useState({});

    const setValue = (key, value) => {
        setValues({ ...values, [key]: value });
    };
    const handleChange = (e) => {
        setValue(e.target.name, e.target.value);
    };
    return { values, handleChange, setValue, setValues, errors, setErrors };
}
