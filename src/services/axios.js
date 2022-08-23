import axios from "axios";

const instance = axios.create({
  baseURL: "https://my-json-server.typicode.com/benirvingplt/products/",
  headers: {
    "x-access-token": JSON.parse(localStorage.getItem("UserData"))?.token,
  },
});
export default instance;
