const News = (state=[], action) => {
    switch (action.type) {
        case 'NEWS_SUCCESS':
            return action.news;
        default:
            return state;
    }
};

export default News;