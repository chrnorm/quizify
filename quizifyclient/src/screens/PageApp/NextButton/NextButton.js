import React from 'react';
import styled from 'styled-components';
import { Spring } from 'react-spring';
import Button from '../../../components/Button/Button';
import PropTypes from 'prop-types';

const NextButtonWrapper = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    flex-direction: column;
    bottom: 150px;
    left: 50%;
    -webkit-transform: translate(-50%, 0);
    -ms-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
`;

const AttemptsRemaining = styled.div`
    color: white;
    font-size: 1.4em;
    margin: 30px auto;
    -ms-transform: translate(-50%, 0);
`;

const renderAttemptText = lives => {
    const numlives = lives > 0 ? lives : 'No';
    const attempts = `attempt${lives === 1 ? '' : 's'}`;
    return `${numlives} ${attempts} remaining`;
};

const NextButton = props => (
    <NextButtonWrapper>
        {props.correctAnswer === false ? (
            <Spring delay={600} from={{ opacity: 0 }} to={{ opacity: 1 }}>
                {styles => (
                    <AttemptsRemaining style={styles}>
                        {renderAttemptText(props.lives)}
                    </AttemptsRemaining>
                )}
            </Spring>
        ) : null}
        <Spring delay={630} from={{ opacity: 0 }} to={{ opacity: 1 }}>
            {styles => (
                <Button style={styles} onClick={props.onClick}>
                    {props.lives > 0 ? 'Next Song' : 'Get Your Results'}
                </Button>
            )}
        </Spring>
    </NextButtonWrapper>
);

NextButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    correctAnswer: PropTypes.bool.isRequired,
    lives: PropTypes.number
};

export default NextButton;
