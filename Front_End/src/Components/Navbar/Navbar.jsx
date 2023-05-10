import React, { useState, useEffect } from "react";
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
import ModalComponent from "../Modal/Modal";
import { ClipLoader } from "react-spinners";

export default function Navbar() {


const [adultImage , setAdultImage] = useState(false);
const [safeSearch ,setSafeSearch ] = useState(false);
const [adultTweets , setAdultTweets ] = useState(false);
const [modalIsOpen, setModalIsOpen] = useState(false);
const [type , setType] = useState("");
const [data ,setData] = useState(false);
const [loading, setLoading] = useState(true);

const styles = {
  left : '40%'
};

function logOut(){
  localStorage.removeItem('userName');
  window.location.reload();
}

async function getUser() {
  return fetch(`http://localhost:8000/user/getuser/${localStorage.getItem('userName')}`, {
  method: 'GET',
  })
  .then(data => data.json())
}

useEffect(() => {
  getUser().then((token) => {
    setAdultImage(token.removeAdultImages);
    setAdultTweets(token.removeAdultTweets);
    setSafeSearch(token.enforceSafeSearch);
    setLoading(false);
  });
}, []);
    const openModal = () => {
      setModalIsOpen(true);
    };

    const closeModal = () => {
      setModalIsOpen(false);
    };


 const ToggleAdultImages = () => {
    setData(!adultImage);
    setAdultImage(!adultImage);
    setType("adultImages");
    openModal();
 }
 const ToggleSafeSearch = () => {
    setData(!safeSearch);
    setSafeSearch(!safeSearch);
    setType("safeSearch");
    openModal();
 }
 const ToggleAdultTweets = () => {
    setData(!adultTweets);
    setAdultTweets(!adultTweets);
    setType("AdultTweets");
    openModal();
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
          <div className="userInfo">
            <div>{localStorage.getItem("userName")}</div>
            <div className="logout" onClick={logOut}>logout</div>
          </div>
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
              
               {
                loading ? 
                  <div className="spinner-container" style={styles} >
                    <ClipLoader color="#FFF" loading={true} size={30} />
                  </div>

                  :

                  <div>
                    

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
                  </div>
               }
               
                

          </ul>
          <ModalComponent openModal = {openModal} closeModal = {closeModal} modalIsOpen = {modalIsOpen} type={type} data = {data} />
        </nav>
      </IconContext.Provider>
    </>
  );
}
