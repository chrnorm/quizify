import React, { Component } from 'react';
import QuizifyLogo from '../../components/QuizifyLogo/QuizifyLogo';
import GradientBackground from '../../components/GradientBackground/GradientBackground';
import API_URL from '../../util/apiUrl';
import Button from '../../components/Button/Button';
import './PageLanding.css';

class PageLanding extends Component {
    render() {
        return (
            <div className="PageLandingWrapper">
                <GradientBackground />
                <div className="BigLogo">
                    <QuizifyLogo />
                </div>
                <p className="tagline">
                    Test how well you know your Spotify library.
                </p>
                <a style={{ textDecoration: 'none' }} href={`${API_URL}/login`}>
                    <Button className="playbutton">
                        Login With Spotify To Play
                    </Button>
                </a>
            </div>
        );
    }
}

export default PageLanding;
