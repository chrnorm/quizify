import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GradientBackground from '../../components/GradientBackground/GradientBackground';
import FlowBox from './FlowBox/FlowBox';
import NavBar from '../../components/NavBar/NavBar';

import './PageOnboarding.css';

class PageOnboarding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0
        };
    }

    clickHandler = event => {
        if (event === 'prev') {
            this.setState({ selected: this.state.selected - 1 });
        } else if (event === 'next') {
            this.setState({ selected: this.state.selected + 1 });
        }
    };

    renderFlowContents = () => {
        switch (this.state.selected) {
            case 0:
                return <div className="OnboardingContents">turn audio on</div>;
            case 1:
                return (
                    <div className="OnboardingContents">
                        choose the track that matches what you hear from the
                        grid
                    </div>
                );
            case 2:
                return (
                    <div className="OnboardingContents">
                        <p>connect to Spotify to begin</p>
                        <Link to="/app">
                            <button className="PlayButton">Play Now</button>
                        </Link>
                    </div>
                );
            default:
                return null;
        }
    };

    render() {
        return (
            <div>
                <GradientBackground />
                <NavBar />
                <FlowBox
                    num={3}
                    selected={this.state.selected}
                    clickAnywhereToAdvance
                    clickHandler={this.clickHandler}
                >
                    {this.renderFlowContents()}
                </FlowBox>
            </div>
        );
    }
}

export default PageOnboarding;
