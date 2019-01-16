import { config } from '../../config';

let request_url = '';
let post_url = '';
let login_url = '';
let about_url = '';
let delete_url = '';

if (config.config === 'debug') {
    request_url = config.dev_server.protocol+'://'+config.dev_server.name+':'+config.dev_server.port + config.pages.news;
    post_url = config.dev_server.protocol+'://'+config.dev_server.name+':'+config.dev_server.port + config.pages.post;
    login_url = config.dev_server.protocol+'://'+config.dev_server.name+':'+config.dev_server.port + config.pages.login;
    about_url = config.dev_server.protocol+'://'+config.dev_server.name+':'+config.dev_server.port + config.pages.about;
    delete_url = config.dev_server.protocol+'://'+config.dev_server.name+':'+config.dev_server.port + config.pages.deleteNew;
} else {
    request_url = config.prod_server.protocol+'://'+config.prod_server.name + config.pages.news;
    post_url = config.prod_server.protocol+'://'+config.prod_server.name + config.pages.post;
    login_url = config.prod_server.protocol+'://'+config.prod_server.name + config.pages.login;
    about_url = config.prod_server.protocol+'://'+config.prod_server.name + config.pages.about;
    delete_url = config.prod_server.protocol+'://'+config.prod_server.name + config.pages.deleteNew;
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
                dispatch(dropAnchor());
            })
            .catch(dispatch(newsError(true)));
    };
};

export const postNews = (newAuthor, newTitle, newText) => {
    let htmlRegexp = /<[^>]+>/g;

    let titleCheck = newTitle.value.match(htmlRegexp);
    return (dispatch) => {

        if (titleCheck != null) {
            dispatch(postNewError());
            return;
        }
        fetch(post_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author: newAuthor.value,
                title: newTitle.value,
                text: newText
            })
        })
            .then(dispatch(fetchNewsFromServer()));
    };
};

export const postNewError = () => {
    return {
        type: 'NEW_POST_ERROR'
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
            .then(account => dispatch(setToken(JSON.parse(account))))
            .catch(account => dispatch(errToken(account)));
    };
};

export const setToken = (account) => {
    return {
        type: 'SET_ACCOUNT',
        account
    };
};

export const errToken = (account) => {
    return {
        type: 'ERR_ACCOUNT',
        account
    };
};

export const dropToken = () => {
    return {
        type: 'DROP_ACCOUNT',
    };
};

export const getAbout = () => {
    return (dispatch) => {
        fetch(about_url, {method: 'GET'})
            .then(res => res.json())
            .then(about => dispatch(setAbout(about)));
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

export const setEditorState = (editorState) => {
    return {
        type: 'RELOAD_EDITOR_STATE',
        editorState
    };
};

export const setAnchor = (event) => {
    return {
        type: 'SET_ANCHOR',
        event
    };
};

export const dropAnchor = () => {
    return {
        type: 'DROP_ANCHOR',
    };
};