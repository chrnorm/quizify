import React from 'react';
import { connect } from 'react-redux';
import QuizifyLogo from '../../components/QuizifyLogo/QuizifyLogo';
import GradientBackground from '../../components/GradientBackground/GradientBackground';
import styled from 'styled-components';
import { AUTH_REQUEST } from '../../redux/reducers';
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

const Tagline = styled.p`
    font-size: 1.6em;
    margin-top: 0;
    margin-bottom: 226px;
    color: white;
    text-align: center;
`;

const PageLanding = props => (
    <PageLandingWrapper>
        <GradientBackground />
        <QuizifyLogo big />
        <Tagline>Test how well you know your Spotify library.</Tagline>
        <Button onClick={() => props.dispatch({ type: AUTH_REQUEST })}>
            Login With Spotify To Play
        </Button>
    </PageLandingWrapper>
);

export default connect()(PageLanding);
