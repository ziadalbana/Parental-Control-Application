import React, { useRef , useState, useEffect } from "react";
import './Words.css';

import { FaTimes } from 'react-icons/fa';
import ModalComponent from "../Components/Modal/Modal";


export default function Sites() {

  const [list , setList] = useState([] );
  const inputRef = useRef(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
      setModalIsOpen(true);
    };

    const closeModal = () => {
      setModalIsOpen(false);
    };
    function cancel (){
      window.location.reload();
    }
    async function getUser() {
      return fetch(`http://localhost:8000/user/getuser/${localStorage.getItem('userName')}`, {
      method: 'GET',
      })
      .then(data => data.json())
    }

    useEffect(() => {
      console.log('Component mounted!');
      getUser().then((token) => {
        console.log("kkkkkkkk")
        setList(token.blockedLinks);
      });
    }, []);

 

   
    const addNewWord = (e) => {
      e.preventDefault();
      const newWord = inputRef.current.value.trim();
      if (newWord !== '') {
        setList([...list , newWord]);
        inputRef.current.value = '';
      }
  }

    const clearAllPills = () => {
        setList([]);
    }
    const removePill = (e) => {
        setList(list.filter((item, x) => e !== x));
    }
      

    return (
        <div className="b-Container">
           <div className="form-box">
            <h2>Block Sites</h2>
           <form className="search-container">
            <input
              className="b-TextInput--lg size-100"
              placeholder={"Add a new Site..."}
              ref={inputRef} 
              />
            <button onClick={addNewWord} className="b-Button--primary">Add</button>
          </form>
        <section>
          {list.length > 0
            ?
          <div role="button" className="pill pill-clear" onClick={clearAllPills}>
            <div className="pill-content">
              <p className="padding-right">Clear All</p>
            </div>
          </div>
            :
          null}
          
          {list.map((query, index) => {
              return (
                <div role="button" className="pill pill-query">
                  <div className="pill-content">
                    <p className="padding-right">{query}</p>
                    <button
                    className="pill-close"
                    onClick={() => removePill(index)}
                    tabIndex="0"
                    >
                    <FaTimes />
                  </button>
                    
                  </div>
                </div>
              )
            })
          }
          </section>
           </div>
           <div className="buttonsContainer">
              <button type="button" className="btn btn-outline-success saveSetting" onClick={openModal}>Save Changes</button>
                <button type="button" className="btn btn-outline-danger cancelSetting" onClick={cancel} >Cancel</button>
           </div>
            <ModalComponent openModal = {openModal} closeModal = {closeModal} modalIsOpen = {modalIsOpen} type="sites" data = {list} />
        </div>
      );
}
