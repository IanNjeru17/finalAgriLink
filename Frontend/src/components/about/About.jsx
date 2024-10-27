import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <section className="about-us-section">
      <div className="container">
        <h2 className="about-us-title">About Us</h2>
        <p className="about-us-description">
          We are a dedicated team committed to providing high-quality, sustainable agricultural products. With years of expertise and a strong focus on eco-friendly practices, our mission is to promote health, wellness, and environmental care through every product we grow and share with our community.
        </p>
        <div className="about-us-stats">
          <div className="stat">
            <h3>20+</h3>
            <p>Years of Experience</p>
          </div>
          <div className="stat">
            <h3>100%</h3>
            <p>Organic Farming</p>
          </div>
          <div className="stat">
            <h3>500+</h3>
            <p>Happy Customers</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
