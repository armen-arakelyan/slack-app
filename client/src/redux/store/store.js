import { combineReducers } from 'redux'
import getDataReducer from "../getData/getDataReducer"
import getUserDataReducer from '../getUserData/getUserDataReducer'
import ChannelsReducer from '../Channels/ChannelsReducer'

const rootReducer = combineReducers({
    data: getDataReducer,
    userData: getUserDataReducer,
    channels: ChannelsReducer
})

export default rootReducer