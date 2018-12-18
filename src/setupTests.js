const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
};
global.localStorage = localStorageMock;

// https://github.com/jsdom/jsdom/issues/2112
window.location.assign = jest.fn();
