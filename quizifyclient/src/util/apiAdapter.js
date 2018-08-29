import API_URL from './apiUrl';

export default {
    getQuestion: async () => {
        const res = await fetch(`${API_URL}/question`, {
            credentials: 'include'
        });
        return res.json();
    }
};
