import React, { useContext } from 'react';
import ListContext from '../../context/lyrics/lyricsContext';
import Spinner from '../layout/Spinner';

const Tracks = () => {
  const listContext = useContext(ListContext);
  console.log(listContext);
  const { tracks_list, heading } = listContext;
  return (
    <div>
      <h1>{heading}</h1>
      <div className=''>
        {/* {console.log(tracks_list)} */}
        {tracks_list &&
          (tracks_list.length === 0 ? <Spinner /> : 'load the tracks')}
      </div>
    </div>
  );
};

export default Tracks;
