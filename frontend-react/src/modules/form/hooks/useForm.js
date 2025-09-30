import {useState} from "react";
import {required} from "../../../shared/validators";

export const useForm = (initialValues) => {
    const [form, setForm] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value});
    };

    const validate = () => {
        const newErrors = {};
        Object.keys(form).forEach((key) => {
            newErrors[key] = required(form[key]);
        });
        setErrors(newErrors);
        return Object.values(newErrors).every((err) => err === "");
    };

    return {form, errors, handleChange, validate, setForm};
};
