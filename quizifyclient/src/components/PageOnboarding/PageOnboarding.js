import React, { Component } from 'react';
import GradientBackground from '../GradientBackground/GradientBackground';
import NavBar from '../NavBar/NavBar';
import './PageOnboarding.css'

class PageOnboarding extends Component {
    render() {
        return (
            <div>
                <GradientBackground />
                <NavBar />
            </div>
        )
    }
}

export default PageOnboarding;