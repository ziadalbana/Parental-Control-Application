import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route   } from "react-router-dom";
import Auth from "./Components/Auth/Auth"
import 'react-toastify/dist/ReactToastify.css';






import './App.css';
import Navbar from './Components/Navbar/Navbar';
// PAGES
import Home from "../src/Pages/Home"
import Sites from "../src/Pages/Sites";
import Words from "../src/Pages/Words";
import History from "../src/Pages/History";


function App() {
 

   
 const [user ,setUser ] = useState("");
 
 console.log(user);

 
  return (
    <div>

      {
        user?
        
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/index.html" element={<Home />} />
              <Route path="/sites" element={<Sites />} />
              <Route path="/history" element={<History />} />
              <Route path="/words" element={<Words />} />
            </Routes>
          </BrowserRouter>

        :

       <Auth />

        
      }


          
    </div>
          
      );
}

export default App;
