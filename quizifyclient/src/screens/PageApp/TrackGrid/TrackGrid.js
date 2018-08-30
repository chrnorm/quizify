import React, { Component } from 'react';
import Track from '../Track/Track';
import shuffle from '../../../util/shuffle';
import styled from 'styled-components';
import AnimatedTrackWrapper from './AnimatedTrackWrapper';
import PropTypes from 'prop-types';

const TracksWrapper = styled.div`
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 660px;
    height: 440px;
    transition: all 0.1s ease;
`;

const getAnimationDelays = () => {
    // assign each track a random delay to allow for random-looking entry and exit animations
    const animdelays = Array.from(Array(6).keys()).map(e => e * 60 + 100); // [0, 100, 200 ... 500]
    shuffle(animdelays);
    return animdelays;
};

const getPositions = () => {
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
    return positions;
};

class TrackGrid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            positions: getPositions(),
            animdelays: getAnimationDelays(),
            showingNames: false
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.tracks !== prevProps.tracks) {
            this.resetQuestion();
        }
    }

    resetQuestion = () => {
        this.setState({
            animdelays: getAnimationDelays(),
            showingNames: false
        });
        setTimeout(() => {
            this.setState({ showingNames: true });
        }, 4000);
    };

    handleClick = clickedId => {
        if (this.props.allowTrackSelection === true) {
            this.setState({
                showingNames: false
            });
            this.props.onSelectTrack(clickedId);
        }
    };

    renderTracks = () => {
        return this.props.tracks
            ? this.props.tracks.map((el, i) => {
                  const isAnswer =
                      this.props.correctTrack &&
                      this.props.correctTrack.id === el.id
                          ? true
                          : false;
                  return (
                      <AnimatedTrackWrapper
                          delay={this.state.animdelays[i]}
                          show={!this.props.displayingAnswer || isAnswer}
                          isAnswer={this.props.displayingAnswer && isAnswer}
                          position={this.state.positions[i]}
                          key={el.id}
                      >
                          <Track
                              info={el}
                              key={el.id}
                              showingNames={this.state.showingNames}
                              handleClick={this.handleClick}
                              selectable={this.props.allowTrackSelection}
                          />
                      </AnimatedTrackWrapper>
                  );
              })
            : null;
    };

    render() {
        return (
            <TracksWrapper>
                {this.renderTracks()}
                {this.props.children}
            </TracksWrapper>
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
    ),
    allowTrackSelection: PropTypes.bool
};

export default TrackGrid;
