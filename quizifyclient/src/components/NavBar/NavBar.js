import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import QuizifyLogo from '../QuizifyLogo/QuizifyLogo';
import './NavBar.css'

class NavBar extends Component {
    render() {
        return (
            <div className="NavBar">
                <Link to="/"><div className="NavLogo"><QuizifyLogo /></div></Link>
            </div>
        )
    }
}

export default NavBar;