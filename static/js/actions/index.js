import { config } from '../../config';

let request_url = '';
let post_url = '';
let login_url = '';
let about_url = '';
let delete_url = '';

if (config.config === 'devel') {
    const request_url = config.server.protocol+'://'+config.server.name+':'+config.server.port + config.pages.news;
    const post_url = config.server.protocol+'://'+config.server.name+':'+config.server.port + config.pages.post;
    const login_url = config.server.protocol+'://'+config.server.name+':'+config.server.port + config.pages.login;
    const about_url = config.server.protocol+'://'+config.server.name+':'+config.server.port + config.pages.about;
    const delete_url = config.server.protocol+'://'+config.server.name+':'+config.server.port + config.pages.deleteNew;
} else {
    const request_url = config.server.protocol+'://'+config.server.name + config.pages.news;
    const post_url = config.server.protocol+'://'+config.server.name + config.pages.post;
    const login_url = config.server.protocol+'://'+config.server.name + config.pages.login;
    const about_url = config.server.protocol+'://'+config.server.name + config.pages.about;
    const delete_url = config.server.protocol+'://'+config.server.name + config.pages.deleteNew;
}

export const newsFetching = (bool) => {
    return {
        type: 'NEWS_FETCHING',
        bool
    };
};

export const newsError = (bool) => {
    return {
        type: 'NEWS_ERROR',
        bool
    };
};

export const newsSuccess = (news) => {
    return {
        type: 'NEWS_SUCCESS',
        news
    };
};

export const fetchNewsFromServer = () => {
    return (dispatch) => {
        dispatch(newsFetching(true));
        fetch(request_url)
            .then(res => res.json())
            .then(news => {
                dispatch(newsFetching(false));
                dispatch(newsError(false));
                dispatch(newsSuccess(JSON.parse(news)));
            })
            .catch(dispatch(newsError(true)));
    };
};

export const postNews = (newAuthor, newTitle, newText) => {
    return (dispatch) => {
        fetch(post_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author: newAuthor.value,
                title: newTitle.value,
                text: newText.value
            })
        })
            .then(dispatch(fetchNewsFromServer()));
    };
};

export const sendAuthRequest = (login, pass) => {
    return (dispatch) => {
        fetch(login_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: login.value,
                pass: pass.value
            })
        })
            .then(res => res.json())
            .then(token => dispatch(setToken(token)))
            .catch(() => dispatch(setToken(null)));
    };
};

export const setToken = (token) => {
    return {
        type: 'SET_TOKEN',
        token
    };
};

export const getAbout = () => {
    return (dispatch) => {
        fetch(about_url, {method: 'GET'})
            .then(res => res.json())
            .then(about => dispatch(setAbout(about)))
    };
};

export const setAbout = (about) => {
    return {
        type: 'SET_ABOUT',
        about
    };
};

export const deleteNew = (idx) => {
    return (dispatch) => {
        fetch(delete_url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idx: idx, 
            })
        })
            .then(() => dispatch(fetchNewsFromServer()));
    };
};