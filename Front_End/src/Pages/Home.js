import React from "react";
import logo from './homeLogo.png';
import './Home.css'

export default function Home() {
  return (
    <div className="home">
      <div className="icon">
        <img src={logo} />
      </div>
      <div className="description">
        <h3>
            KiDefender
        </h3>
        <h4>
          Protect Your Child From adult Content using these 5 features
        </h4>
        <ul>
          <li>Block custom Keywords</li>
          <li>Block specific website</li>
          <li>Block Adult Images</li>
          <li>Block Adult Tweets</li>
          <li>Enforce Safe Search</li>
        </ul>
      </div>
    </div>
  );
}
