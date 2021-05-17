import { useState } from "react";

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
            case "checkbox":
                return toggleCheck(e);

            default:
                return setValue(e.target.name, e.target.value);
        }
    };
    return { values, handleChange, toggleCheck, setValue, setValues, errors, setErrors };
}
