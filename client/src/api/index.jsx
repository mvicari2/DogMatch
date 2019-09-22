import axios from 'axios';
import config from '../config/config';

const api = axios.create({
    baseURL: `${config.api}`,
});

// Dog Controller Requests
export const postDoggo = payload => 
    api.post(`/dog`, payload);

export const getAllDoggos = () => 
    api.get(`/dog`);

export const updateDoggoById = (id, payload) => 
    api.put(`/dog/${id}`, payload);

export const updateTemperamentById = (id, payload) => 
    api.put(`/dog/temperament/${id}`, payload);

export const updateBiographyById = (id, payload) => 
    api.put(`/dog/biography/${id}`, payload);

export const updateAlbumFileNamesById = (id, payload) => 
    api.put(`/dog/album/${id}`, payload);

export const deleteDoggoById = id => 
    api.delete(`/dog/${id}`);

export const getDoggoById = id => 
    api.get(`/dog/${id}`);

export const uploadProfilePicture = profilePicture => 
    api.post(`/uploadProfilePicture`, profilePicture);

export const uploadAlbum = albumFiles => 
    api.post(`uploadAlbum`, albumFiles);



// Temperament Controller Requests
export const updateSectionOneById = (id, payload) => 
    api.put(`/temperament/sectionOne/${id}`, payload);

export const updateSectionTwoById = (id, payload) => 
    api.put(`/temperament/sectionTwo/${id}`, payload);

export const updateSectionThreeById = (id, payload) => 
    api.put(`/temperament/sectionThree/${id}`, payload);

export const updateSectionFourById = (id, payload) => 
    api.put(`/temperament/sectionFour/${id}`, payload);

export const updateSectionFiveById = (id, payload) => 
    api.put(`/temperament/sectionFive/${id}`, payload);

export const updateSectionSixById = (id, payload) => 
    api.put(`/temperament/sectionSix/${id}`, payload);

export const updateSectionSevenById = (id, payload) => 
    api.put(`/temperament/sectionSeven/${id}`, payload);


const apis = {
    // Dog Controller APIs
    postDoggo,    
    getAllDoggos,
    updateDoggoById,
    updateTemperamentById,
    updateBiographyById,
    updateAlbumFileNamesById,
    deleteDoggoById,
    getDoggoById,
    uploadProfilePicture,
    uploadAlbum,

    //Temperament Controller APIs
    updateSectionOneById,
    updateSectionTwoById,
    updateSectionThreeById,
    updateSectionFourById,
    updateSectionFiveById,
    updateSectionSixById,
    updateSectionSevenById,
};

export default apis;