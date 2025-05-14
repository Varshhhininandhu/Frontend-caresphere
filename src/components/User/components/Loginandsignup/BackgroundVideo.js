import React from 'react';
import video from './video2.mp4'
const BackgroundVideo = () => {
  return (
    <video
      autoPlay
      loop
      muted
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -1,
      }}
    >
      <source src={video} type="video/mp4" />
    </video>
  );
};

export default BackgroundVideo;