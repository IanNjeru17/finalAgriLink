import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    setError('');
    try {
      const response = await login(values.email, values.password);
  
    
      console.log("Login Response:", response);
    
      const userRole = response.role;
  
     
      if (userRole === 'customer') {
        navigate('/customer/Home');
      } else if (userRole === 'farmer') {
        navigate('/farmer/Home');
      // } else if (userRole === 'admin') {
      //   navigate('/admin');
      } else {
        console.error('Unknown user role:', userRole);
        navigate('/login');
      }
    } catch (error) {
      setError(error.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };
  
  

  

  return (
    <div className="login-container">
  <div className="auth-header">
    <img src="logo.svg" alt="Sign Up" className="header-image" />
    <h2 className='wlxomw'>Welcome Back to AgriLink</h2>
  </div>
  
  {error && <div className="error-message">{error}</div>}

  <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
    {() => (
      <Form className="signup-form">
        <Field name="email" placeholder="Email" className="input-field" autoComplete="email" />
        <ErrorMessage name="email" component="div" className="error-message" />

        <Field name="password" placeholder="Password" type="password" className="input-field" autoComplete="current-password" />
        <ErrorMessage name="password" component="div" className="error-message" />

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </button>
        
        {/* Forgot Password and Sign Up Links */}
        <div className="form-links">
          <a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>
          <a href="/signup" className="signup-link">Sign Up</a>
        </div>
      </Form>
    )}
  </Formik>
</div>

  
  );
};

export default Login;
