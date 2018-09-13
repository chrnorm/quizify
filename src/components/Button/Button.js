import styled from 'styled-components';

const Button = styled.button`
    -webkit-border-radius: 28;
    -moz-border-radius: 28;
    border-radius: 28px;
    -webkit-box-shadow: 0px 3px 6px #666666;
    -moz-box-shadow: 0px 3px 6px #666666;
    box-shadow: 0px 3px 6px #666666;
    color: #707070;
    font-size: 20px;
    background: #fff;
    padding: 15px 23px 15px 23px;
    text-decoration: none;
    border: none;
    text-transform: uppercase;
    transition: all 0.2s ease;
    display: block;
    margin: 0 auto;

    &:hover {
        background: #fafafa;
        text-decoration: none;
        cursor: pointer;
    }
`;

export default Button;