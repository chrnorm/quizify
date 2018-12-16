import React from 'react';
import styled from 'styled-components';

const QuizifyText = styled.div`
    font-family: 'Montserrat', sans-serif;
    ${props =>
        props.big
            ? `
    font-size: 4em;
    margin-bottom: 44px;
    color: white;
    `
            : null}
`;

const QuizifyLogo = ({ big }) => (
    <QuizifyText className="noselect" big={big}>
        Quizify
    </QuizifyText>
);

export default QuizifyLogo;
