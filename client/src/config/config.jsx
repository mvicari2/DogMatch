// set server
const server = 'http://localhost:3000';

// set api url
const api = server + '/api';

// set profile pic directory
const profilePicDir = server + '/uploads/profile/';

// set profile pic directory
const albumPicDir = server + '/uploads/album/';

// upload profile pic api url
const profilePicApi = 'http://localhost:3000/api/uploadProfilePicture';

const albumApi = 'http://localhost:3000/api/uploadAlbum'

const config = {
    api,
    profilePicDir,
    profilePicApi,
    albumPicDir,
    albumApi

};

export default config;