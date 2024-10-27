import React from 'react'
import './ErrorPage.css'
const ErrorPage = () => {
  return (
    <div className="error-page-container">
    <div className="error-content">
        <h1 className='error-number'>404</h1>
        <h2>Oops! Page not found</h2>
        <p>We can't seem to find the page you're looking for.</p>
        <a href="/" className="home-button">Go back Home</a>
    </div>
    </div>

  )
}

export default ErrorPage