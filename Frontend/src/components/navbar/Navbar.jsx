import "./navbar.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
// import { DarkModeContext } from "../../context/darkModeContext.js";
import { useContext } from "react";
import { useAuth } from "../../context/AuthContext.js";
import React, { useState } from "react";

const Navbar = () => {
  // const { dispatch } = useContext(DarkModeContext);
  const { user } = useAuth();
  const [openDropdown, setOpenDropdown] = useState(false);

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const getInitials = (name) => {
    const names = name.split(" ");
    return names.map(n => n.charAt(0).toUpperCase()).join("");
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
       
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item" onClick={toggleDropdown}>
            {user ? (
              <div className="avatar">
                {getInitials(user.first_name + " " + (user.last_name || ''))}
              </div>
            ) : (
              <img src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="avatar" />
            )}
            {openDropdown && (
              <div className="dropdown">
                <a href="/profile">Profile</a>
                <a href="/settings">Settings</a>
                <a href="/logout">Logout</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
