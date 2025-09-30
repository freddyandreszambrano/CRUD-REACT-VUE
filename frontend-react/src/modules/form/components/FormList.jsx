import React, {useEffect, useState} from "react";
import {FormItem} from "./FormItem";
import {deleteForm as deleteFormService, getForms} from "../services/formService";

export function FormList({refreshTrigger}) {
    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadForms = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getForms();
            setForms(data);
        } catch (err) {
            setError(err.message);
            console.error("Error cargando formularios:", err);
        } finally {
            setLoading(false);
        }
    };

    const deleteForm = async (id) => {
        if (!window.confirm("¿Está seguro de eliminar este registro?")) {
            return;
        }

        try {
            await deleteFormService(id);
            alert("✅ Registro eliminado correctamente");
            loadForms();
        } catch (err) {
            alert(`❌ Error al eliminar: ${err.message}`);
        }
    };

    useEffect(() => {
        loadForms();
    }, [refreshTrigger]);

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-3 text-muted">Cargando registros...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                <strong>Error:</strong> {error}
                <button
                    className="btn btn-sm btn-outline-danger ms-3"
                    onClick={loadForms}
                >
                    Reintentar
                </button>
            </div>
        );
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>📋 Lista de Registros ({forms.length})</h3>
                <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={loadForms}
                >
                    🔄 Recargar
                </button>
            </div>

            {forms.length === 0 ? (
                <div className="alert alert-info">
                    <strong>ℹ️ Sin registros</strong>
                    <p className="mb-0">Aún no hay formularios guardados. Completa el formulario para agregar el
                        primero.</p>
                </div>
            ) : (
                <ul className="list-group">
                    {forms.map((item) => (
                        <FormItem
                            key={item.id}
                            form={item}
                            onDelete={deleteForm}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}