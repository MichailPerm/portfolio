import { combineReducers } from 'redux';
import News from './News';

const newsFetching = (state=false, action) => {
    if (action.type == 'NEWS_FETCHING') {
        return action.bool;
    }
    return state;
};

const newsError = (state=false, action) => {
    if (action.type == 'NEWS_ERROR') {
        return action.bool;
    }
    return state;
};

const RootReducer = combineReducers({
    News,
    newsFetching,
    newsError
});

export default RootReducer;