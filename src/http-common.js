import axios from 'axios'

let instance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8000/api"
});

instance.interceptors.request.use(request => {
  request.headers.common['Accept'] = 'application/json';
  request.headers.common['Content-Type'] =  'application/json';
  return request;
});

export default instance;
