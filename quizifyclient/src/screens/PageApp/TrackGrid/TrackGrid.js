import React, { Component, Fragment } from 'react';
import update from 'immutability-helper';
import Track from '../Track/Track';
import shuffle from '../../../util/shuffle';
import './TrackGrid.css';
import { animated, Spring, Keyframes } from 'react-spring';
import Answer from '../Answer/Answer';

const AnimationContainer = Keyframes.Trail({
    show: { delay: 500, from: { opacity: 0 }, to: { opacity: 1 } },
    hide: { delay: 500, from: { opacity: 1 }, to: { opacity: 0 } }
});

class TrackGrid extends Component {
    constructor(props) {
        super(props);
        let hidetracks = {};
        this.props.tracks.forEach(i => {
            hidetracks[i.id] = true;
        });

        // generate grid matrix, 3 columns and 2 rows for 6 tracks total
        const positions = [];
        const offset = 20;
        for (let col = 0; col < 3; col++) {
            for (let row = 0; row < 2; row++) {
                positions.push({
                    x: col * (200 + offset),
                    y: row * (200 + offset)
                });
            }
        }

        // assign each track a random position to allow for random-looking entry and exit animations
        const trackpositions = Array.from(Array(6).keys()); // [0, 1, 2 ... 6]
        shuffle(trackpositions);

        this.state = {
            positions,
            trackpositions,
            showingNames: false,
            selectedTrackId: null,
            allowTrackSelection: true,
            hide: hidetracks,
            correctTrack: null,
            animationState: 'show',
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
            this.setState({
                correctTrack: this.props.correctTrack,
                displayAnswerText: true
            });
            // setTimeout(() => {
            //     this.randomlyHideOtherTracks(this.props.correctTrack);
            // }, 200);
        }
    }

    resetQuestion = () => {
        let hidetracks = {};
        this.props.tracks.forEach(i => {
            hidetracks[i.id] = true;
        });
        this.setState({
            showingNames: false,
            animationState: 'show',
            allowTrackSelection: true,
            hide: hidetracks,
            correctTrack: null,
            selectedTrackId: null,
            displayAnswerText: false
        });
        // setTimeout(() => {
        //     this.randomlyShowTracks();
        // }, 60);
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
                selectedTrackId: clickedId,
                animationState: 'hide'
            });
            this.props.onSelectTrack(clickedId);
        }
    };

    renderTracks = () => {
        const { positions, trackpositions } = this.state;
        return this.props.tracks ? (
            <AnimationContainer
                keys={this.props.tracks.map(el => el.id)}
                state={this.state.animationState}
            >
                {this.props.tracks.map((el, i) => ({ opacity }) => (
                    <Spring
                        delay={this.state.correctTrack ? 1000 : 0} // hacky way to ensure it resets without delay in between questions
                        from={{
                            transform: `translate3d(${
                                positions[trackpositions[i]].x
                            }px,${positions[trackpositions[i]].y}px,0) scale(1)`
                        }}
                        to={
                            this.state.correctTrack &&
                            this.state.correctTrack.id === el.id
                                ? {
                                      transform: `translate3d(${200}px,${0}px,0) scale(1.5)`
                                  }
                                : {}
                        }
                    >
                        {({ transform }) => (
                            <animated.div
                                style={
                                    this.state.correctTrack &&
                                    this.state.correctTrack.id === el.id
                                        ? { transform }
                                        : {
                                              opacity,
                                              transform
                                          }
                                }
                            >
                                <Track //   gridindex={i}
                                    //   bigTrack={
                                    //       this.state.correctTrack.id === el.id ? true : false
                                    //   }
                                    info={el}
                                    key={el.id}
                                    showingNames={this.state.showingNames} //   hide={this.state.hide[el.id]}
                                    handleClick={this.handleClick}
                                />
                            </animated.div>
                        )}
                    </Spring>
                ))}
            </AnimationContainer>
        ) : null;
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
                        // TODO use a transition here from react-spring
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
