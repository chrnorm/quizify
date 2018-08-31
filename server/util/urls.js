let CLIENT_URL;

process.env.NODE_ENV === 'dev'
    ? (CLIENT_URL = 'http://localhost:3000')
    : (CLIENT_URL = 'http://quizify.app'); // digitalocean droplet public ip

export default CLIENT_URL;
