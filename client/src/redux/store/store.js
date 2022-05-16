import { combineReducers } from 'redux'
import getDataReducer from "../getData/getDataReducer"

const rootReducer = combineReducers({
    data: getDataReducer
})

export default rootReducer