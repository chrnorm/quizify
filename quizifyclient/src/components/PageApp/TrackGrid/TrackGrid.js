import React, { Component } from 'react';
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
        this.state = {
            showingNames: false
        };
        setTimeout(() => {
            this.setState({showingNames: true});
        }, 4000);
    }

    
    render() {
        return (
            <div className="TracksWrapper">
                {SAMPLE_TRACKS.map((i) => {
                    console.log(i);
                    return(<Track info={i} key={i.id} showingNames={this.state.showingNames}/>)
                })}
            </div>
        );
    }
}

export default TrackGrid;