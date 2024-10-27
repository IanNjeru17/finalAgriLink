import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    role: '', // Start with an empty string
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required('Required'),
    last_name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    phone: Yup.string().required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    role: Yup.string().required('Required'), // Ensure role is selected
  });

  const onSubmit = async (values) => {
    setError('');
    try {
      const response = await fetch('http://127.0.0.1:5000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'An error occurred');
      }

      const data = await response.json();
      const { access_token, refresh_token } = data;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error);
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
    {error && <div className="error-message">{error}</div>}
  
    <video autoPlay loop muted playsInline className="background-video">
      <source src="https://videos.pexels.com/video-files/27425128/12140266_360_640_30fps.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  
    {/* Content Overlay */}
    <div className="auth-content">
      <div className="auth-header">
        <img src="logo.svg" alt="Sign Up" className="header-image" />
        <h2>Sign Up</h2>
      </div>
  
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {() => (
          <Form className='auth-form'>
            <div className='form-card'>
              {/* Grid Layout for Inputs */}
              <div className='form-grid'>
                {/* First Name Field */}
                <div className="form-group">
                  <Field name="first_name" placeholder="First Name" className="input-field" />
                  <ErrorMessage name="first_name" component="div" className='error-message' />
                </div>
  
                {/* Last Name Field */}
                <div className="form-group">
                  <Field name="last_name" placeholder="Last Name" className="input-field" />
                  <ErrorMessage name="last_name" component="div" className='error-message' />
                </div>
  
                {/* Email Field */}
                <div className="form-group">
                  <Field name="email" placeholder="Email" className="input-field" />
                  <ErrorMessage name="email" component="div" className='error-message' />
                </div>
  
                {/* Phone Field */}
                <div className="form-group">
                  <Field name="phone" placeholder="Phone" className="input-field" />
                  <ErrorMessage name="phone" component="div" className='error-message' />
                </div>
  
                {/* Password Field */}
                <div className="form-group">
                  <Field name="password" placeholder="Password" type="password" className="input-field" />
                  <ErrorMessage name="password" component="div" className='error-message' />
                </div>
  
                {/* Role Selection */}
                <div className="form-group">
                  <Field as="select" name="role" className="input-field">
                    <option value="" label="Select role" />
                    <option value="customer">Customer</option>
                    <option value="farmer">Farmer</option>
                    <option value="admin">Admin</option>
                  </Field>
                  <ErrorMessage name="role" component="div" className='error-message' />
                </div>
              </div>
  
              {/* Submit Button */}
              <button type="submit" className='signup-button'>Sign Up</button>
            

              <div className="form-links">
            <a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>
            <a href="/login" className="signup-link">Already have an Account</a>
          </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  </div>
  


  );
};

export default Signup;
