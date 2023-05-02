import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route   } from "react-router-dom";
import Auth from "./Components/Auth/Auth"
import 'react-toastify/dist/ReactToastify.css';

import Modal from 'react-modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';





import './App.css';
import Navbar from './Components/Navbar/Navbar';
// PAGES
import Home from "../src/Pages/Home"
import Sites from "../src/Pages/Sites";
import Words from "../src/Pages/Words";


function App() {
 console.log('Rendering App component');
 const saveChanges = () => {
  
}
const cancel = () => {
  
}

const [modalIsOpen, setModalIsOpen] = useState(false);

const openModal = () => {
  setModalIsOpen(true);
};

const closeModal = () => {
  setModalIsOpen(false);
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width:'40%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '1px 2px #888888',
  },
};


  const [user ] = useState(localStorage.getItem('userName'));

 
  return (
    <div>

      {
        user?
        
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sites" element={<Sites />} />
              <Route path="/words" element={<Words />} />
            </Routes>
            <button type="button" className="btn btn-outline-success saveSetting" onClick={openModal}>Save Changes</button>
            <button type="button" className="btn btn-outline-danger cancelSetting" onClick={cancel}>Cancel</button>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
            <Form>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Please, Enter your password to save changes</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <button type="button" className="btn btn-primary" onClick={saveChanges} style={{marginRight : '10px'}}>Submit</button>
              <button type="button" className="btn btn-danger" onClick={closeModal}>cancel</button>
            </Form>
            </Modal>
          </BrowserRouter>

        :

       <Auth />

        
      }


          
    </div>
          
      );
}

export default App;
