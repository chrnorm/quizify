import React from 'react';
import styled from 'styled-components';
import { Text } from 'rebass';
import { Link } from 'react-router-dom';

const LogoText = styled(Text)`
    letter-spacing: -0.02em;
`;

export const QuizifyLogo = () => (
    <LogoText
        fontFamily="logo"
        fontSize={7}
        color="brandBlue.0"
        className="noselect"
        mb={4}
        as={'h1'}
    >
        Quizify
    </LogoText>
);

const WatermarkText = styled(LogoText)`
    position: absolute;
    bottom: 20px;
    left: 20px;
`;

export const WatermarkLogo = () => (
    <Link to={'/'}>
        <WatermarkText
            fontFamily="logo"
            fontSize={4}
            color="brandGrey.0"
            m={0}
            className="noselect"
            as={'h2'}
        >
            Quizify
        </WatermarkText>
    </Link>
);
