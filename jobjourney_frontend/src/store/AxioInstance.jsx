
import axios from "axios";
// import Cookies from "js-cookie";
const axiosInstance = axios.create({
  baseURL:"http://127.0.0.1:8000/",  
});

axiosInstance.interceptors.request.use((config) => {
//   const token = Cookies.get("accessToken");
 const token=localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
