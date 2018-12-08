export const News = (state=[], action) => {
    switch (action.type) {
        case 'NEWS_SUCCESS':
            return action.news;
        case 'NEW_POST_ERROR':
            alert('Недопустимо вводить теги в полях ввода!');
            return state;
        default:
            return state;
    }
};

export const newsFetching = (state=false, action) => {
    if (action.type == 'NEWS_FETCHING') {
        return action.bool;
    }
    return state;
};

export const newsError = (state=false, action) => {
    if (action.type == 'NEWS_ERROR') {
        return action.bool;
    }
    return state;
};
