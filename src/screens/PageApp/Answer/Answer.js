import React from 'react';
import { Spring } from 'react-spring';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const AnswerWrapper = styled.div`
    position: absolute;
    left: 320px;
    height: 100%;
`;

const AnswerContents = styled.div`
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
`;

const AnswerHeading = styled.div`
    margin-top: -20px;
    font-size: 5em;
    font-weight: 600;
    color: ${props =>
        props.correct
            ? props.theme.colors.brandBlue[3]
            : props.theme.colors.brandRed[0]};
    transition: all 0.2s ease;
`;

const CorrectTrack = styled.div`
    color: ${props =>
        props.correct
            ? props.theme.colors.brandBlue[2]
            : props.theme.colors.brandRed[1]};
    margin-left: 15px;
    transition: all 0.2s ease;
`;

const Answer = props => (
    <AnswerWrapper>
        <AnswerContents>
            <Spring delay={1000} from={{ opacity: 0 }} to={{ opacity: 1 }}>
                {styles => (
                    <AnswerHeading style={styles} correct={props.correctAnswer}>
                        {props.correctAnswer ? 'Correct!' : 'Incorrect!'}
                    </AnswerHeading>
                )}
            </Spring>
            <Spring delay={1100} from={{ opacity: 0 }} to={{ opacity: 1 }}>
                {styles => (
                    <CorrectTrack style={styles} correct={props.correctAnswer}>
                        {props.correctTrack.name} by{' '}
                        {props.correctTrack.artists[0]}
                    </CorrectTrack>
                )}
            </Spring>
        </AnswerContents>
    </AnswerWrapper>
);

Answer.propTypes = {
    correctAnswer: PropTypes.bool.isRequired,
    correctTrack: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        artists: PropTypes.arrayOf(PropTypes.string),
        artwork: PropTypes.string
    }).isRequired
};

export default Answer;
