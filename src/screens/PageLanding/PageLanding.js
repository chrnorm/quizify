import React from 'react';
import QuizifyLogo from '../../components/QuizifyLogo/QuizifyLogo';
import GradientBackground from '../../components/GradientBackground/GradientBackground';
import styled from 'styled-components';
import API_URL from '../../util/apiUrl';
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

const BigLogo = styled.div`
    font-size: 4em;
    margin-bottom: 44px;
    color: white;
`;

const Tagline = styled.p`
    font-size: 1.6em;
    margin-top: 0;
    margin-bottom: 226px;
    color: white;
    text-align: center;
`;

const PageLanding = () => (
    <PageLandingWrapper>
        <GradientBackground />
        <BigLogo>
            <QuizifyLogo />
        </BigLogo>
        <Tagline>Test how well you know your Spotify library.</Tagline>
        <a
            style={{ textDecoration: 'none' }}
            href={'/.netlify/functions/login'}
        >
            <Button>Login With Spotify To Play</Button>
        </a>
    </PageLandingWrapper>
);

export default PageLanding;
