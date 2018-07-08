import React, { Component } from 'react';
import './Track.css'

class Track extends Component {  
    render() {
        return (
            <div className="Track">
                <img className={ this.props.showingNames ? "Artwork dimmed" : "Artwork" } src={this.props.info.artwork} />
                <div className="TrackDetails">
                        <div className={ this.props.showingNames ? "TrackName" : "TrackName invisible" }>{this.props.info.name}</div>
                        <div className={ this.props.showingNames ? "TrackArtist" : "TrackArtist invisible" }>{this.props.info.artist}</div>
                </div>
            </div>
        );
    }
}

class TrackImage extends Component {
    render() {
        return (
            <div>
            {
                this.props.dimmed ? <img className="Artwork dimmed" src={this.props.artwork} /> : <img className="Artwork" src={this.props.artwork} />
            }
            </div>
        );
    }
}

export default Track;