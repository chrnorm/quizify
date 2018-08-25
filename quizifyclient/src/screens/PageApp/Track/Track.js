import React, { Component } from 'react';
import './Track.css';

class Track extends Component {
    handleClick = () => {
        this.props.handleClick(this.props.info.id);
    };

    render() {
        const shouldShowNames =
            this.props.showingNames && this.props.bigTrack !== true;
        const invisible = this.props.hide ? 'invisible' : '';
        const big = this.props.bigTrack
            ? 'BigTrack'
            : `SmallTrack TrackPos-${this.props.gridindex}`;
        return (
            <div
                onClick={this.handleClick}
                className={`Track ${invisible} ${big}`}
            >
                <img
                    alt="Album Artwork"
                    className={shouldShowNames ? 'Artwork dimmed' : 'Artwork'}
                    src={this.props.info.artwork}
                />
                <div className="TrackDetails">
                    <div
                        className={
                            shouldShowNames
                                ? 'TrackName'
                                : 'TrackName invisible'
                        }
                    >
                        {this.props.info.name}
                    </div>
                    <div
                        className={
                            shouldShowNames
                                ? 'TrackArtist'
                                : 'TrackArtist invisible'
                        }
                    >
                        {this.props.info.artist}
                    </div>
                </div>
            </div>
        );
    }
}

export default Track;
