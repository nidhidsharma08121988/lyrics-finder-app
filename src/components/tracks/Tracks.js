import React, { useContext } from 'react';
import ListContext from '../../context/lyrics/lyricsContext';
import Spinner from '../layout/Spinner';
import Track from './Track';

const Tracks = () => {
  const listContext = useContext(ListContext);
  const { tracks_list, heading } = listContext;


  return (
    <>
      <div>
        {/* {console.log(tracks_list)} */}
        {tracks_list &&
          (tracks_list.length === 0 ? (
            <Spinner />
          ) : (
            <>
              <h3 className='text-center mb-4'>{heading}</h3>
              <div className='row'>
                {tracks_list.map(item => (
                  <Track key={item.track.track_id} track={item.track} />
                ))}
              </div>
            </>
          ))}
      </div>
    </>
  );
};

export default Tracks;
