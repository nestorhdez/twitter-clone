import axios from 'axios'
import router from './router'

const AuthAxios = axios.create();

AuthAxios.interceptors.request.use((config) => {
        const tokenObj = localStorage.getItem('jwt');
        const token = JSON.parse(tokenObj).access_token
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, (error) => {
        console.log("Request error: " + error)
  })

AuthAxios.interceptors.response.use( (response) => {
        // Return a successful response back to the calling service
        return response;
    }, (error) => {
        // Return any error which is not due to authentication back to the calling service
        if (error.response.status !== 401) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
        if(error.response.status == 401 ){
            const tokenObj = localStorage.getItem('jwt');
            const token = JSON.parse(tokenObj)
            return axios.post('http://localhost:3001/twitter/token', {refresh_token: token.refresh_token, grant_type: "refresh_token"})
                .then(res => {
                    localStorage.removeItem('jwt')
                    localStorage.setItem('jwt', JSON.stringify(res.data))

                    // New request with new token
                    const config = error.config;
                    config.headers.Authorization = `Bearer ${res.data.access_token}`;

                    return axios(config)
                })
                .catch(function(err) {
                    console.log('Catch', err)
                    localStorage.removeItem('jwt')
                    router.replace('/login')
                })
        }
    });

export default AuthAxios;