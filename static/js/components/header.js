//Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
/* font-family: 'Marck Script', cursive;
font-family: 'Exo 2', sans-serif; */

const Head = styled.div`
    font-family: 'Exo 2', sans-serif;
    text-align: center;
    padding: 5px;
    background-color: #f0f0f3;
    border-radius: 8px;
`;

const StLink = styled.div`
    margin: auto;
    margin-left: 4px;
    margin-right: 4px;
    display: inline-block;
    cursor: pointer;
`;

let aStyle = {
    textDecoration: 'none', 
    color: '#020e52'
};

const Header = (props) => {
    const { fetchNewsFromServer } = props;
    return (
        <Head>
            <StLink><Link style={aStyle} to="/newsGet" onClick={fetchNewsFromServer}>Новости</Link></StLink>
            <StLink><Link style={aStyle} to="/portfolio">Портфолио</Link></StLink>
            <StLink><Link style={aStyle} to="/about">О себе</Link></StLink>
        </Head>
    );
};

export default Header;
