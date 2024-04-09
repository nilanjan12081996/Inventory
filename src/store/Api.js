import axios from 'axios';
const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

const formDataURL = [
  'service/uploadItem',
];
api.interceptors.request.use((req) => {
  let userTokenData;
  try {
    userTokenData = JSON.parse(sessionStorage.getItem('adminToken'));
  } catch (error) {
    userTokenData = null;
  }
  let token = userTokenData && userTokenData.token ? userTokenData.token : null;
  req.headers['Content-Type'] = 'application/json';
  // // Find the last index of "/"
  // const lastSlashIndex = req.url.lastIndexOf('/');

  // // Remove the dynamic part after the last slash
  // const urlWithoutDynamicPart =
  //   lastSlashIndex !== -1 ? req.url.slice(0, lastSlashIndex + 1) : req.url;
  // if (formDataURL.includes(urlWithoutDynamicPart)) {
  //   req.headers['Content-Type'] = 'multipart/form-data';
  // }

  if (formDataURL.includes(req.url)) {
    req.headers['Content-Type'] = 'multipart/form-data';
  }
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && [401, 403].includes(error.response.status)) {
      localStorage.removeItem('userToken');
    }
    return Promise.reject(error);
  }
);

export default api;
