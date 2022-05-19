import { GET_CHANNELS_ACTION, REMOVE_CHANNEL_ACTION, UPDATE_CHANNEL_ACTION } from "./ChannelsAction"
import deepCopy from '../copyStateHelper'

const initialState = []

const getChannelsReducer = (state = initialState, action) => {
    let newState = deepCopy(state)
    switch (action.type) {
        case GET_CHANNELS_ACTION:
            Array.isArray(action.payload) ? newState = action.payload : newState.unshift(action.payload)
            return newState
        case REMOVE_CHANNEL_ACTION:
            newState = action.payload.msg === 'ok' ? newState.filter(v => v._id !== action.payload.data._id) : newState
            return newState
        case UPDATE_CHANNEL_ACTION:
            newState = action.payload.channel.msg === 'ok' ? newState.map(v => {
                if (v._id === action.payload.channel.data._id) {
                    v.channels = action.payload.newData
                }
                return v
            }) : newState
            return newState
        default:
            return newState
    }
}

export default getChannelsReducer