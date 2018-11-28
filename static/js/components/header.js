//Header.jsx

import React from 'react';
import { Link } from 'react-router-dom';

export  class Header extends React.Component {
    render () {
        return (
            <div>
                <Link to="/newsGet">Новости</Link>
                <Link to="/portfolio">Портфолио</Link>
                <Link to="/about">О себе</Link>
            </div>
        )
    }
}
