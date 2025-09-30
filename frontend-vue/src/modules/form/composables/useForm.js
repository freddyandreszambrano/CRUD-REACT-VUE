import { reactive, toRefs } from "vue";

export function useForm(initialValues) {
    const state = reactive({
        form: { ...initialValues },
        errors: {},
        isSubmitting: false
    });

    const handleChange = (key, value) => {
        state.form[key] = value;
        // Limpiar error del campo al escribir
        if (state.errors[key]) {
            state.errors[key] = "";
        }
    };

    const validate = () => {
        const newErrors = {};

        // Validar DNI
        if (!state.form.dni || state.form.dni.trim() === "") {
            newErrors.dni = "DNI es obligatorio";
        } else if (state.form.dni.length < 10) {
            newErrors.dni = "DNI debe tener al menos 10 caracteres";
        }

        // Validar Nombres
        if (!state.form.nombres || state.form.nombres.trim() === "") {
            newErrors.nombres = "Nombres es obligatorio";
        }

        // Validar Apellidos
        if (!state.form.apellidos || state.form.apellidos.trim() === "") {
            newErrors.apellidos = "Apellidos es obligatorio";
        }

        // Validar Fecha de Nacimiento
        if (!state.form.fechaNacimiento) {
            newErrors.fechaNacimiento = "Fecha de nacimiento es obligatoria";
        }

        // Validar Género
        if (!state.form.genero) {
            newErrors.genero = "Género es obligatorio";
        }

        // Validar Ciudad
        if (!state.form.ciudad) {
            newErrors.ciudad = "Ciudad es obligatoria";
        }

        state.errors = newErrors;
        return Object.keys(newErrors).length === 0;
    };

    const resetForm = () => {
        state.form = { ...initialValues };
        state.errors = {};
    };

    const setSubmitting = (value) => {
        state.isSubmitting = value;
    };

    return {
        ...toRefs(state),
        handleChange,
        validate,
        resetForm,
        setSubmitting
    };
}
