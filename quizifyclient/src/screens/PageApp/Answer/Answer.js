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
    color: white;
    transition: all 0.2s ease;
`;

const CorrectTrack = styled.div`
    color: #eaeaea;
    margin-left: 15px;
    transition: all 0.2s ease;
`;

const Answer = props => (
    <AnswerWrapper>
        <AnswerContents>
            <Spring delay={30} from={{ opacity: 0 }} to={{ opacity: 1 }}>
                {styles => (
                    <AnswerHeading style={styles}>
                        {props.correctAnswer ? 'Correct!' : 'Incorrect!'}
                    </AnswerHeading>
                )}
            </Spring>
            <Spring delay={70} from={{ opacity: 0 }} to={{ opacity: 1 }}>
                {styles => (
                    <CorrectTrack style={styles}>
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
        id: PropTypes.number,
        name: PropTypes.string,
        artists: PropTypes.arrayOf(PropTypes.string),
        artwork: PropTypes.string
    }).isRequired
};

export default Answer;
