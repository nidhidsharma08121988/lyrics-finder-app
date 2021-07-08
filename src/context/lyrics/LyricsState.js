import React, { useState, useReducer, useEffect } from 'react';
import LyricsContext from './lyricsContext';
import lyricsReducer from './lyricsReducer';
import axios from 'axios';
import { SET_TRACKS } from '../types';
const LyricsState = props => {
  const initialState = useState({
    tracks_list: [],
    heading: 'Top 10 tracks',
  });

  //load tracks initially when the component loads
  const loadTracks = async () => {
    try {
      // the original request will be blocked by the CORS hence i have to put
      // https://cors-anywhere.herokuapp.com
      // before the actual request
      // https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}
      let res = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`
      );
      let data = res.data;
      let tracks = data.message.body.track_list;
      // load state in reducer
      dispatch({
        type: SET_TRACKS,
        payload: tracks,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadTracks();
  }, []);

  const [state, dispatch] = useReducer(lyricsReducer, initialState);
  return (
    <LyricsContext.Provider
      value={{
        ...state,
      }}
    >
      {props.children}
    </LyricsContext.Provider>
  );
};

export default LyricsState;
