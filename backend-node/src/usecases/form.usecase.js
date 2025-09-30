import * as repo from "../repositories/form.repository.js";

export const createForm = async (payload) => {
    const required = ["dni", "nombres", "apellidos", "fechaNacimiento", "genero", "ciudad"];
    for (const f of required) {
        if (!payload[f]) throw new Error(`${f} es obligatorio`);
    }

    if (!["M", "F"].includes(payload.genero)) {
        throw new Error("El género debe ser M o F");
    }

    return repo.create(payload);
};

export const listForms = async () => repo.findAll();

export const getForm = async (id) => repo.findById(id);

export const updateForm = async (id, payload) => {
    if (!id) throw new Error("id requerido");

    const existing = await repo.findById(id);
    if (!existing) throw new Error("Registro no encontrado");

    return repo.update(id, payload);
};

export const deleteForm = async (id) => {
    if (!id) throw new Error("id requerido");

    const existing = await repo.findById(id);
    if (!existing) throw new Error("Registro no encontrado");

    return repo.remove(id);
};