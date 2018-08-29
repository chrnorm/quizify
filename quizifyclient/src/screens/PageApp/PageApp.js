import React, { Component } from 'react';
import GradientBackground from '../../components/GradientBackground/GradientBackground';
import NavBar from '../../components/NavBar/NavBar';
import TrackGrid from './TrackGrid/TrackGrid';
import NextButton from './NextButton/NextButton';
import {
    SAMPLE_REAL_TRACKS,
    SAMPLE_TRACKS,
    NEXT_TRACKS
} from '../../util/mockData';
import Api from '../../util/apiAdapter';

class PageApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTracks: null,
            correctTrack: null,
            displayingAnswer: false,
            lives: 2
        };
        this.getQuestion();
    }

    getQuestion = () => {
        // fetch next tracks
        Api.getQuestion().then(res => {
            console.log(res);

            this.setState({ currentTracks: res.tracks });
        });
    };

    onSelectTrack = id => {
        const correct = this.state.currentTracks[0]; // TODO CHANGE THIS
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
                currentTracks: null,
                correctTrack: null,
                displayingAnswer: false
            });
            this.getQuestion();
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
