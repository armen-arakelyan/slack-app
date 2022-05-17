export const GET_USER_DATA_ACTION = 'GET_USER_DATA_ACTION'

export const getUserDataAction = (data) => {
    return {
        type: GET_USER_DATA_ACTION,
        payload: data
    }
}