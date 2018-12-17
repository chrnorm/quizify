import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { QuizifyLogo } from '../QuizifyLogo/QuizifyLogo';

const NavBox = styled.div`
    position: absolute;
    height: 50px;
    background-color: #00454b;
    width: 100%;
    display: flex;
    flex-direction: column;
    display: flex;
    justify-content: center;
`;

const NavLogo = styled.div`
    display: inline-block;
    margin-left: 2.5%;
    color: white;
    font-size: 1.5em;
`;

const NavBar = () => (
    <NavBox>
        <Link to="/">
            <NavLogo>
                <QuizifyLogo />
            </NavLogo>
        </Link>
    </NavBox>
);

export default NavBar;
