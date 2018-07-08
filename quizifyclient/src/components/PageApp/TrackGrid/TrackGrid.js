import React, { Component } from 'react';
import update from 'immutability-helper';
import Track from '../Track/Track';
import './TrackGrid.css'

const SAMPLE_TRACKS = [
    {
        id: 0,
        name: "Mellow Beats",
        artist: "Spotify",
        artwork: "https://s3-us-west-1.amazonaws.com/quizify-test-assets/testimg/1.png"
    },
    {
        id: 1,
        name: "Tempest",
        artist: "SOHN",
        artwork: "https://s3-us-west-1.amazonaws.com/quizify-test-assets/testimg/2.png"
    },
    {
        id: 2,
        name: "Lose My Head",
        artist: "RUFUS",
        artwork: "https://s3-us-west-1.amazonaws.com/quizify-test-assets/testimg/3.png"
    },
    {
        id: 3,
        name: "Phenomenon",
        artist: "Just A Gent",
        artwork: "https://s3-us-west-1.amazonaws.com/quizify-test-assets/testimg/4.png"
    },
    {
        id: 4,
        name: "Battas",
        artist: "Mazde",
        artwork: "https://s3-us-west-1.amazonaws.com/quizify-test-assets/testimg/5.png"
    },
    {
        id: 5,
        name: "Rewind",
        artist: "Louis Futon",
        artwork: "https://s3-us-west-1.amazonaws.com/quizify-test-assets/testimg/6.png"
    }
]

class TrackGrid extends Component {
    constructor(props) {
        super(props);
        let hidetracks = {}
        SAMPLE_TRACKS.map((i) => {
            hidetracks[i.id] = false
        });
        console.log(hidetracks)
        
        this.state = {
            showingNames: false,
            hide: hidetracks
        };
        setTimeout(() => {
            this.setState({showingNames: true});
        }, 4000);
    }

    handleClick = (clickedId) => {
        this.setState({showingNames: false});
        setTimeout(() => {
            this.randomlyHideOtherTracks(clickedId);
        }, 200);
    }

    // keep hiding tracks until only the correct one is left
    randomlyHideOtherTracks = (correctId) => {
        const hidetracks = Object.assign({}, this.state.hide);
        Object.keys(hidetracks).map((i) => {
            if (Number(i) === Number(correctId)) {
                delete hidetracks[i]
            } else if (hidetracks[i] === true) {
                delete hidetracks[i]
            }
        });
        const remainingKeys = Object.keys(hidetracks);
        if(remainingKeys.length > 0) {
            const keyToHide = remainingKeys[Math.floor(Math.random() * remainingKeys.length)];
            const newHiddenState = update(this.state.hide, {[keyToHide]: {$set: true}});
            this.setState({hide: newHiddenState});
            setTimeout(() => {
                this.randomlyHideOtherTracks(correctId);
            }, 90);
        }
    }

    
    render() {
        return (
            <div className="TracksWrapper">
                {SAMPLE_TRACKS.map((i) => {
                    console.log(i);
                    return (<Track info={i} key={i.id} showingNames={this.state.showingNames} hide={this.state.hide[i.id]} handleClick={this.handleClick}/>)
                })}
            </div>
        );
    }
}

export default TrackGrid;