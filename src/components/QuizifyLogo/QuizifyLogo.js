import React from 'react';
import styled from 'styled-components';
import { Text } from 'rebass';
import { Link } from 'react-router-dom';

export const QuizifyLogo = () => (
    <Text
        fontFamily="logo"
        fontSize={7}
        color="brandBlue.0"
        className="noselect"
        mb={4}
        as={'h1'}
    >
        Quizify
    </Text>
);

const WatermarkText = styled(Text)`
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
