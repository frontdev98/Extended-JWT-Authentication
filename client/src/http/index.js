import axios from 'axios'

export const API_URL = `http://localhost:5000/api`

const $api = axios.create({
    withCredentials: true,  // cookie assigned automatically
    baseURL: API_URL        // this string will be added to URL during each request
})

// intercepter for each request from the client:
// - add header "Authorization" with payload (fetch that from localStorage)
$api.interceptors.request.use((requestConfig) => {
    requestConfig.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return requestConfig;    
})

export default $api;