import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const Lyrics = props => {
  const [track, setTrack] = useState({});
  const [lyrics, setLyrics] = useState({});
  // get trackid from the track
  const track_id = props.match.params.id;

  const apiLyrics = `track.lyrics.get?track_id=${track_id}`;
  const apiTrack = `track.get?track_id=${track_id}`;

  const loadTrackLyrics = async () => {
    const header = {
      'Content-Type': 'application/json',
    };
    // load lyrics
    const corsAnywhere = 'https://cors-anywhere.herokuapp.com';
    const resLyrics = await axios.get(
      `${corsAnywhere}/https://api.musixmatch.com/ws/1.1/${apiLyrics}&apikey=${process.env.REACT_APP_MM_KEY}`,
      {
        headers: header,
      }
    );
    const dataLyrics = resLyrics.data;
    const track_lyrics = dataLyrics.message.body.lyrics;
    setLyrics(track_lyrics);

    // load track
    const resTrack = await axios.get(
      `${corsAnywhere}/https://api.musixmatch.com/ws/1.1/${apiTrack}&apikey=${process.env.REACT_APP_MM_KEY}`,
      {
        headers: header,
      }
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
    const genre = track.primary_genres.music_genre_list;
    return (
      <>
        <Link to='/' className='btn btn-dark btn-sm mb-4'>
          Go Back
        </Link>
        <div className='card'>
          <h5 className='card-header'>
            {track.track_name} by{' '}
            <span className='text-secondary'>
              {track.artist_name && track.artist_name}
            </span>
          </h5>
          <div className='card-body'>
            <p className='card-text'>
              {lyrics.lyrics_body && lyrics.lyrics_body}
            </p>
          </div>

          <ul className='list-group mb-3'>
            <li className='list-group-item'>
              <strong>Album ID </strong>: {track.album_id}
            </li>
            <li className='list-group-item'>
              <strong>Song Genre </strong>:
              {genre.length > 0 && genre[0].music_genre.music_genre_name}
            </li>
            <li className='list-group-item'>
              <strong>Explicit Words</strong>:{' '}
              {track.explicit === 0 ? 'No' : 'Yes'}
            </li>
            <li className='list-group-item'>
              {/* npm i moment react-moment */}
              {/* it is handy tool to format dates */}
              <strong>Release Date</strong>:{' '}
              {track.updated_time && (
                <Moment format='MM/DD/YYYY'>{track.updated_time}</Moment>
              )}
            </li>
          </ul>
        </div>
      </>
    );
  }
};

export default Lyrics;
