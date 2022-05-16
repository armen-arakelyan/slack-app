import axios from 'axios'

const URL = 'http://localhost:8080'

export const getUser = (data) => axios.get(`${URL}/${'getUser'}/${JSON.stringify(data)}`)

export const addUser = (data) => axios.post(`${URL}/addUser`, data)