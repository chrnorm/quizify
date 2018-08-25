import React, { Component } from 'react';
import GradientBackground from '../../components/GradientBackground/GradientBackground';
import NavBar from '../../components/NavBar/NavBar';
import GridContainer from './GridContainer/GridContainer';

class PageApp extends Component {
    render() {
        return (
            <div>
                <GradientBackground />
                <NavBar />
                <GridContainer />
            </div>
        );
    }
}

export default PageApp;
