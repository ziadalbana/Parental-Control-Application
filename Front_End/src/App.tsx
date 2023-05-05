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
import { useSelector} from 'react-redux';
import  root  from './store';


function App() {
  let [wrongPassword, setWrongPassword] = useState(false);
  let [emptyPassword, setEmptyPassword] = useState(false);
  const [user ] = useState(useSelector((state : typeof root) => state.userName));
  const [inputUser ,setInputUser] = useState({
    userName: '',
    password: ''
  });

 console.log('Rendering App component');

 async function checkUser() {
  return fetch('http://localhost:8000/user/signin', {
    method: 'POST',
    body: JSON.stringify(inputUser)
  })
    .then(data => data.json())
 }
 async function saveChanges(){
  const storedUserName = localStorage.getItem('userName');
   inputUser.userName = storedUserName !== null ? storedUserName : '';

   console.log(inputUser)
  if(inputUser.userName === '' || inputUser.password === '')
      setEmptyPassword(true);
  else 
  {
    let token = false ;
     token = await checkUser();
     setWrongPassword(!token);
    console.log(token);
    
  }
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
                <Form.Control type="password" placeholder="Password" onChange={e => inputUser.userName = e.target.value} />
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
