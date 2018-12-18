# Quizify

🎵 How well do you know your Spotify library? 🎵

This project is a demonstration of a highly animated user interface with complex asynchronous data fetching through the Spotify Web API. Everything is client-side (no servers!)

Under the hood, the app is built with React, React Spring (for animations), and Redux + Redux Saga (for async state management and API access).

The app authenticates with Spotify using the Implicit Grant Flow (more details in [the Spotify developer docs](https://developer.spotify.com/documentation/general/guides/authorization-guide/)).

## Getting started
To run a local development version of the app, first clone the repository and change directories into it, then run
```bash
yarn install
```

Then to start the development server, run
```bash
yarn start
```