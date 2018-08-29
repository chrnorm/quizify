import React, { Component } from 'react';
import Track from '../Track/Track';
import shuffle from '../../../util/shuffle';
import './TrackGrid.css';
import Answer from '../Answer/Answer';
import AnimatedTrackWrapper from './AnimatedTrackWrapper';
import PropTypes from 'prop-types';

const getAnimationDelays = () => {
    // assign each track a random delay to allow for random-looking entry and exit animations
    const animdelays = Array.from(Array(6).keys()).map(e => e * 100 + 300); // [0, 100, 200 ... 500]
    shuffle(animdelays);
    return animdelays;
};

class TrackGrid extends Component {
    constructor(props) {
        super(props);

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

        const animdelays = getAnimationDelays();

        this.state = {
            positions,
            animdelays,
            showingNames: false,
            selectedTrackId: null,
            allowTrackSelection: true,
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
        this.setState({
            animdelays: getAnimationDelays(),
            showingNames: false,
            allowTrackSelection: true,
            selectedTrackId: null,
            displayAnswerText: false,
            animationState: 'show',
            correctTrack: null
        });
        // setTimeout(() => {
        //     this.setState({ animationState: 'show' });
        // }, 10);
        // setTimeout(() => {
        //     this.setState({ correctTrack: null });
        // }, 10);
        // setTimeout(() => {
        //     this.randomlyShowTracks();
        // }, 60);
        // setTimeout(() => {
        //     this.setState({ showingNames: true });
        // }, 4000);
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
        return this.props.tracks
            ? this.props.tracks.map((el, i) => (
                  <AnimatedTrackWrapper
                      delay={this.state.animdelays[i]}
                      show={
                          this.state.animationState !== 'hide' ||
                          (this.state.displayAnswerText &&
                              this.state.correctTrack &&
                              this.state.correctTrack.id === el.id)
                      }
                      isAnswer={
                          this.state.correctTrack &&
                          this.state.correctTrack.id === el.id
                      }
                      position={this.state.positions[i]}
                  >
                      <Track
                          info={el}
                          key={el.id}
                          showingNames={this.state.showingNames} //   hide={this.state.hide[el.id]}
                          handleClick={this.handleClick}
                      />
                  </AnimatedTrackWrapper>
              ))
            : null;
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

TrackGrid.propTypes = {
    tracks: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            artists: PropTypes.arrayOf(PropTypes.string),
            artwork: PropTypes.string,
            id: PropTypes.string
        })
    )
};

export default TrackGrid;
