import axios from 'axios';
import config from '../config/config';

const api = axios.create({
    baseURL: `${config.api}`,
});

export const postDoggo = payload => api.post(`/dog`, payload);
export const getAllDoggos = () => api.get(`/dog`);
export const updateDoggoById = (id, payload) => api.put(`/dog/${id}`, payload);
export const updateTemperamentById = (id, payload) => api.put(`/dog/temperament/${id}`, payload);
export const updateBiographyById = (id, payload) => api.put(`/dog/biography/${id}`, payload);
export const updateAlbumFileNamesById = (id, payload) => api.put(`/dog/album/${id}`, payload);
export const deleteDoggoById = id => api.delete(`/dog/${id}`);
export const getDoggoById = id => api.get(`/dog/${id}`);
export const uploadProfilePicture = profilePicture => api.post(`/uploadProfilePicture`, profilePicture);
export const uploadAlbum = albumFiles => api.post(`uploadAlbum`, albumFiles); 

const apis = {
    postDoggo,    
    getAllDoggos,
    updateDoggoById,
    updateTemperamentById,
    updateBiographyById,
    updateAlbumFileNamesById,
    deleteDoggoById,
    getDoggoById,
    uploadProfilePicture,
    uploadAlbum
};

export default apis;