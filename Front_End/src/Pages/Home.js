import React from "react";
import logo from '../Components/Navbar/logo.png';
import './Home.css'

export default function Home() {
  return (
    <div className="home">
      <div className="icon">
        <img src={logo} />
      </div>
    </div>
  );
}
