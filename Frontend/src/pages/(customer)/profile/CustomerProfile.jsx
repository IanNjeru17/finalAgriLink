import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/customersidebar/Sidebar.jsx";
import "../dashboard/home.css";
// import Widget from "../../../components/widget/Widget"
// import Featured from "../../../components/featured/Featured.jsx";
// import Table from "../../../components/table/Table";
import { useAuth } from "../../../context/AuthContext.js";
import React, { useEffect, useState } from 'react';
import './profile.css'
const CustomerProfile = () => {
  const { user } = useAuth(); 
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5000/auth/user-profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        console.error('Failed to fetch profile.');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
    setLoading(false);
  };

  if (loading) return <p>Loading...</p>; 
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
       
        <div className="charts">
        {profile && (
        <div className="profile-info">
          <p><strong>First Name:</strong> {profile.first_name}</p>
          <p><strong>Last Name:</strong> {profile.last_name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Role:</strong> {profile.role}</p>
        </div>
      )}
        </div>
       
      </div>
    </div>
  );
};

export default CustomerProfile;
