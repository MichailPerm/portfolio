// App.jsx
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

import { fetchNewsFromServer, postNews } from '../actions/';
import { Header } from '../components/header';
import News from '../components/news.js';
import Admin from '../components/admin.js';

class App extends React.Component {
    componentDidMount() {
        this.props.fetchNewsFromServer();
    }

    render () {
        return (
            <div>
                <Header fetchNewsFromServer={this.props.fetchNewsFromServer}/>
                <Route exact path="/" render={() => (
                    this.props.newsFetching ? (
                        <h4>News Loading</h4>
                    ) : (
                        this.props.newsError ? (
                            <h4>News Fetching Error</h4>
                        ) : (
                            <Redirect to="/newsGet"/>
                        )
                    )
                )}/>
                <Route path="/newsGet" render={props => (
                    <News {...props}
                        News={this.props.News}/>
                )}/>
                <Route path="/admin" render={props => (
                    <Admin {...props}
                        postNews={this.props.postNews}/>
                )}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        News: state.News,
        newsFetching: state.newsFetching,
        newsError: state.newsError
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchNewsFromServer: () => dispatch(fetchNewsFromServer()),
        postNews: (newAuthor, newTitle, newText) => dispatch(postNews(newAuthor, newTitle, newText))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
