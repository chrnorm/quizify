import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GradientBackground from '../GradientBackground/GradientBackground';
import Button from '../Button/Button'
import NavBar from '../NavBar/NavBar';
import './PageResults.css'

class PageResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textVisible: false,
            buttonShareVisible: false,
            buttonTryAgainVisible: false,
        }
        setTimeout(() => {
            this.setState({ textVisible: true });
        }, 50);
        setTimeout(() => {
            this.setState({buttonShareVisible: true});
        }, 2000);
        setTimeout(() => {
            this.setState({ buttonTryAgainVisible: true });
        }, 2250);
    }
    
    
    render() {
        return (
            <div>
                <GradientBackground />
                <NavBar />
                <div className="ResultsPageContents">
                    <div className={`ResultsText ${this.state.textVisible ? "visible" : ""}`}>
                        <h1 className="ScoreTitle">Your Quizify Score: 7000</h1>
                        <div className="ScoreDetails">Based on 23 correct song choices</div>
                    </div>
                    <div className="ResultsButtons">
                        <div className={`ShareButton ${this.state.buttonShareVisible ? "visible" : ""}`}><Button>Share Your Score</Button></div>
                        <div className={`TryAgain ${this.state.buttonTryAgainVisible ? "visible" : ""}`}><Link style={{ textDecoration: 'none', color: 'white' }} to="/app">Try Again</Link></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PageResults;