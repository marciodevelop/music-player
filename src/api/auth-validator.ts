import axios from "axios";

export const apiBase = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
});

const endPointToken = 'https://accounts.spotify.com/api/token';

const bodyConfigAuth = {
    grant_type: 'client_credentials',
    client_id: 'f09b8aa7455e441fb9d49dc42fc5f72a',
    client_secret: '2715a791f3624dff94cac07dfee52a4f'
}

let expirationTimeOfToken = 0;
let accessToken = localStorage.getItem('token') || '';

const getAccessToken = () => {
  const currentTime = Date.now();
  if(accessToken && currentTime < expirationTimeOfToken){
    return Promise.resolve(accessToken);
  }
  
  return axios.post(endPointToken, new URLSearchParams(bodyConfigAuth).toString()).then(response => {
    const token =  response.data.access_token;
    localStorage.setItem('token', token);

    if(response.data && response.data.access_token){
      accessToken = response.data.access_token;
      expirationTimeOfToken = currentTime + (response.data.expires_in * 1000);

      return token;
    }else{

      throw new Error('falha ao buscar token de acesso!')
    }

  }).catch(error => {
    throw error;
  })
}


apiBase.interceptors.request.use(
  config => {
   if(accessToken){
    config.headers['Authorization'] = `Bearer ${accessToken}`;
   }
   return config;
  },
  error => Promise.reject(error)
  
);

apiBase.interceptors.response.use(response => {
  return response;
},
error => {
  const requestError = error.config;
  if(error.response && error.response.data.error.status == 401 && !requestError._retry){
    requestError._retry = true;
    return getAccessToken().then(newToken => {
      requestError.headers['Authorization'] = `Bearer ${newToken}`;
      return apiBase(requestError);
    }).catch(error => Promise.reject(error))
  }
  return Promise.reject(error)
}
)

