import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero">
      <video className="hero-video" autoPlay loop muted>
        <source src="https://videos.pexels.com/video-files/28964121/12530211_2560_1440_30fps.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
      <div className="hero-content">
        <h1>Welcome to AgriLink Oasis</h1>
        <p>Connecting farmers and consumers for a sustainable future.</p>
        <button>Get started</button>
      </div>
    </div>
  );
};

export default Hero;
