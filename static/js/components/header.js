//Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export const Header = (props) => {
    const { fetchNewsFromServer } = props;
    return (
        <div>
            <Link to="/newsGet" onClick={fetchNewsFromServer}>Новости</Link>
            <Link to="/portfolio">Портфолио</Link>
            <Link to="/about">О себе</Link>
            <Link to="/admin">Админ</Link>
        </div>
    );
};
