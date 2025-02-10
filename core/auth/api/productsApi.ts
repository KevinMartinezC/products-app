import axios from "axios";
import { Platform } from "react-native";
//Todo colectar mediante envs vars, android e IOSs

const STAGE = process.env.EXPO_PUBLIC_STAGE || "dev";
export const API_URL =
  STAGE === "prod"
    ? process.env.EXPO_PUBLIC_API_URL
    : Platform.OS === "ios"
    ? process.env.EXPO_PUBLIC_API_IOS
    : process.env.EXPO_PUBLIC_API_ANDROID;

console.log({ STAGE, [Platform.OS]: API_URL });
const productsApi = axios.create({
  baseURL: API_URL,
});

//TODO interceptores
export { productsApi };
