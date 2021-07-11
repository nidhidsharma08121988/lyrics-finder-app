import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';

const Lyrics = props => {
  const [track, setTrack] = useState({});
  const [lyrics, setLyrics] = useState({});
  // get trackid from the track
  const track_id = props.match.params.id;

  const apiLyrics = `track.lyrics.get?track_id=${track_id}`;
  const apiTrack = `track.get?track_id=${track_id}`;

  const loadTrackLyrics = async () => {
    // load lyrics
    const resLyrics = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/${apiLyrics}&apikey=${process.env.REACT_APP_MM_KEY}`
    );
    const dataLyrics = resLyrics.data;
    const track_lyrics = dataLyrics.message.body.lyrics;
    setLyrics(track_lyrics);

    // load track
    const resTrack = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/${apiTrack}&apikey=${process.env.REACT_APP_MM_KEY}`
    );
    const dataTrack = resTrack.data;
    const the_track = dataTrack.message.body.track;
    setTrack(the_track);
  };

  useEffect(() => {
    loadTrackLyrics();
    //eslint-disable-next-line
  }, []);

  if (
    track === undefined ||
    lyrics === undefined ||
    Object.keys(track).length === 0 ||
    Object.keys(lyrics).length === 0
  ) {
    return <Spinner />;
  } else {
    return (
      <>
        <Link to='/' className='btn btn-dark btn-sm mb-4'>
          Go Back
        </Link>
        <div className='card'>
          <h5 className='card-header'>
            {track.track_name} by{' '}
            <span className='text-secondary'>{track.artist_name}</span>
          </h5>
          <div className='card-body'>
            <p className='card-text'>{lyrics.lyrics_body}</p>
          </div>
        </div>
      </>
    );
  }
};

export default Lyrics;
