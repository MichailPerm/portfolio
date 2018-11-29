const about = (state={}, action) => {
    switch(action.type) {
        case 'FETCH_ABOUT':
            return action.about;
        default:
            return state;
    }
}

export default about;