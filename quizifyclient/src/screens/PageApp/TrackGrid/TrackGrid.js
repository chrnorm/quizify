import React, { Component, Fragment } from 'react';
import update from 'immutability-helper';
import Track from '../Track/Track';
import './TrackGrid.css';
import Answer from '../Answer/Answer';

class TrackGrid extends Component {
    constructor(props) {
        super(props);
        let hidetracks = {};
        this.props.tracks.forEach(i => {
            hidetracks[i.id] = true;
        });
        this.state = {
            showingNames: false,
            selectedTrackId: null,
            allowTrackSelection: true,
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
            allowTrackSelection: true,
            hide: hidetracks,
            correctTrack: null,
            selectedTrackId: null,
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
        if (this.state.allowTrackSelection === true) {
            this.setState({
                showingNames: false,
                allowTrackSelection: false,
                selectedTrackId: clickedId
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
    randomlyHideOtherTracks = correctTrack => {
        const hidetracks = Object.assign({}, this.state.hide);
        Object.keys(hidetracks).forEach(i => {
            if (Number(i) === Number(correctTrack.id)) {
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
                this.randomlyHideOtherTracks(correctTrack);
            }, 60);
        } else {
            // only the correctId track is visible so make it big
            setTimeout(() => {
                this.setState({ correctTrack: correctTrack });
            }, 150);
            setTimeout(() => {
                this.setState({ displayAnswerText: true });
            }, 400);
        }
    };

    renderTracks = () =>
        this.props.tracks
            ? this.props.tracks.map((el, i) => (
                  <Track
                      gridindex={i}
                      //   bigTrack={
                      //       this.state.correctTrack.id === el.id ? true : false
                      //   }
                      info={el}
                      key={el.id}
                      showingNames={this.state.showingNames}
                      hide={this.state.hide[el.id]}
                      handleClick={this.handleClick}
                  />
              ))
            : null;

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

    render() {
        const correctAnswer =
            this.state.correctTrack &&
            this.state.correctTrack.id === this.state.selectedTrackId;

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
                            correctTrack={this.state.correctTrack}
                            correctAnswer={correctAnswer}
                        />
                    ) : null}
                </div>
            </div>
        );
    }
}

export default TrackGrid;
