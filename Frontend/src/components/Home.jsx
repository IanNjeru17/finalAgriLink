// src/Home.js
import React from 'react';
import Navbar from './Navbar';
import Header from './Header/Header';
import HeroSection from './Hero/Hero';
import CategorySection from './category/CategorySection';
import AboutUs from './about/About';
import Footer from './footer/Footer';

function Home() {
  return (
    <div className="home-container">
      <Header />
      <HeroSection/>
      <CategorySection />
      <AboutUs />
    
      <section className='explore'>
        <div className="explore-item">
          <h3>Explore Our Services</h3>
          <p>Discover various tools we offer to enhance your farming experience.</p>
          <button className="explore-button">Learn More</button>
        </div>
        <div className="explore-item">
          <h3>Success Stories</h3>
          <p>Read about how other farmers have benefited from our platform.</p>
          <button className="explore-button">Read Stories</button>
        </div>
        <div className="explore-item">
          <h3>Join Our Community</h3>
          <p>Connect with fellow farmers and share insights.</p>
          <button className="explore-button">Join Now</button>
        </div>
      </section>

      <section className='testimonials'>
        <h2>User Testimonials</h2>
        <div className="testimonial">
          <p>"This platform has transformed the way I manage my farm!"</p>
          <span>- John Doe</span>
        </div>
        <div className="testimonial">
          <p>"The analytics tools are easy to use and incredibly helpful!"</p>
          <span>- Jane Smith</span>
        </div>
      </section>

      <section className='newsletter'>
        <h2>Stay Updated</h2>
        <p>Sign up for our newsletter to receive the latest news and tips.</p>
        <input type="email" placeholder="Enter your email" />
        <button className="signup-button">Subscribe</button>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
