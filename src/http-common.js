import axios from "axios";

let instance = axios.create({
  withCredentials: true,
  baseURL: "http://192.168.200.83:8000/api/",
});

instance.interceptors.request.use((request) => {
  request.headers.common["Accept"] = "application/json";
  request.headers.common["Content-Type"] = "application/json";
  request.headers.common["X-Requested-With"] = "XMLHttpRequest";
  return request;
});

export default instance;
