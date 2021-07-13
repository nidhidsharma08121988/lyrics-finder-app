import React, { useState, useReducer, useEffect } from 'react';
import LyricsContext from './lyricsContext';
import lyricsReducer from './lyricsReducer';
import axios from 'axios';
import { CLEAR_SEARCH, SET_TRACKS, UPDATE_TRACKS } from '../types';
const LyricsState = props => {
  //useState is used as we need to update the initial state in useEffect
  //eslint-disable-next-line
  const [initialState, setInitialState] = useState({
    tracks_list: [],
    heading: 'Top 10 tracks',
  });

  //load tracks initially when the component loads
  const loadTopTracks = async () => {
    try {
      const header = {
        'Content-Type': 'application/json',
      };
      // the original request will be blocked by the CORS hence i have to put
      // https://cors-anywhere.herokuapp.com/
      // before the actual request
      // https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}
      const corsAnywhere = 'https://cors-anywhere.herokuapp.com';
      const res = await axios.get(
        `${corsAnywhere}/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`,
        {
          headers: header,
        }
      );
      const data = res.data;
      const tracks = data.message.body.track_list;
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
    loadTopTracks();
  }, []);

  // update to contain search results
  const updateTrackList = tracks_list => {
    dispatch({
      type: UPDATE_TRACKS,
      payload: tracks_list,
    });
  };

  const clearSearch = async () => {
    try {
      const header = {
        'Content-Type': 'application/json',
      };
      const corsAnywhere = 'https://cors-anywhere.herokuapp.com';
      const res = await axios.get(
        `${corsAnywhere}/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`,
        {
          headers: header,
        }
      );
      const data = res.data;
      const tracks = data.message.body.track_list;
      // load state in reducer
      dispatch({
        type: CLEAR_SEARCH,
        payload: tracks,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const [state, dispatch] = useReducer(lyricsReducer, initialState);

  return (
    <LyricsContext.Provider
      value={{
        heading: state.heading,
        tracks_list: state.tracks_list,
        updateTrackList,
        clearSearch,
      }}
    >
      {props.children}
    </LyricsContext.Provider>
  );
};

export default LyricsState;
