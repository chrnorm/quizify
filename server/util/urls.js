let CLIENT_URL;

process.env.NODE_ENV !== 'production'
    ? (CLIENT_URL = 'http://localhost:3000')
    : (CLIENT_URL = 'https://quizify.app'); // digitalocean droplet public ip

module.exports = CLIENT_URL;
