import React, { Component } from 'react';
import update from 'immutability-helper';
import Track from '../Track/Track';
import './TrackGrid.css';
import Answer from '../Answer/Answer';
import NextButton from '../NextButton/NextButton';

class TrackGrid extends Component {
    constructor(props) {
        super(props);
        let hidetracks = {};
        this.props.tracks.forEach(i => {
            hidetracks[i.id] = true;
        });
        this.state = {
            showingNames: false,
            selectedTrack: null,
            trackTransitionToAnswer: false,
            hide: hidetracks,
            correctTrack: null,
            displayAnswerText: false
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.tracks !== prevProps.tracks) {
            this.resetQuestion();
        }
        if (
            this.props.correctTrack !== prevProps.correctTrack &&
            this.props.correctTrack !== null
        ) {
            setTimeout(() => {
                this.randomlyHideOtherTracks(this.props.correctTrack);
            }, 200);
        }
    }

    resetQuestion = () => {
        let hidetracks = {};
        this.props.tracks.forEach(i => {
            hidetracks[i.id] = true;
        });
        this.setState({
            showingNames: false,
            trackTransitionToAnswer: false,
            hide: hidetracks,
            correctTrack: null,
            selectedTrack: null,
            displayAnswerText: false
        });
        setTimeout(() => {
            this.randomlyShowTracks();
        }, 60);
        setTimeout(() => {
            this.setState({ showingNames: true });
        }, 4000);
    };

    componentDidMount() {
        this.resetQuestion();
    }

    handleClick = clickedId => {
        if (this.state.trackTransitionToAnswer === false) {
            this.setState({
                showingNames: false,
                trackTransitionToAnswer: true,
                selectedTrack: clickedId
            });
            this.props.onSelectTrack(clickedId);
        }
    };

    // randomly display all tracks
    randomlyShowTracks = () => {
        const hidetracks = Object.assign({}, this.state.hide);
        Object.keys(hidetracks).forEach(i => {
            if (hidetracks[i] === false) {
                delete hidetracks[i];
            }
        });
        const remainingKeys = Object.keys(hidetracks);
        if (remainingKeys.length > 0) {
            const keyToShow =
                remainingKeys[Math.floor(Math.random() * remainingKeys.length)];
            const newHiddenState = update(this.state.hide, {
                [keyToShow]: { $set: false }
            });
            this.setState({ hide: newHiddenState });
            setTimeout(() => {
                this.randomlyShowTracks();
            }, 60);
        } else {
            // TODO allow answer to be selected ?
        }
    };

    // keep hiding tracks until only the correct one is left
    randomlyHideOtherTracks = correctId => {
        const hidetracks = Object.assign({}, this.state.hide);
        Object.keys(hidetracks).forEach(i => {
            if (Number(i) === Number(correctId)) {
                delete hidetracks[i];
            } else if (hidetracks[i] === true) {
                delete hidetracks[i];
            }
        });
        const remainingKeys = Object.keys(hidetracks);
        if (remainingKeys.length > 0) {
            const keyToHide =
                remainingKeys[Math.floor(Math.random() * remainingKeys.length)];
            const newHiddenState = update(this.state.hide, {
                [keyToHide]: { $set: true }
            });
            this.setState({ hide: newHiddenState });
            setTimeout(() => {
                this.randomlyHideOtherTracks(correctId);
            }, 60);
        } else {
            // only the correctId track is visible so make it big
            setTimeout(() => {
                this.setState({ correctTrack: correctId });
            }, 150);
            setTimeout(() => {
                this.setState({ displayAnswerText: true });
            }, 400);
        }
    };

    renderTracks = () => {
        if (this.props.tracks) {
            let tracks = [];
            this.props.tracks.forEach((el, i) => {
                tracks.push(
                    <Track
                        gridindex={i}
                        bigTrack={
                            this.state.correctTrack === el.id ? true : false
                        }
                        info={el}
                        key={el.id}
                        showingNames={this.state.showingNames}
                        hide={this.state.hide[el.id]}
                        handleClick={this.handleClick}
                    />
                );
            });
            return tracks;
        }
    };

    nextButtonPressed = () => {
        setTimeout(() => {
            let hidetracks = {};
            this.props.tracks.forEach(i => {
                hidetracks[i.id] = true;
            });
            this.setState({ hide: hidetracks });
        }, 100);
        setTimeout(() => {
            this.setState({ displayAnswerText: false });
        }, 50);
        setTimeout(() => {
            this.props.nextButtonPressed();
        }, 300);
    };

    getCorrectTrackDetails = () => {
        const correctTrackDetails = this.props.tracks.find(el => {
            return el.id === this.props.correctTrack;
        });
        return correctTrackDetails;
    };

    renderBottomInfo = () => {
        if (this.state.displayAnswerText) {
            //const elements = [];
            //let buttonName = "";

            if (this.state.selectedTrack === this.state.correctTrack) {
                return (
                    <div
                        className="NextSongButton"
                        onClick={this.nextButtonPressed}
                    >
                        <NextButton>Next Song</NextButton>
                    </div>
                );
            } else if (this.props.lives === 0) {
                return (
                    <div>
                        <div className="AttemptsRemaining">
                            No attempts remaining
                        </div>
                        <div
                            className="NextSongButton"
                            onClick={this.nextButtonPressed}
                        >
                            <NextButton>Get Your Results</NextButton>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div>
                        <div className="AttemptsRemaining">
                            {this.props.lives} attempt
                            {this.props.lives === 1 ? null : 's'} remaining
                        </div>
                        <div
                            className="NextSongButton"
                            onClick={this.nextButtonPressed}
                        >
                            <NextButton>Next Song</NextButton>
                        </div>
                    </div>
                );
            }
        }
    };

    render() {
        return (
            <div>
                <div
                    className={`TracksWrapper ${
                        this.state.correctTrack !== null ? 'ShowingAnswer' : ''
                    }`}
                >
                    {this.renderTracks()}
                    {this.state.displayAnswerText ? (
                        <Answer
                            correctTrackDetails={this.getCorrectTrackDetails()}
                            correctTrack={this.state.correctTrack}
                            selectedTrack={this.state.selectedTrack}
                        />
                    ) : null}
                </div>
                {this.state.displayAnswerText ? (
                    <NextButton
                        onClick={this.nextButtonPressed}
                        correctTrack={this.state.correctTrack}
                        selectedTrack={this.state.selectedTrack}
                        lives={this.props.lives}
                    />
                ) : null}
                {/* {this.renderBottomInfo()} */}
            </div>
        );
    }
}

export default TrackGrid;
