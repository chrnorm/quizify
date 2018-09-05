import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
    transition: ${props =>
        props.visible
            ? 'all 2s ease'
            : 'all 0.5s ease'}; // slow fade in, fast fade out
    opacity: ${props => (props.visible ? '1' : '0')};
    width: 80%;
    text-align: center;
`;

const Artist = styled.div`
    color: #a8a8a8;
`;

const Artwork = styled.img`
    max-width: 100%;
    max-height: 100%;
    transition: ${props =>
        props.dimmed
            ? 'all 2s ease'
            : 'all 0.5s ease'}; // slow fade in, fast fade out
    -webkit-box-shadow: 0px 2px 6px rgba(30, 30, 30, 0.4);
    -moz-box-shadow: 0px 2px 6px rgba(30, 30, 30, 0.4);
    box-shadow: 0px 2px 6px rgba(30, 30, 30, 0.4);

    ${props =>
        props.dimmed
            ? `
    -webkit-filter: brightness(30%);
    -moz-filter: brightness(30%);
    filter: url(#brightness); /* required for FF */
    filter: brightness(30%);
    `
            : null};
`;

const Track = props => (
    <TrackContainer
        selectable={props.selectable}
        onClick={() => props.handleClick(props.info.id)}
    >
        <Artwork src={props.info.artwork} dimmed={props.showingNames} />
        <TrackDetails visible={props.showingNames}>
            <div>{props.info.name}</div>
            <Artist>{props.info.artists[0]}</Artist>
        </TrackDetails>
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
