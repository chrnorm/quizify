import React, { Component } from 'react';
import GradientBackground from '../../components/GradientBackground/GradientBackground';
import NavBar from '../../components/NavBar/NavBar';
import TrackGrid from './TrackGrid/TrackGrid';
import NextButton from './NextButton/NextButton';
import { SAMPLE_TRACKS, NEXT_TRACKS } from '../../util/mockData';

class PageApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTracks: SAMPLE_TRACKS,
            correctTrack: null,
            displayingAnswer: false,
            lives: 2
        };
    }

    onSelectTrack = id => {
        const correct = SAMPLE_TRACKS[0]; // TODO CHANGE THIS
        console.log('track selected:', id);
        if (id !== correct.id) {
            const newlives = this.state.lives - 1;
            if (newlives === 0) {
                console.log('out of lives!!');
            }
            this.setState({ lives: newlives });
        }
        this.setState({
            correctTrack: correct,
            displayingAnswer: true
        });
    };

    getNextScreen = () => {
        if (this.state.lives === 0) {
            this.props.history.push('/results');
        } else {
            this.setState({
                currentTracks: NEXT_TRACKS,
                correctTrack: null,
                displayingAnswer: false
            });
        }
    };

    render() {
        const correctAnswer =
            this.state.correctTrack &&
            this.state.correctTrack.id === this.state.selectedTrackId;

        return (
            <div>
                <GradientBackground />
                <NavBar />
                <TrackGrid
                    tracks={this.state.currentTracks}
                    lives={this.state.lives}
                    correctTrack={this.state.correctTrack}
                    onSelectTrack={this.onSelectTrack}
                    nextButtonPressed={this.getNextScreen}
                />
                {this.state.displayingAnswer ? (
                    <NextButton
                        onClick={this.getNextScreen}
                        correctAnswer={correctAnswer}
                        lives={this.state.lives}
                    />
                ) : null}
            </div>
        );
    }
}

export default PageApp;
