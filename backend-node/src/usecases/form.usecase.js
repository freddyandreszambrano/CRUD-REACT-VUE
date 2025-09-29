import * as repo from "../repositories/form.repository.js";

export const createForm = async (payload) => {
  // validaciones de negocio simples
  const required = ["dni","nombres","apellidos","fechaNacimiento","genero","ciudad"];
  for (const f of required) {
    if (!payload[f]) throw new Error(`${f} es obligatorio`);
  }
  return repo.create(payload);
};

export const listForms = async () => repo.findAll();
export const getForm = async (id) => repo.findById(id);
export const updateForm = async (id, payload) => {
  if (!id) throw new Error("id requerido");
  return repo.update(id, payload);
};
export const deleteForm = async (id) => repo.remove(id);
