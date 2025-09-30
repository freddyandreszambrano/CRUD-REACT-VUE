 import React from "react";
import { useForm } from "../hooks/useForm";

export function Formulario() {
  const { form, errors, handleChange, validate } = useForm({
    dni: "",
    nombres: "",
    apellidos: "",
    fechaNacimiento: "",
    genero: "",
    ciudad: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log(form); // Aquí llamas a formService luego
      alert("Formulario enviado!");
    } else {
      alert("Complete todos los campos correctamente");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
      <h3 className="mb-4 text-center text-primary">Registro de Usuario</h3>

      <div className="mb-3">
        <label className="form-label">DNI</label>
        <input
          type="text"
          name="dni"
          className={`form-control ${errors.dni ? "is-invalid" : ""}`}
          value={form.dni}
          onChange={handleChange}
          placeholder="Ingrese DNI"
        />
        <div className="invalid-feedback">{errors.dni}</div>
      </div>

      <div className="mb-3">
        <label className="form-label">Nombres</label>
        <input
          type="text"
          name="nombres"
          className={`form-control ${errors.nombres ? "is-invalid" : ""}`}
          value={form.nombres}
          onChange={handleChange}
          placeholder="Ingrese nombres"
        />
        <div className="invalid-feedback">{errors.nombres}</div>
      </div>

      <div className="mb-3">
        <label className="form-label">Apellidos</label>
        <input
          type="text"
          name="apellidos"
          className={`form-control ${errors.apellidos ? "is-invalid" : ""}`}
          value={form.apellidos}
          onChange={handleChange}
          placeholder="Ingrese apellidos"
        />
        <div className="invalid-feedback">{errors.apellidos}</div>
      </div>

      <div className="mb-3">
        <label className="form-label">Fecha de Nacimiento</label>
        <input
          type="date"
          name="fechaNacimiento"
          className={`form-control ${errors.fechaNacimiento ? "is-invalid" : ""}`}
          value={form.fechaNacimiento}
          onChange={handleChange}
        />
        <div className="invalid-feedback">{errors.fechaNacimiento}</div>
      </div>

      <div className="mb-3">
        <label className="form-label">Género</label>
        <div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="genero"
              value="M"
              checked={form.genero === "M"}
              onChange={handleChange}
            />
            <label className="form-check-label">Masculino</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="genero"
              value="F"
              checked={form.genero === "F"}
              onChange={handleChange}
            />
            <label className="form-check-label">Femenino</label>
          </div>
        </div>
        {errors.genero && <div className="text-danger">{errors.genero}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Ciudad</label>
        <select
          name="ciudad"
          className={`form-select ${errors.ciudad ? "is-invalid" : ""}`}
          value={form.ciudad}
          onChange={handleChange}
        >
          <option value="">Seleccione Ciudad</option>
          <option value="Quito">Quito</option>
          <option value="Guayaquil">Guayaquil</option>
          <option value="Cuenca">Cuenca</option>
        </select>
        <div className="invalid-feedback">{errors.ciudad}</div>
      </div>

      <button type="submit" className="btn btn-primary w-100 mt-3">
        Enviar
      </button>
    </form>
  );
}
