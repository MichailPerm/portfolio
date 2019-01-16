import { combineReducers } from 'redux';
import { News, newsFetching, newsError } from './News';
import { account, accountError } from './account';
import about from './about';

const editorState = (state={}, action) => {
    if (action.type === 'RELOAD_EDITOR_STATE') {
        if (!action.editorState) {
            return state;
        }
        return action.editorState;
    }
    return state;
};

const anchorEl = (state={}, action) => {
    switch (action.type) {
        case 'SET_ANCHOR':
            return action.event.currentTarget;
        case 'DROP_ANCHOR':
            return null;
        default:
            return state;
    }
};

const RootReducer = combineReducers({
    News,
    newsFetching,
    newsError,
    account,
    accountError,
    editorState,
    anchorEl,
    about
});

export default RootReducer;