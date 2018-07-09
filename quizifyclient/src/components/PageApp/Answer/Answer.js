import React, { Component } from 'react';
import './Answer.css'

class Answer extends Component {
    constructor(props) {
        super(props);
        const isCorrectAnswer = (this.props.selectedTrack === this.props.correctTrack)
        this.state = {
            headingVisible: false,
            correctTrackVisible: false,
            correct: isCorrectAnswer,
        };
        
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ headingVisible: true });
        }, 20);        
        setTimeout(() => {
            this.setState({ correctTrackVisible: true });
        }, 100);
    }
    
    render() {
        return (
            <div className="AnswerWrapper">
                <div className="AnswerContents">
                    <div className={`AnswerHeading ${this.state.headingVisible ? "visible" : "" }`}>
                        { this.state.correct ? "Correct!" : "Incorrect!" }
                    </div>
                    <div className={`CorrectTrack ${this.state.correctTrackVisible ? "visible" : ""}`}>
                        {this.props.correctTrackDetails.name} by {this.props.correctTrackDetails.artist}
                    </div>
                </div>
            </div>
        );
    }
}

export default Answer;