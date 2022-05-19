import deepCopy from "../copyStateHelper"
import { GET_DATA_ACTION } from "./getDataAction"

const initialState = []

const getDataReducer = (state = initialState, action) => {
    let newState = deepCopy(state)
    switch (action.type) {
        case GET_DATA_ACTION:
            newState = action.payload.data.msg === 'err' ? {} : action.payload.data
            return newState
        default: 
            return newState
    }
}

export default getDataReducer