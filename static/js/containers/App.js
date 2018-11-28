// App.jsx
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

import { fetchNewsFromServer } from '../actions/';
import { Header } from '../components/header';
import News from '../components/news.js';

class App extends React.Component {
    componentDidMount() {
        this.props.fetchNewsFromServer();
    }

    render () {
        return (
            <div>
                <Header/>
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
        fetchNewsFromServer: () => dispatch(fetchNewsFromServer())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
