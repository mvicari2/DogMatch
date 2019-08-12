import axios from 'axios';
import config from '../config/config';

const api = axios.create({
    baseURL: `${config.api}`,
});

export const postDoggo = payload => api.post(`/dog`, payload);
export const uploadProfilePicture = profilePicture => api.post(`/uploadProfilePicture`, profilePicture);
export const getAllDoggos = () => api.get(`/dog`);
export const updateDoggoById = (id, payload) => api.put(`/dog/${id}`, payload);
export const deleteDoggoById = id => api.delete(`/dog/${id}`);
export const getDoggoById = id => api.get(`/dog/${id}`);

const apis = {
    postDoggo,
    uploadProfilePicture,
    getAllDoggos,
    updateDoggoById,
    deleteDoggoById,
    getDoggoById
};

export default apis;