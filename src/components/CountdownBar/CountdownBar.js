import React from 'react';
import styled from 'styled-components';
import { Transition } from 'react-spring';
import constrain from '../../util/constrain';

const BAR_WIDTH = 600;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${BAR_WIDTH}px;
`;

const Bar = styled.div`
    height: 4px;
    width: ${props => props.width}px;
    background-color: ${props => props.theme.colors.brandCyan[0]};
    border-radius: 1px;
`;

const CountdownBar = ({ fraction, show }) => {
    return (
        <Wrapper>
            <Transition
                items={show}
                from={{ opacity: 0 }}
                enter={{ opacity: 1 }}
                leave={{ opacity: 0 }}
            >
                {show =>
                    show &&
                    (props => (
                        <Bar
                            style={props}
                            width={constrain(fraction, 0, 1) * BAR_WIDTH}
                        />
                    ))
                }
            </Transition>
        </Wrapper>
    );
};

export default CountdownBar;
