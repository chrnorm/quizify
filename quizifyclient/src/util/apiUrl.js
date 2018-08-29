let API_URL;

process.env.REACT_APP_STAGE === 'dev'
    ? (API_URL = 'http://localhost:8888')
    : (API_URL = 'http://localhost:8888');

export default API_URL;
