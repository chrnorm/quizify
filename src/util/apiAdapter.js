import API_URL from './apiUrl';

export default {
    getQuestion: async () => {
        const res = await fetch(`${API_URL}/question`, {
            credentials: 'include'
        });
        return res.json();
    },
    getAnswer: async (correct, timeRemaining) => {
        const url = new URL(`${API_URL}/answer`);
        url.search = new URLSearchParams({ correct, timeRemaining });
        const res = await fetch(url, {
            credentials: 'include'
        });
        return res.json();
    },
    getStats: async () => {
        const res = await fetch(`${API_URL}/stats`, {
            credentials: 'include'
        });
        return res.json();
    },
    reset: async () => {
        const res = await fetch(`${API_URL}/reset`, {
            credentials: 'include'
        });
        return res;
    }
};
