import styled from 'styled-components';

const GradientBackground = styled.div`
    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#e7edf5+0,f1f4f8+100 */
    background: #e7edf5; /* Old browsers */
    background: -moz-linear-gradient(
        top,
        #e7edf5 0%,
        #f1f4f8 100%
    ); /* FF3.6-15 */
    background: -webkit-linear-gradient(
        top,
        #e7edf5 0%,
        #f1f4f8 100%
    ); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(
        to bottom,
        #e7edf5 0%,
        #f1f4f8 100%
    ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e7edf5', endColorstr='#f1f4f8',GradientType=0 ); /* IE6-9 */
    width: 100vw;
    height: 100vh;
    z-index: -1;
    position: absolute;
`;

export default GradientBackground;
