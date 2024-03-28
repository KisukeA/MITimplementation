import axios from "axios"

export const makeRequest = axios.create({
    baseURL: "http://88.200.63.148:8068/server/",
    withCredentials: true,
});