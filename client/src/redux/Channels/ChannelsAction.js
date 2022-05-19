export const GET_CHANNELS_ACTION = 'GET_CHANNELS_ACTION'
export const REMOVE_CHANNEL_ACTION = 'REMOVE_CHANNEL_ACTION'
export const UPDATE_CHANNEL_ACTION = 'UPDATE_CHANNEL_ACTION'

export const getChannelsAction = (data) => {
    return {
        type: GET_CHANNELS_ACTION,
        payload: data
    }
}

export const removeChannelAction = (data) => {
    return {
        type: REMOVE_CHANNEL_ACTION,
        payload: data
    }
}

export const updateChannelAction = (channel, newData) => {
    return {
        type: UPDATE_CHANNEL_ACTION,
        payload: { channel, newData }
    }
}