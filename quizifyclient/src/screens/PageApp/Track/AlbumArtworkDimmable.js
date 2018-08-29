import React from 'react';
import styled from 'styled-components';

const Artwork = styled.img`
    max-width: 100%;
    max-height: 100%;
    transition: all 2s ease;
    -webkit-box-shadow: 0px 2px 6px rgba(30, 30, 30, 0.4);
    -moz-box-shadow: 0px 2px 6px rgba(30, 30, 30, 0.4);
    box-shadow: 0px 2px 6px rgba(30, 30, 30, 0.4);
`;

const ArtworkDimmed = styled(Artwork)`
    -webkit-filter: brightness(30%);
    -moz-filter: brightness(30%);
    filter: url(#brightness); /* required for FF */
    filter: brightness(30%);
`;

const AlbumArtworkDimmable = props =>
    props.dimmed ? (
        <ArtworkDimmed src={props.img} />
    ) : (
        <Artwork src={props.img} />
    );

export default AlbumArtworkDimmable;
