const initialState = ''

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data
        case 'CLEAR':
            return initialState
        default:
            return state
    }
}

export const setNotification = (notification, seconds) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: notification
        })
        setTimeout(() => {
            dispatch(clearNotification())
        }, seconds * 1000)
    }
}

export const clearNotification = () => {
    return {type: 'CLEAR'}
}

export default notificationReducer