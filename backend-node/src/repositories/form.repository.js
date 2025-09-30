import db from "../adapters/db.adapter.js";

const collection = db.get("forms");

export const create = async (payload) => {
    const item = collection.insert(payload).write();
    return item;
};

export const findAll = async () => {
    return collection.chain().cloneDeep().value();
};

export const findById = async (id) => {
    return collection.find({id}).value();
};

export const update = async (id, payload) => {
    collection.find({id}).assign(payload).write();
    return findById(id);
};

export const remove = async (id) => {
    collection.remove({id}).write();
};