import { SET_HEADING, SET_TRACKS } from '../types';
const lyricsReducer = (state, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default lyricsReducer;
