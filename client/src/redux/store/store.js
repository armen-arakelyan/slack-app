import { combineReducers } from 'redux'
import getDataReducer from "../getData/getDataReducer"
import getUserDataReducer from '../getUserData/getUserDataReducer'
import getChannelsReducer from '../getChannels/getChannelsReducer'

const rootReducer = combineReducers({
    data: getDataReducer,
    userData: getUserDataReducer,
    channels: getChannelsReducer
})

export default rootReducer