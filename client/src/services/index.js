import axios from 'axios'

const URL = 'http://localhost:8080'

export const getUser = (data) => axios.post(`${URL}/${'getUser'}`, data)

export const addUser = (data) => axios.post(`${URL}/addUser`, data)

export const loginedPerson = (data) => axios.get(`${URL}/loginedPerson/${data}`)

export const addChannel = (data) => axios.put(`${URL}/addChannel/${data}`)

export const getChannels = () => axios.get(`${URL}/getChannels`)

export const removeChannel = (data) => axios.delete(`${URL}/removeChannel/${data}`)

export const updateChannel = (id, data) => axios.put(`${URL}/updateChannel/${id}/${data}`)