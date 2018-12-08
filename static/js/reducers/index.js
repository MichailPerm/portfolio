import { combineReducers } from 'redux';
import { News, newsFetching, newsError } from './News';
import { account, accountError } from './account';
import about from './about';

const RootReducer = combineReducers({
    News,
    newsFetching,
    newsError,
    account,
    accountError,
    about
});

export default RootReducer;