import React, { Component } from 'react';
import GradientBackground from '../GradientBackground/GradientBackground';
import NavBar from '../NavBar/NavBar';
import './PageApp.css'
import GridContainer from './GridContainer/GridContainer';


class PageApp extends Component {
    render() {
        return (
            <div>
                <GradientBackground />
                <NavBar />
                <GridContainer />
            </div>
        )
    }
}

export default PageApp;