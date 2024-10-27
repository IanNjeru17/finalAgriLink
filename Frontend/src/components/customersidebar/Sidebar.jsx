import "./sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext.js";
import { useContext } from "react";
import LogoutModal from "../logout/LogoutModal.jsx";
import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch('/api/logout', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`
        }
    })
    .then(response => {
        if (response.ok) {
            
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');

          
            setLogoutMessage('Logged out successfully');
            setTimeout(() => {
                navigate('/login'); 
               
            }, 300); 
        } else {
            console.error('Logout failed');
            setLogoutMessage('Logout failed. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error during logout:', error);
        setLogoutMessage('An error occurred. Please try again.');
    });
};
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Agrilink Oasis</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/customer/Home" style={{textDecoration:'none'}}>
          
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>
          <p className="title">LISTS</p>
        
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <Link to="/customer/order" style={{textDecoration:"none"}}>
          <li>
            <CreditCardIcon className="icon" />
            <span>Orders</span>
          </li>
          </Link>
          <Link to="/customer/my-orders" style={{textDecoration:"none"}}>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>
              My orders
            </span>

            </li></Link>
         
         
         
          <p className="title">USER</p>
          <Link to="/customer/profile" style={{textDecoration:"none"}}>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          </Link>
          <li>
                        <ExitToAppIcon className="icon" onClick={() => setModalOpen(true)} />
                        <span onClick={() => setModalOpen(true)}>Logout</span>
                    </li>
        </ul>
      </div>
      <LogoutModal 
                open={modalOpen} 
                handleClose={() => setModalOpen(false)} 
                handleLogout={handleLogout} 
            />
    
    </div>
  );
};

export default Sidebar;
