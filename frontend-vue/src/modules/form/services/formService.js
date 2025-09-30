import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:4000/api/forms",
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.error || error.message || "Error desconocido";
        console.error("API Error:", message);
        return Promise.reject(new Error(message));
    }
);


export default {
    async insert(data) {
        try {
            const response = await api.post("/", data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async getAll() {
        try {
            const response = await api.get("/");
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async getById(id) {
        try {
            const response = await api.get(`/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async update(id, data) {
        try {
            const response = await api.put(`/${id}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async remove(id) {
        try {
            await api.delete(`/${id}`);
            return {success: true};
        } catch (error) {
            throw error;
        }
    },
};