import React, { useState } from "react";
import logo from './homeLogo.png';
import './Home.css'

export default function Home() {
  const [lang] = useState("ar")
  return (
    <div className={`${lang === 'en' ? "homeEn" : "home"}`}>
      
      <div className="icon ">
        <img src={logo} />
      </div>
      <div className="description">
        <h3>
            KiDefender
        </h3>
        {
          lang === "en" ?
          <p>chrome extension that helps you to protect your kids from inappropriate content on the internet.</p>
          :
          <p>اضافة تساعدك علي حماية طفلك من المحتوي الغير مناسب علي الانترنت</p>
        }
       
      </div>
    </div>
  );
}
