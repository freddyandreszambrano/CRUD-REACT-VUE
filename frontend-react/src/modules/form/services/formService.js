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
        throw new Error(message);
    }
);

export const saveForm = async (data) => {
    try {
        const response = await api.post("/", data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getForms = async () => {
    try {
        const response = await api.get("/");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getFormById = async (id) => {
    try {
        const response = await api.get(`/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateForm = async (id, data) => {
    try {
        const response = await api.put(`/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteForm = async (id) => {
    try {
        await api.delete(`/${id}`);
        return {success: true};
    } catch (error) {
        throw error;
    }
};

