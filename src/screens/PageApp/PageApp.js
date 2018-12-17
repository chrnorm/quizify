import React, { Component } from 'react';
import GradientBackground from '../../components/GradientBackground/GradientBackground';
import TrackGrid from './TrackGrid/TrackGrid';
import Answer from './Answer/Answer';
import AudioPlayer from './AudioPlayer/AudioPlayer';
import { WatermarkLogo } from '../../components/QuizifyLogo/QuizifyLogo';
import {
    QUESTION_REQUEST,
    ANSWER_CORRECT,
    ANSWER_INCORRECT,
    RESET_SCORE
} from '../../redux/reducers';
import { connect } from 'react-redux';

const SECONDS_PER_QUESTION = 15;

class PageApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allowedToAnswer: false,
            playingAudio: null,
            selectedTrackId: null,
            displayingAnswer: false,
            timeRemaining: SECONDS_PER_QUESTION,
            lives: 1
        };
        this.props.dispatch({ type: RESET_SCORE });
        this.getNextQuestion();
    }

    getNextQuestion = () => {
        this.props.dispatch({ type: QUESTION_REQUEST });
    };

    componentDidUpdate = prevProps => {
        if (this.props.question.tracks !== prevProps.question.tracks) {
            setTimeout(() => {
                this.setState({
                    allowedToAnswer: true,
                    playingAudio: this.props.question.answer.preview_url,
                    timeRemaining: SECONDS_PER_QUESTION
                });
                this.updateTimeRemaining();
            }, 1000);
        }
    };

    updateTimeRemaining = () => {
        if (!this.state.displayingAnswer) {
            // force an incorrect track selection if no time remaining
            if (this.state.timeRemaining <= 0) this.onSelectTrack(null);
            else {
                const timeRemaining = this.state.timeRemaining - 0.1;
                this.setState({
                    timeRemaining
                });
                setTimeout(() => {
                    this.updateTimeRemaining();
                }, 100);
            }
        }
    };

    onSelectTrack = id => {
        console.log('track selected:', id);
        if (id === this.props.question.answer.id) {
            this.props.dispatch({ type: ANSWER_CORRECT });
        } else {
            this.props.dispatch({ type: ANSWER_INCORRECT });
        }
        this.setState({
            displayingAnswer: true,
            selectedTrackId: id,
            allowedToAnswer: false
        });
        setTimeout(() => {
            this.getNextScreen();
        }, 6000);
    };

    getNextScreen = () => {
        if (this.props.score.gotAnAnswerWrong) {
            this.props.history.push('/results');
        } else {
            this.setState(
                { selectedTrackId: null, displayingAnswer: false },
                this.getNextQuestion
            );
        }
    };

    render() {
        const correctAnswer =
            this.props.question.answer &&
            this.props.question.answer.id === this.state.selectedTrackId;

        return (
            <>
                <GradientBackground />
                <WatermarkLogo />
                <AudioPlayer
                    src={this.state.playingAudio}
                    play={
                        this.state.allowedToAnswer ||
                        this.state.displayingAnswer
                    }
                />
                <TrackGrid
                    displayingAnswer={this.state.displayingAnswer}
                    tracks={this.props.question.tracks}
                    correctTrack={this.props.question.answer}
                    onSelectTrack={this.onSelectTrack}
                    allowTrackSelection={this.state.allowedToAnswer}
                >
                    {this.state.displayingAnswer ? (
                        <Answer
                            correctTrack={this.props.question.answer}
                            correctAnswer={correctAnswer}
                        />
                    ) : null}
                </TrackGrid>
            </>
        );
    }
}

const mapStateToProps = state => ({
    question: state.question,
    score: state.score
});

export default connect(mapStateToProps)(PageApp);
