import { GET_DATA_ACTION } from "./getDataAction"

const initialState = []

const getDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA_ACTION:
            return console.log('test')
        default: 
            return state
    }
}

export default getDataReducer