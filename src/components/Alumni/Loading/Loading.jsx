import React from 'react';
import './Loading.css';  
import loadingVideo from '../../../assets/images/loading.mp4';  // Ensure the path is correct

const Loading = () => {
  return (
    <div className="loading-fullscreen">
      <video 
        className="loading-video" 
        src={loadingVideo} 
        autoPlay 
        loop 
        muted 
        playsInline
        alt="Loading..."
      />
    </div>
  );
};

export default Loading;
