import axios from "axios";
//Todo colectar mediante envs vars, android e IOSs

const productsApi = axios.create({
  baseURL: "localhost:3000/api",
});

//TODO interceptores
export { productsApi };
