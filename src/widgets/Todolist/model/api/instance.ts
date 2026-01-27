import axios from "axios";

export const token = "4acae942-c11d-468d-b586-f24655e1ab79";
export const apiKey = 'c7914623-2a98-4760-8469-615652ae5621';


export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1",
  headers: {
    Authorization: `Bearer ${token}`,
    'API-KEY': apiKey,
  }
});