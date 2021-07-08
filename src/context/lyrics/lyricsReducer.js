import { SET_TRACKS } from '../types';
const lyricsReducer = (state, action) => {
  switch (action.type) {
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
