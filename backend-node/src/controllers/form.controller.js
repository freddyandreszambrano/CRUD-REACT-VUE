import * as usecase from "../usecases/form.usecase.js";

export const createForm = async (req, res) => {
  try {
    const data = await usecase.createForm(req.body);
    return res.status(201).json(data);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const listForms = async (req, res) => {
  const data = await usecase.listForms();
  res.json(data);
};

export const getForm = async (req, res) => {
  const data = await usecase.getForm(req.params.id);
  if (!data) return res.status(404).json({ error: "No encontrado" });
  res.json(data);
};

export const updateForm = async (req, res) => {
  try {
    const data = await usecase.updateForm(req.params.id, req.body);
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteForm = async (req, res) => {
  await usecase.deleteForm(req.params.id);
  res.status(204).send();
};
