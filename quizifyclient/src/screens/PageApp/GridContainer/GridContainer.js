import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TrackGrid from '../TrackGrid/TrackGrid';

const SAMPLE_TRACKS = [
    {
        id: 0,
        name: 'Mellow Beats',
        artist: 'Spotify',
        artwork:
            'https://s3-us-west-1.amazonaws.com/quizify-test-assets/testimg/1.png'
    },
    {
        id: 1,
        name: 'Tempest',
        artist: 'SOHN',
        artwork:
            'https://s3-us-west-1.amazonaws.com/quizify-test-assets/testimg/2.png'
    },
    {
        id: 2,
        name: 'Lose My Head',
        artist: 'RUFUS',
        artwork:
            'https://s3-us-west-1.amazonaws.com/quizify-test-assets/testimg/3.png'
    },
    {
        id: 3,
        name: 'Phenomenon',
        artist: 'Just A Gent',
        artwork:
            'https://s3-us-west-1.amazonaws.com/quizify-test-assets/testimg/4.png'
    },
    {
        id: 4,
        name: 'Battas',
        artist: 'Mazde',
        artwork:
            'https://s3-us-west-1.amazonaws.com/quizify-test-assets/testimg/5.png'
    },
    {
        id: 5,
        name: 'Rewind',
        artist: 'Louis Futon',
        artwork:
            'https://s3-us-west-1.amazonaws.com/quizify-test-assets/testimg/6.png'
    }
];

const NEXT_TRACKS = [
    {
        id: 0,
        name: 'SDFDSFS',
        artist: 'Spotify',
        artwork:
            'https://s3-us-west-1.amazonaws.com/quizify-test-assets/testimg/1.png'
    },
    {
        id: 1,
        name: 'SDFDSF',
        artist: 'SOHN',
        artwork:
            'https://s3-us-west-1.amazonaws.com/quizify-test-assets/testimg/2.png'
    },
    {
        id: 2,
        name: 'SDFDSFSD',
        artist: 'RUFUS',
        artwork:
            'https://s3-us-west-1.amazonaws.com/quizify-test-assets/testimg/3.png'
    },
    {
        id: 3,
        name: 'SDFSDSSS',
        artist: 'Just A Gent',
        artwork:
            'https://s3-us-west-1.amazonaws.com/quizify-test-assets/testimg/4.png'
    },
    {
        id: 4,
        name: 'SFDSSS',
        artist: 'Mazde',
        artwork:
            'https://s3-us-west-1.amazonaws.com/quizify-test-assets/testimg/5.png'
    },
    {
        id: 5,
        name: 'SSSSSS',
        artist: 'Louis Futon',
        artwork:
            'https://s3-us-west-1.amazonaws.com/quizify-test-assets/testimg/6.png'
    }
];

class GridContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTracks: SAMPLE_TRACKS,
            correctTrack: null,
            lives: 2,
            getResults: false
        };
    }

    onSelectTrack = id => {
        const correct = 0; // TODO CHANGE THIS
        console.log('track selected:', id);
        if (id !== correct) {
            const newlives = this.state.lives - 1;
            if (newlives === 0) {
                console.log('out of lives!!');
            }
            this.setState({ lives: newlives });
        }
        this.setState({ correctTrack: correct });
    };

    getNextScreen = () => {
        if (this.state.lives === 0) {
            this.setState({ getResults: true });
        } else {
            this.setState({
                currentTracks: NEXT_TRACKS,
                correctTrack: null
            });
        }
    };

    render() {
        return (
            <div>
                <TrackGrid
                    tracks={this.state.currentTracks}
                    lives={this.state.lives}
                    correctTrack={this.state.correctTrack}
                    onSelectTrack={this.onSelectTrack}
                    nextButtonPressed={this.getNextScreen}
                />
                {this.state.getResults ? <Redirect push to="/results" /> : null}
            </div>
        );
    }
}

export default GridContainer;
