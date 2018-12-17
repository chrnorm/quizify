import styled from 'styled-components';
import { Button as BaseButton } from 'rebass';

const Button = styled(BaseButton)`
    background-color: ${props => props.theme.colors.brandBlue[2]};
    text-transform: uppercase;
    transition: all 0.2s ease;
    text-decoration: none;

    &:hover {
        cursor: pointer;
        text-decoration: none;
        background-color: ${props => props.theme.colors.brandBlue[1]};
    }
`;

export default Button;
