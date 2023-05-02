import React, { useState } from "react";
import logo from './logo.png';

// ICONS
import { FaTwitter } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { BsImages } from 'react-icons/bs';

import { IconContext } from "react-icons";

// ROUTING

import { Link } from "react-router-dom";

// DATA FILE
import { SidebarData } from "./SlidebarData";

// STYLES
import "./Navbar.css";
import { Toggle } from "./Toggle";

export default function Navbar() {

const [adultImage , setAdultImage] = useState(false);
const [safeSearch ] = useState(false);
const [adultTweets ] = useState(false);

 const ToggleAdultImages = () => {
    setAdultImage(!adultImage);
 }
 const ToggleSafeSearch = () => {
    setAdultImage(!safeSearch);
 }
 const ToggleAdultTweets = () => {
    setAdultImage(!adultTweets);
 }

  return (
    <>
      <IconContext.Provider value={{ color: "#FFF" }}>
        {/* All the icons now are white */}
        <div className="navbar">
          <Link to="/">
              <div className="logo">
                  <img src={logo} alt="" />
              </div>
          </Link>
        </div>
        <nav className={"nav-menu active" }>
          <ul className="nav-menu-items" >
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>

                
                
              );
            })}

                <li key='adultTweets' className='nav-text'>
                    <Link>
                        <FaTwitter />
                        <span>Block Adult Tweets</span>
                        <Toggle
                            toggled={adultTweets}
                            onClick={ToggleAdultTweets}
                        />
                    </Link>
                </li>
                <li key='images' className='nav-text'>
                    <Link>
                        <BsImages />
                        <span>Block Adult Images</span>
                        <Toggle
                            toggled={adultImage}
                            onClick={ToggleAdultImages}
                        />
                    </Link>
                </li>
                <li key='search' className='nav-text'>
                    <Link>
                         <FaSearch />
                        <span>Enforce Safe Search</span>
                        <Toggle
                            toggled={safeSearch}
                            onClick={ToggleSafeSearch}
                        />
                    </Link>
                </li>
                

          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}