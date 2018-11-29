// index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import App from './containers/App';
import RootReducer from './reducers';

const initialState = {
    News: [],
    newsFetching: true,
    newsError: false,
    token: '',
    about: {}
};

const store = createStore(
    RootReducer,
    initialState,
    applyMiddleware(
        thunk
    )
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('content')
);  