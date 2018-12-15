import React, { Component, Fragment } from 'react';
import GradientBackground from '../../components/GradientBackground/GradientBackground';
import NavBar from '../../components/NavBar/NavBar';
import TrackGrid from './TrackGrid/TrackGrid';
import NextButton from './NextButton/NextButton';
import Answer from './Answer/Answer';
import AudioPlayer from './AudioPlayer/AudioPlayer';
import { QUESTION_REQUEST, ANSWER_CORRECT } from '../../redux/reducers';
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
        if (id !== this.props.question.answer.id) {
            const newlives = this.state.lives - 1;
            if (newlives === 0) {
                console.log('out of lives!!');
            }
            this.setState({ lives: newlives });
        } else {
            this.props.dispatch({ type: ANSWER_CORRECT });
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
        if (this.state.lives === 0) {
            this.props.history.push('/results');
        } else {
            this.setState(
                {
                    selectedTrackId: null,
                    displayingAnswer: false
                },
                this.getNextQuestion
            );
        }
    };

    render() {
        const correctAnswer =
            this.props.question.answer &&
            this.props.question.answer.id === this.state.selectedTrackId;

        return (
            <div>
                <GradientBackground />
                <NavBar />
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
                        <Fragment>
                            <Answer
                                correctTrack={this.props.question.answer}
                                correctAnswer={correctAnswer}
                            />
                            <NextButton
                                onClick={this.getNextScreen}
                                correctAnswer={correctAnswer}
                                lives={this.state.lives}
                            />
                        </Fragment>
                    ) : null}
                </TrackGrid>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    question: state.question
});

export default connect(mapStateToProps)(PageApp);
