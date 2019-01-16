// App.jsx
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import { fetchNewsFromServer, postNews, sendAuthRequest, getAbout, deleteNew, dropToken, setEditorState, setAnchor, dropAnchor } from '../actions/';
import Header from '../components/nav/header';
import News from '../components/pages/news.js';
import Admin from '../components/pages/admin.js';
import Login from '../components/pages/login.js';
import About from '../components/pages/about';
import Portfolio from '../components/pages/portfolio';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        flexGrow: 1,
    },
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        width: '60%',
        margin: 'auto',
        position: 'relative',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
});

class App extends React.Component {
    componentDidMount() {
        this.props.fetchNewsFromServer();
    }

    render () {
        return (
            <div>
                <Header fetchNewsFromServer={this.props.fetchNewsFromServer}
                    getAbout={this.props.getAbout}
                    dropToken={this.props.dropToken}
                    token={this.props.account.access_token}
                    setAnchor={this.props.setAnchor}
                    dropAnchor={this.props.dropAnchor}
                    anchorEl={this.props.anchorEl}
                    classes={this.props.classes}/>
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
                        News={this.props.News}
                        classes={this.props.classes}/>
                )}/>
                <Route path="/admin" render={props => (
                    this.props.account.access_token ? (
                        <Admin {...props}
                            postNews={this.props.postNews}
                            deleteNew={this.props.deleteNew}
                            News={this.props.News}
                            account={this.props.account}
                            editorState={this.props.editorState}
                            setEditorState={this.props.setEditorState}/>
                    ) : (
                        <Redirect to="/setLogin"/>
                    )
                )}/>
                <Route path="/setLogin" render={props => (
                    this.props.account.access_token ? (
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
        account: state.account,
        editorState: state.editorState,
        anchorEl: state.anchorEl
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchNewsFromServer: () => dispatch(fetchNewsFromServer()),
        postNews: (newAuthor, newTitle, newText) => dispatch(postNews(newAuthor, newTitle, newText)),
        sendAuthRequest: (login, pass) => dispatch(sendAuthRequest(login, pass)),
        getAbout: () => dispatch(getAbout()),
        deleteNew: (newId) => dispatch(deleteNew(newId)),
        dropToken: () => dispatch(dropToken()),
        setEditorState: (editorState) => dispatch(setEditorState(editorState)),
        setAnchor: (bool) => dispatch(setAnchor(bool)),
        dropAnchor: () => dispatch(dropAnchor())
    };
};

export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App))));
