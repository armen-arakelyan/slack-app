export const GET_DATA_ACTION = 'GET_DATA_ACTION'

export const getDataAction = (data) => {
    return {
        type: GET_DATA_ACTION,
        payload: data
    }
}