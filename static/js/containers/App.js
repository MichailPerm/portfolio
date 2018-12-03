// App.jsx
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

import { fetchNewsFromServer, postNews, sendAuthRequest, getAbout, deleteNew } from '../actions/';
import Header from '../components/nav/header';
import News from '../components/pages/news.js';
import Admin from '../components/pages/admin.js';
import Login from '../components/pages/login.js';
import About from '../components/pages/about';
import Portfolio from '../components/pages/portfolio';

class App extends React.Component {
    componentDidMount() {
        this.props.fetchNewsFromServer();
    }

    render () {
        return (
            <div>
                <Header fetchNewsFromServer={this.props.fetchNewsFromServer}
                        getAbout={this.props.getAbout}/>
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
                    this.props.token ? (
                        <Admin {...props}
                            postNews={this.props.postNews}
                            deleteNew={this.props.deleteNew}
                            News={this.props.News}/>
                    ) : (
                        <Redirect to="/setLogin"/>
                    )
                )}/>
                <Route path="/setLogin" render={props => (
                    this.props.token ? (
                        <Redirect to="/admin"/>
                    ) : (
                        <Login {...props}
                            sendAuthRequest={this.props.sendAuthRequest}/>   
                    )
                )}/>
                <Route path="/about" render={props => (
                    <About {...props}/>
                )}/>
                <Route path="/portfolio" render={props => (
                    <Portfolio {...props}/>
                )}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        News: state.News,
        newsFetching: state.newsFetching,
        newsError: state.newsError,
        token: state.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchNewsFromServer: () => dispatch(fetchNewsFromServer()),
        postNews: (newAuthor, newTitle, newText) => dispatch(postNews(newAuthor, newTitle, newText)),
        sendAuthRequest: (login, pass) => dispatch(sendAuthRequest(login, pass)),
        getAbout: () => dispatch(getAbout()),
        deleteNew: (newId) => dispatch(deleteNew(newId))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
