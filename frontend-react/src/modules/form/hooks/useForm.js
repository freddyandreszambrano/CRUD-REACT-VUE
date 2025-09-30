import {useState} from "react";

export const useForm = (initialValues) => {
    const [form, setForm] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value});

        // Limpiar error del campo al escribir
        if (errors[name]) {
            setErrors({...errors, [name]: ""});
        }
    };

    const resetForm = () => {
        setForm(initialValues);
        setErrors({});
    };

    const validate = () => {
        const newErrors = {};

        // Validar campos requeridos
        if (!form.dni || form.dni.trim() === "") {
            newErrors.dni = "DNI es obligatorio";
        } else if (form.dni.length < 10) {
            newErrors.dni = "DNI debe tener al menos 10 caracteres";
        }

        if (!form.nombres || form.nombres.trim() === "") {
            newErrors.nombres = "Nombres es obligatorio";
        }

        if (!form.apellidos || form.apellidos.trim() === "") {
            newErrors.apellidos = "Apellidos es obligatorio";
        }

        if (!form.fechaNacimiento) {
            newErrors.fechaNacimiento = "Fecha de nacimiento es obligatoria";
        }

        if (!form.genero) {
            newErrors.genero = "Género es obligatorio";
        }

        if (!form.ciudad) {
            newErrors.ciudad = "Ciudad es obligatoria";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return {
        form,
        errors,
        isSubmitting,
        handleChange,
        validate,
        setForm,
        resetForm,
        setIsSubmitting,
        setErrors
    };
};