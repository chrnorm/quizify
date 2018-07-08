import React, { Component } from 'react';
import QuizifyLogo from '../QuizifyLogo/QuizifyLogo';
import './NavBar.css'

class NavBar extends Component {
    render() {
        return (
            <div className="NavBar">
                <div className="NavLogo"><QuizifyLogo /></div>
            </div>
        )
    }
}

export default NavBar;