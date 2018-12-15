import styled from 'styled-components';
import { animated } from 'react-spring';

export const ResultsPageContents = styled.div`
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
`;

export const ResultsText = styled(animated.div)`
    margin-bottom: 150px;
    display: flex;
    flex-direction: column;
`;

export const ScoreTitle = styled.h1`
    font-size: 3em;
    margin: 0;
`;

export const ScoreDetails = styled.div`
    margin: 20px auto;
    font-size: 1.1em;
`;

export const ResultsButtons = styled.div`
    display: flex;
    flex-direction: row;
`;

export const TryAgain = styled(animated.div)`
    display: inline-block;
    align-self: center;
    margin-left: 35px;
    text-transform: uppercase;
    font-size: 20px;
    cursor: pointer;
`;

export const ShareButton = styled(animated.div)``;
