import { GET_USER_DATA_ACTION } from "./getUserDataAction"

const initialState = []

const getUserDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_DATA_ACTION:
            state = action.payload.msg === 'err' ? [] : action.payload
            return state
        default: 
            return state
    }
}

export default getUserDataReducer