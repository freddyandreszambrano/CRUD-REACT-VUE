import React from "react";
import {saveForm} from "../services/formService";
import {useForm} from "../hooks/useForm";

const initialFormState = {
    dni: "",
    nombres: "",
    apellidos: "",
    fechaNacimiento: "",
    genero: "",
    ciudad: "",
};

export function Formulario({onFormSaved}) {
    const {
        form,
        errors,
        isSubmitting,
        handleChange,
        validate,
        resetForm,
        setIsSubmitting,
        setErrors
    } = useForm(initialFormState);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar formulario
        if (!validate()) {
            return;
        }

        setIsSubmitting(true);

        try {
            await saveForm(form);
            alert("✅ Formulario guardado exitosamente!");
            resetForm();

            // Notificar al componente padre para recargar la lista
            if (onFormSaved) {
                onFormSaved();
            }
        } catch (error) {
            alert(`❌ Error: ${error.message}`);
            setErrors({submit: error.message});
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="card shadow">
            <div className="card-header bg-primary text-white">
                <h4 className="mb-0">📝 Registro de Formulario</h4>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">DNI/Cédula *</label>
                        <input
                            className={`form-control ${errors.dni ? "is-invalid" : ""}`}
                            placeholder="Ingrese DNI"
                            name="dni"
                            value={form.dni}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        />
                        {errors.dni && (
                            <div className="invalid-feedback">{errors.dni}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Nombres *</label>
                        <input
                            className={`form-control ${errors.nombres ? "is-invalid" : ""}`}
                            placeholder="Ingrese nombres"
                            name="nombres"
                            value={form.nombres}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        />
                        {errors.nombres && (
                            <div className="invalid-feedback">{errors.nombres}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Apellidos *</label>
                        <input
                            className={`form-control ${errors.apellidos ? "is-invalid" : ""}`}
                            placeholder="Ingrese apellidos"
                            name="apellidos"
                            value={form.apellidos}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        />
                        {errors.apellidos && (
                            <div className="invalid-feedback">{errors.apellidos}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Fecha de Nacimiento *</label>
                        <input
                            type="date"
                            className={`form-control ${errors.fechaNacimiento ? "is-invalid" : ""}`}
                            name="fechaNacimiento"
                            value={form.fechaNacimiento}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            max={new Date().toISOString().split('T')[0]}
                        />
                        {errors.fechaNacimiento && (
                            <div className="invalid-feedback">{errors.fechaNacimiento}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold d-block">Género *</label>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="genero"
                                id="generoM"
                                value="M"
                                checked={form.genero === "M"}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            />
                            <label className="form-check-label" htmlFor="generoM">
                                Masculino
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="genero"
                                id="generoF"
                                value="F"
                                checked={form.genero === "F"}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            />
                            <label className="form-check-label" htmlFor="generoF">
                                Femenino
                            </label>
                        </div>
                        {errors.genero && (
                            <div className="text-danger small">{errors.genero}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Ciudad *</label>
                        <select
                            name="ciudad"
                            className={`form-select ${errors.ciudad ? "is-invalid" : ""}`}
                            value={form.ciudad}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        >
                            <option value="">Seleccione Ciudad</option>
                            <option value="Quito">Quito</option>
                            <option value="Guayaquil">Guayaquil</option>
                            <option value="Cuenca">Cuenca</option>
                            <option value="Milagro">Milagro</option>
                            <option value="Manta">Manta</option>
                            <option value="Ambato">Ambato</option>
                        </select>
                        {errors.ciudad && (
                            <div className="invalid-feedback">{errors.ciudad}</div>
                        )}
                    </div>

                    {errors.submit && (
                        <div className="alert alert-danger" role="alert">
                            {errors.submit}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2"></span>
                                Guardando...
                            </>
                        ) : (
                            "💾 Guardar Formulario"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
