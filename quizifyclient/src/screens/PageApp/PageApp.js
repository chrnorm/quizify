import React, { Component, Fragment } from 'react';
import GradientBackground from '../../components/GradientBackground/GradientBackground';
import NavBar from '../../components/NavBar/NavBar';
import TrackGrid from './TrackGrid/TrackGrid';
import NextButton from './NextButton/NextButton';
import Answer from './Answer/Answer';
import Api from '../../util/apiAdapter';
import shuffle from '../../util/shuffle';
import AudioPlayer from './AudioPlayer/AudioPlayer';

const SECONDS_PER_QUESTION = 15;

class PageApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTracks: { tracks: null, answer: null, audio: null },
            nextTracks: null,
            allowedToAnswer: false,
            playingAudio: null,
            selectedTrackId: null,
            displayingAnswer: false,
            timeRemaining: SECONDS_PER_QUESTION,
            lives: 3
        };
    }

    /**
     * Fetch the first two questions when component is first mounted
     */
    componentDidMount = async () => {
        const question = await this.getNextQuestion();
        this.setState({ currentTracks: question });

        const nextQuestion = await this.getNextQuestion();
        this.setState({ nextTracks: nextQuestion });
    };

    componentDidUpdate = (_, prevState) => {
        if (this.state.currentTracks !== prevState.currentTracks) {
            setTimeout(() => {
                this.setState({
                    allowedToAnswer: true,
                    playingAudio: this.state.currentTracks.audio,
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

    /**
     * Pre-fetch the next question from the API to ensure no delays between questions
     */
    getNextQuestion = async () => {
        const res = await Api.getQuestion();
        console.log(res);
        const tracks = [res.answer, ...res.fillers];
        shuffle(tracks);
        return {
            tracks,
            answer: res.answer,
            audio: res.audio
        };
    };

    onSelectTrack = id => {
        console.log('track selected:', id);
        if (id !== this.state.currentTracks.answer.id) {
            const newlives = this.state.lives - 1;
            if (newlives === 0) {
                console.log('out of lives!!');
            }
            this.setState({ lives: newlives });
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
                    currentTracks: this.state.nextTracks,
                    selectedTrackId: null,
                    displayingAnswer: false
                },
                async () => {
                    const nextTracks = await this.getNextQuestion();
                    this.setState({ nextTracks });
                }
            );
        }
    };

    render() {
        const correctAnswer =
            this.state.currentTracks.answer &&
            this.state.currentTracks.answer.id === this.state.selectedTrackId;

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
                    tracks={this.state.currentTracks.tracks}
                    correctTrack={this.state.currentTracks.answer}
                    onSelectTrack={this.onSelectTrack}
                    allowTrackSelection={this.state.allowedToAnswer}
                >
                    {this.state.displayingAnswer ? (
                        <Fragment>
                            <Answer
                                correctTrack={this.state.currentTracks.answer}
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

export default PageApp;
