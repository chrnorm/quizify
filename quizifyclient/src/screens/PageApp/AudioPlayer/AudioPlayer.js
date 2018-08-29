import React, { PureComponent } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import PropTypes from 'prop-types';
import { Spring } from 'react-spring';

class AudioPlayer extends PureComponent {
    componentDidUpdate = prevProps => {
        if (this.props.play !== prevProps.play) {
            if (this.props.play === true) {
                this.audioplayer.audioEl.play();
            }
        }
    };

    render() {
        return (
            <Spring
                from={{ volume: 0 }}
                to={this.props.play ? { volume: 1 } : { volume: 0 }}
                config={{ tension: 300, friction: 100 }}
            >
                {({ volume }) => (
                    <ReactAudioPlayer
                        src={this.props.src}
                        ref={element => {
                            this.audioplayer = element;
                        }}
                        volume={volume}
                    />
                )}
            </Spring>
        );
    }
}

AudioPlayer.propTypes = {
    src: PropTypes.string,
    play: PropTypes.bool.isRequired
};

export default AudioPlayer;
