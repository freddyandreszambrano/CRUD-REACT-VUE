import React from "react";

export function FormItem({form, onDelete}) {
    return (
        <li className="list-group-item">
            <div className="d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                    <h5 className="mb-1">
                        {form.nombres} {form.apellidos}
                    </h5>
                    <p className="mb-1">
                        <span className="badge bg-secondary me-2">DNI: {form.dni}</span>
                        <span className="badge bg-info me-2">
                            {form.genero === "M" ? "👨 Masculino" : "👩 Femenino"}
                        </span>
                        <span className="badge bg-primary">📍 {form.ciudad}</span>
                    </p>
                    <small className="text-muted">
                        📅 Fecha de Nacimiento: {new Date(form.fechaNacimiento).toLocaleDateString()}
                    </small>
                    {form.createdAt && (
                        <small className="text-muted d-block">
                            🕒 Creado: {new Date(form.createdAt).toLocaleString()}
                        </small>
                    )}
                </div>
                <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(form.id)}
                >
                    🗑️ Eliminar
                </button>
            </div>
        </li>
    );
}
