import React from 'react';
import { Text as BaseText, Flex } from 'rebass';
import styled from 'styled-components';

const ScoreText = styled(BaseText)`
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;

const ScoreTracker = ({ score }) => {
    return (
        <Flex
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
        >
            <ScoreText width={1} color="brandGrey.1" textAlign={'center'}>
                Score
            </ScoreText>
            <BaseText
                fontSize={5}
                fontWeight={500}
                mt={'-10px'}
                textAlign={'center'}
                width={1}
                color="brandGrey.2"
            >
                {score}
            </BaseText>
        </Flex>
    );
};

export default ScoreTracker;
