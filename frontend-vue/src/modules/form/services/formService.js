import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:4000/forms",
});

export default {
    async insert(data) {
        return api.post("/", data);
    },
    async getAll() {
        const res = await api.get("/");
        return res.data;
    },
    async remove(id) {
        return api.delete(`/${id}`);
    },
};
