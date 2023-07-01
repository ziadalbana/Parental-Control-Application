import React, { useState, useEffect } from "react";
import logo from './logo.png';

// ICONS
import { FaTwitter } from 'react-icons/fa';
import { BsImages } from 'react-icons/bs';
import { FaGlobe  } from 'react-icons/fa';
import { BsChevronDown , BsChevronUp } from 'react-icons/bs';
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

export default function Navbar({ refreshApp }) {


const [adultImage , setAdultImage] = useState(false);
const [safeSearch ,setSafeSearch ] = useState(false);
const [adultTweets , setAdultTweets ] = useState(false);
const [modalIsOpen, setModalIsOpen] = useState(false);
const [type , setType] = useState("");
const [data ,setData] = useState(false);
const [loading, setLoading] = useState(true);
const [lang , setLang] = useState(localStorage.getItem('lang'));

const [showLanguageOptions, setShowLanguageOptions] = useState(false);

const handleLanguageClick = () => {
  setShowLanguageOptions(!showLanguageOptions);
};


const styles = {
  left : '40%'
};

function logOut(){
  localStorage.removeItem('userName');
  refreshApp(); 
}

function convertLangToAr() {
  localStorage.setItem('lang' , 'ar');
  //setLang("ar");
  refreshApp(); 
}

function convertLangToEn() {
  localStorage.setItem('lang' , 'en');
  //setLang("en");
  refreshApp(); 
}

async function getUser() {
  return fetch(`http://localhost:8000/user/getuser/${localStorage.getItem('userName')}`, {
  method: 'GET',
  headers: {
    Authorization : `Bearer ${localStorage.getItem('token')}`,
  }
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
   


}, [safeSearch , adultImage , adultTweets]);
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
//  const ToggleSafeSearch = () => {
//     setData(!safeSearch);
//     setSafeSearch(!safeSearch);
//     setType("safeSearch");
//     openModal();
//  }
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
        <div className={`navbar ${lang === 'en' ? "ltr" : "rtl"}`}>
          <Link to="/index.html">
              <div className="logo">
                  <img src={logo} alt="" />
              </div>
          </Link>
          <div className="userInfo">
            <div>{localStorage.getItem("userName")}</div>
            <div className="logout" onClick={logOut}> {lang === "en" ? "logout" : "تسجيل الخروج"}</div>
          </div>
        </div>
        <nav className={`nav-menu active ${lang === 'en' ? "english" : "arabic"}`}>
          <ul className="nav-menu-items" >
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{lang === "en" ? item.title : item.titleAr}</span>
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
                        
                        {lang === 'en' ? <span>Block Adult Tweets</span>: <span>حجب التويتات الغير مناسبة</span>}
                        
                        
                        <Toggle
                            toggled={adultTweets}
                            onClick={ToggleAdultTweets}
                        />
                    </Link>
                </li>
                <li key='images' className='nav-text'>
                    <Link>
                        <BsImages />
                        {lang === 'en' ? <span>Block Adult Images</span>: <span>حجب الصور الغير مناسبة</span>}
                        
                        <Toggle
                            toggled={adultImage}
                            onClick={ToggleAdultImages}
                        />
                    </Link>
                </li>
                {/* <li key='search' className='nav-text'>
                    <Link>
                         <FaSearch />
                        <span>Enforce Safe Search</span>
                        <Toggle
                            toggled={safeSearch}
                            onClick={ToggleSafeSearch}
                        />
                    </Link>
                </li> */}
                  </div>
               }

                <li key='lang' className='nav-text'>
                    <Link onClick={handleLanguageClick} className="langLink">
                       <FaGlobe  />
                        {lang === 'en' ? <span>Language</span>: <span>اللغة</span>}
                        {showLanguageOptions ? (
                          <BsChevronUp className="arrow" />
                        ) : (
                          <BsChevronDown className="arrow" />
                        )}
                        
                    </Link>
                    {showLanguageOptions && (
                      <ul className="sub-menu">
                        <li>
                          <a onClick={convertLangToAr}>{lang === 'en' ? <span>Arabic</span>: <span>العربية</span>}</a>
                        </li>
                        <li>
                          <a onClick={convertLangToEn} >{lang === 'en' ? <span>English</span>: <span>الانجليزية</span>}</a>
                        </li>
                      </ul>
                    )}
                </li>
          </ul>
         
          <ModalComponent refreshApp={refreshApp} openModal = {openModal} closeModal = {closeModal} modalIsOpen = {modalIsOpen} type={type} data = {data} />
          <ModalComponent refreshApp={refreshApp} openModal = {openModal} closeModal = {closeModal} modalIsOpen = {modalIsOpen} type="logout" logout = {logOut} />
        </nav>
      </IconContext.Provider>
    </>
  );
}
