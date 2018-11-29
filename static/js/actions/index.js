import { config } from '../../config';

const request_url = config.server.protocol+'://'+config.server.name+':'+config.server.port + config.pages.news;
const post_url = config.server.protocol+'://'+config.server.name+':'+config.server.port + config.pages.post;

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
    console.log(newAuthor.value, newText.value, newTitle.value);
    return () => {
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
        });
    };
};