const News = (state=[], action) => {
    switch (action.type) {
        case 'NEWS_SUCCESS':
            console.log(action.type);
            console.log(action.news);
            return action.news;
        default:
            return state;
    }
};

export default News;