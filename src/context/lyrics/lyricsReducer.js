import { SET_HEADING, SET_TRACKS, CLEAR_SEARCH, UPDATE_TRACKS } from '../types';
const lyricsReducer = (state, action) => {
  switch (action.type) {
    case CLEAR_SEARCH:
      return {
        ...state,
        heading: 'Top 10 Tracks',
        tracks_list: action.payload,
      };
    case SET_HEADING:
      return {
        ...state,
        heading: action.payload,
      };
    case SET_TRACKS:
      return {
        ...state,
        tracks_list: action.payload,
      };
    case UPDATE_TRACKS:
      return {
        ...state,
        tracks_list: action.payload,
        heading: 'Search Results',
      };
    default:
      return state;
  }
};

export default lyricsReducer;
