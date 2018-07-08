import React, { Component } from 'react';
import './Track.css'

class Track extends Component {  
    handleClick = () => {
        this.props.handleClick(this.props.info.id);
    }
    
    render() {
        return (
            <div onClick={this.handleClick} className={ this.props.hide ? "Track invisible" : "Track" }>
                <img className={ this.props.showingNames ? "Artwork dimmed" : "Artwork" } src={this.props.info.artwork} />
                <div className="TrackDetails">
                        <div className={ this.props.showingNames ? "TrackName" : "TrackName invisible" }>{this.props.info.name}</div>
                        <div className={ this.props.showingNames ? "TrackArtist" : "TrackArtist invisible" }>{this.props.info.artist}</div>
                </div>
            </div>
        );
    }
}

export default Track;