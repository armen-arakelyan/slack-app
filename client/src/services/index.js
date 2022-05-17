import axios from 'axios'

const URL = 'http://localhost:8080'

export const getUser = (data) => axios.post(`${URL}/${'getUser'}`, data)

export const addUser = (data) => axios.post(`${URL}/addUser`, data)

export const loginedPerson = (data) => axios.get(`${URL}/loginedPerson/${data}`)