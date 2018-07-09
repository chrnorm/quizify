import React, { Component } from 'react';
import Button from '../../Button/Button'
import './NextButton.css'

class NextButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonVisible: false,
            textVisible: false,
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ buttonVisible: true });
        }, 630);
        setTimeout(() => {
            this.setState({ textVisible: true });
        }, 600);
    }

    renderAttemptText = () => {
        const numlives = this.props.lives > 0 ? this.props.lives : "No";
        const attempts = `attempt${this.props.lives === 1 ? "" : "s"}`
        return `${numlives} ${attempts} remaining`
    }
    
    render() {
        const buttonText = this.props.lives > 0 ? "Next Song" : "Get Your Results";
        return (
            <div className="NextButtonWrapper">
                {this.props.selectedTrack !== this.props.correctTrack ?
                    <div className={`AttemptsRemaining ${this.state.textVisible ? "visible" : ""}`}>{this.renderAttemptText()}</div>
                : null }
                <div onClick={this.props.onClick} className={`NextButton ${this.state.buttonVisible ? "visible" : ""}`}><Button>{buttonText}</Button></div>
            </div>
        );
    }
}

export default NextButton;