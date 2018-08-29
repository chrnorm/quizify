import React from 'react';
import AlbumArtworkDimmable from './AlbumArtworkDimmable';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
    AnimatedValue,
    animated,
    interpolate,
    controller as spring
} from 'react-spring';

const TrackContainer = styled.div`
    cursor: pointer;
    position: absolute;
    top: 0px;
    left: 0px;
    transition: all 0.1s ease;
    height: 200px;
    width: 200px;
    display: inline-block;
    background: black;

    ${props =>
        props.selectable
            ? `&:hover {
        height: 208px;
        width: 208px;
        top: -4px;
        left: -4px;
    }`
            : null};
`;

const TrackDetails = styled.div`
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    opacity: 1;
    width: 80%;
    text-align: center;
`;

const Artist = styled.div`
    color: #a8a8a8;
`;

const Track = props => (
    <TrackContainer
        selectable={props.selectable}
        onClick={() => props.handleClick(props.info.id)}
    >
        <AlbumArtworkDimmable
            img={props.info.artwork}
            dimmed={props.showingNames}
        />
        {props.showingNames ? (
            <TrackDetails>
                <div>{props.info.name}</div>
                <Artist>{props.info.artists[0]}</Artist>
            </TrackDetails>
        ) : null}
    </TrackContainer>
);

Track.propTypes = {
    info: PropTypes.shape({
        name: PropTypes.string,
        artists: PropTypes.arrayOf(PropTypes.string),
        artwork: PropTypes.string,
        id: PropTypes.string
    }),
    handleClick: PropTypes.func.isRequired,
    showingNames: PropTypes.bool,
    selectable: PropTypes.bool
};

export default Track;
