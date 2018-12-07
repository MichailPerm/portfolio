import { combineReducers } from 'redux';
import News from './News';
import about from './about';

const newsFetching = (state=false, action) => {
    if (action.type == 'NEWS_FETCHING') {
        return action.bool;
    }
    return state;
};

const token = (state='', action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return action.token.access_token;
        case 'DROP_TOKEN':
            return '';
        default:
            return state;
    }
};

const newsError = (state=false, action) => {
    if (action.type == 'NEWS_ERROR') {
        return action.bool;
    }
    return state;
};

const tokenError = (state='', action) => {
    if (action.type == 'ERR_TOKEN') {
        return '';
    }
    return state;
};

const RootReducer = combineReducers({
    News,
    newsFetching,
    newsError,
    token,
    tokenError,
    about
});

export default RootReducer;