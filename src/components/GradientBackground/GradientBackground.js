import styled from 'styled-components';

const GradientBackground = styled.div`
    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#3d7d9f+0,18a57a+100 */
    background: #3d7d9f; /* Old browsers */
    background: -moz-linear-gradient(
        top,
        #3d7d9f 0%,
        #18a57a 100%
    ); /* FF3.6-15 */
    background: -webkit-linear-gradient(
        top,
        #3d7d9f 0%,
        #18a57a 100%
    ); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(
        to bottom,
        #3d7d9f 0%,
        #18a57a 100%
    ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#3d7d9f', endColorstr='#18a57a',GradientType=0 ); /* IE6-9 */
    width: 100vw;
    height: 100vh;
    z-index: -1;
    position: absolute;
`;

export default GradientBackground;
