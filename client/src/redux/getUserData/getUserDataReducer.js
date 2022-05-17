import deepCopy from "../copyStateHelper"
import { GET_USER_DATA_ACTION } from "./getUserDataAction"

const initialState = []

const getUserDataReducer = (state = initialState, action) => {
    let newState = deepCopy(state)
    switch (action.type) {
        case GET_USER_DATA_ACTION:
            newState = action.payload
            return newState
        default: 
            return newState
    }
}

export default getUserDataReducer