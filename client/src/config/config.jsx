//Set server
const server = 'http://localhost:3000';

//set api url
const api = server + '/api';

//set profile pic directory
const profilePicDir = server + '/uploads/profile/';

//upload profile pic api url
const profilePicApi = 'http://localhost:3000/api/UploadProfilePicture';

const config = {
    api,
    profilePicDir,
    profilePicApi

};

export default config;