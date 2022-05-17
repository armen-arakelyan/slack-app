import { combineReducers } from 'redux'
import getDataReducer from "../getData/getDataReducer"
import getUserDataReducer from '../getUserData/getUserDataReducer'

const rootReducer = combineReducers({
    data: getDataReducer,
    userData: getUserDataReducer
})

export default rootReducer