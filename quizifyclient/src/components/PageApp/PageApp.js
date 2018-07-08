import React, { Component } from 'react';
import GradientBackground from '../GradientBackground/GradientBackground';
import NavBar from '../NavBar/NavBar';
import './PageApp.css'
import TrackGrid from './TrackGrid/TrackGrid';


class PageApp extends Component {
    render() {
        return (
            <div>
                <GradientBackground />
                <NavBar />
                <TrackGrid />
            </div>
        )
    }
}

export default PageApp;