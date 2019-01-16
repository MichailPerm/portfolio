//Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
/* font-family: 'Marck Script', cursive;
font-family: 'Exo 2', sans-serif; */


const Header = (props) => {
    const { fetchNewsFromServer, token, dropToken, setAnchor, dropAnchor, anchorEl, classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton  className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon
                            aria-owns={anchorEl ? 'simple-menu' : undefined}
                            aria-haspopup="true"
                            onClick={setAnchor}>
                        </MenuIcon>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={dropAnchor}>
                            <MenuItem><Link to="/newsGet" onClick={fetchNewsFromServer}>Новости</Link></MenuItem>
                            <MenuItem><Link to="/portfolio" onClick={dropAnchor}>Портфолио</Link></MenuItem>
                            <MenuItem><Link to="/about" onClick={dropAnchor}>О себе</Link></MenuItem>
                            {token ? (
                                    <MenuItem><Link to="/admin" onClick={fetchNewsFromServer}>Админ</Link></MenuItem>
                                ) : (
                                    <div></div>
                                )}
                                {token ? (
                                    <MenuItem><Link to="/logout" onClick={dropToken}>Выход</Link></MenuItem>
                                ) : (
                                    <div></div>
                                )}
                            </Menu>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
