import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
});

export const postDoggo = payload => api.post(`/dog`, payload);
export const getAllDoggos = () => api.get(`/dog`);
export const updateDoggoById = (id, payload) => api.put(`/dog/${id}`, payload);
export const deleteDoggoById = id => api.delete(`/dog/${id}`);
export const getDoggoById = id => api.get(`/dog/${id}`);

const apis = {
    postDoggo,
    getAllDoggos,
    updateDoggoById,
    deleteDoggoById,
    getDoggoById,
};

export default apis;