import React from 'react';
import { connect } from 'react-redux';
import { QuizifyLogo } from '../../components/QuizifyLogo/QuizifyLogo';
import GradientBackground from '../../components/GradientBackground/GradientBackground';
import styled from 'styled-components';
import { AUTH_REQUEST } from '../../redux/reducers';
import { Text } from 'rebass';
import Button from '../../components/Button/Button';

const PageLandingWrapper = styled.div`
    position: absolute;
    display: flex;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const PageLanding = props => (
    <PageLandingWrapper>
        <GradientBackground />
        <QuizifyLogo big />
        <Text color="brandBlue.1" mb={6} fontSize={4} as={'p'}>
            Test how well you know your Spotify library.
        </Text>
        <Button onClick={() => props.dispatch({ type: AUTH_REQUEST })}>
            Play Now
        </Button>
    </PageLandingWrapper>
);

export default connect()(PageLanding);
