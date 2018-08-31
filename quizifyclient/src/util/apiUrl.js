let API_URL;

process.env.REACT_APP_STAGE === 'dev'
    ? (API_URL = 'http://localhost:8888')
    : (API_URL = 'http://178.128.21.154:8888'); // digitalocean droplet public ip

export default API_URL;
