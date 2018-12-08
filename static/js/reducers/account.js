export const account = (state={}, action) => {
    switch (action.type) {
        case 'SET_ACCOUNT':
            return action.account;
        case 'DROP_ACCOUNT':
            return {};
        default:
            return state;
    }
};

export const accountError = (state='', action) => {
    if (action.type == 'ERR_ACCOUNT') {
        return '';
    }
    return state;
};