// BackgroundVideo.js
import React from 'react';
import backgroundVideo from '../Assets/video2.mp4'; 

const BackgroundVideo = () => (
  <div className="background-video">
    <video autoPlay loop muted>
      <source src={backgroundVideo} type="video/mp4" />
    </video>
  </div>
);

export default BackgroundVideo;
