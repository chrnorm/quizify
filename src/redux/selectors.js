import { createSelector } from 'reselect';

const getLibrary = state => state.library;

export const getTracksWithPreview = createSelector([getLibrary], library =>
    library.filter(t => t.preview_url)
);
