export const GET_CHANNELS_ACTION = 'GET_CHANNELS_ACTION'

export const getChannelsAction = (data) => {
    return {
        type: GET_CHANNELS_ACTION,
        payload: data
    }
}