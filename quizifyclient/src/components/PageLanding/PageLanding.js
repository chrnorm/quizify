import React, { Component } from 'react';
import QuizifyLogo from '../QuizifyLogo/QuizifyLogo';
import GradientBackground from '../GradientBackground/GradientBackground';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import './PageLanding.css'

class PageLanding extends Component {
    render() {
        return (
            <div className="PageLandingWrapper">
                <GradientBackground />
                <div className="BigLogo"><QuizifyLogo /></div>
                <p className="tagline">Test how well you know your Spotify library.</p>
                <Link style={{ textDecoration: 'none' }} to="/start"><Button className="playbutton">Play Now</Button></Link>
            </div>
        );
    }
}

export default PageLanding;