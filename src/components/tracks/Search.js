import React, { useContext, useState } from 'react';
import axios from 'axios';
import LyricsContext from '../../context/lyrics/lyricsContext';

const Search = () => {
  const [trackTitle, setTrackTitle] = useState('');
  const lyricsContext = useContext(LyricsContext);
  const { updateTrackList, clearSearch } = lyricsContext;

  const handleChange = e => {
    setTrackTitle(e.target.value);
  };

  const findTrack = async e => {
    e.preventDefault();
    // reload tracks and update the context
    try {
      const header = {
        'Content-Type': 'application/json',
      };
      const corsAnywhere = 'https://cors-anywhere.herokuapp.com';
      const res = await axios.get(
        `${corsAnywhere}/https://api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`,
        {
          headers: header,
        }
      );
      const data = res.data;
      const tracks = data.message.body.track_list;
      // next update the tracks
      updateTrackList(tracks);
    } catch (err) {
      console.log(err);
    }
  };

  const clear = () => {
    clearSearch();
  };

  return (
    <div className='card card-body mb-4 p-4'>
      <h1 className='display-4 text-center'>
        <i className='fa fa-music'></i> Search for a song
      </h1>
      <p className='lead text-center'> Get Lyrics for any song</p>
      <form onSubmit={findTrack}>
        <div className='form-group'>
          <input
            type='text'
            className='form-control form-control-lg'
            placeholder='Song title...'
            name='trackTitle'
            value={trackTitle}
            onChange={handleChange}
          />
        </div>
        <button className='btn btn-primary btn-block' type='submit'>
          Get Track Lyrics
        </button>
        <button className='btn btn-secondary btn-block' onClick={clear}>
          Clear Search
        </button>
      </form>
    </div>
  );
};

export default Search;
