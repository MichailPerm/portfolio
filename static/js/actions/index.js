import { config } from '../../config';

const request_url = config.server.protocol+'://'+config.server.name+':'+config.server.port + config.pages.news;

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
    console.log('News dispatching!!!');
    console.log('Url: ', request_url);
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