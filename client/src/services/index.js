import axios from "axios";
import axiosInstance from "./axiosInstance";

const URL = "http://localhost:8080";

export const getUser = (data) => axios.post(`${URL}/${"getUser"}`, data);

export const addUser = (data) => axios.post(`${URL}/addUser`, data);

export const loginedPerson = () => axiosInstance.get(`/loginedPerson/`);

export const addChannel = (data) => axios.put(`${URL}/addChannel/${data}`);

export const getChannels = () => axios.get(`${URL}/getChannels`);

export const removeChannel = (data) => axios.delete(`${URL}/removeChannel/${data}`);

export const updateChannel = (id, data) => axios.put(`${URL}/updateChannel/${id}/${data}`);
