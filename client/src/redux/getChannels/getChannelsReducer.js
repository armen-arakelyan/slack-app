import { GET_CHANNELS_ACTION } from "./getChannelsAction"
import deepCopy from '../copyStateHelper'

const initialState = []

const getChannelsReducer = (state = initialState, action) => {
    let newState = deepCopy(state)
    switch (action.type) {
        case GET_CHANNELS_ACTION:
            Array.isArray(action.payload) ? newState = action.payload : newState.push(action.payload)
            return newState
        default: 
            return newState
    }
}

export default getChannelsReducer