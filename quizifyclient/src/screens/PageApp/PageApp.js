import React, { Component, Fragment } from 'react';
import GradientBackground from '../../components/GradientBackground/GradientBackground';
import NavBar from '../../components/NavBar/NavBar';
import TrackGrid from './TrackGrid/TrackGrid';
import NextButton from './NextButton/NextButton';
import Answer from './Answer/Answer';
import Api from '../../util/apiAdapter';

class PageApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTracks: null,
            nextTracks: null,
            correctTrack: null,
            displayingAnswer: false,
            lives: 2
        };
        Api.getQuestion().then(res => {
            console.log(res);
            this.setState({
                currentTracks: [res.answer, ...res.fillers]
            });
            this.getNextQuestion();
        });
    }

    /**
     * Pre-fetch the next question from the API to ensure no delays between questions
     */
    getNextQuestion = () => {
        Api.getQuestion().then(res => {
            console.log(res);
            this.setState({ nextTracks: [res.answer, ...res.fillers] });
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
            // use a callback on setState() to ensure that all Track objects are unmounted for an instant
            this.setState(
                {
                    currentTracks: null,
                    correctTrack: null,
                    displayingAnswer: false
                },
                () => {
                    this.setState({ currentTracks: this.state.nextTracks });
                    this.getNextQuestion();
                }
            );
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
                    displayingAnswer={this.state.displayingAnswer}
                    tracks={this.state.currentTracks}
                    correctTrack={this.state.correctTrack}
                    onSelectTrack={this.onSelectTrack}
                >
                    {this.state.displayingAnswer ? (
                        <Fragment>
                            <Answer
                                correctTrack={this.state.correctTrack}
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
