
// import axios from "axios";
// // import Cookies from "js-cookie";
// const axiosInstance = axios.create({
//   baseURL:"http://51.21.215.128",  
// });

// axiosInstance.interceptors.request.use((config) => {
// //   const token = Cookies.get("accessToken");
//  const token=localStorage.getItem('accessToken')
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default axiosInstance;




import axios from "axios";

// Authenticated instance
export const axiosInstance = axios.create({
  baseURL: "http://51.21.215.128",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Public instance (no auth)
export const publicAxios  = axios.create({
  baseURL: "http://51.21.215.128",
});
