import React, { useRef , useState, useEffect } from "react";
import './Words.css';

import { FaTimes } from 'react-icons/fa';
import ModalComponent from "../Components/Modal/Modal";
import { ClipLoader } from "react-spinners";



export default function Sites() {

  const [list , setList] = useState([] );
  const inputRef = useRef(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lang] = useState(localStorage.getItem('lang'))

    const openModal = () => {
      setModalIsOpen(true);
    };

    const closeModal = () => {
      setModalIsOpen(false);
    };
    function cancel (){
      window.location.href = '/index.html';
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
        setList(token.blockedLinks);
        setLoading(false);
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


    return loading ?
    <div className="spinner-container">
      <ClipLoader color="#000" loading={true} size={50} />
    </div>
    :
        <div className="b-Container">
            <div  className={`form-box ${lang === 'en' ? "" : "rtlWord"}`}>
            <h2>{lang === "en" ? "Block Sites" : "حجب المواقع"}</h2>
           <form className="search-container">
            <input
              className="b-TextInput--lg size-100"
              placeholder={lang === "en" ? "Add a new Site..." : "اضافة موقع جديد"}
              ref={inputRef}
              />
            <button onClick={addNewWord} className="b-Button--primary">{lang === "en" ? "Add" : "اضافة"}</button>
          </form>
        <section>
          {list.length > 0
            ?
          <div role="button" className="pill pill-clear" onClick={clearAllPills}>
            <div className="pill-content">
            <p className="padding"> {lang === "en" ? "Clear All" : "مسح الكل"}</p>
            </div>
          </div>
            :
          null}

          {list.map((query, index) => {
              return (
                <div role="button" className="pill pill-query">
                  <div className="pill-content">
                    <p className={`${lang === 'en' ? "padding-right" : "padding-left"}`}>{query}</p>
                    <button
                    className={`pill-close ${lang === 'en' ? "padding-right" : "padding-left"}`}
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
           <div className={`${lang === 'en' ? "buttonsContainer" : "buttonsContainerAr"}`}>
    
              <button type="button" className="changes btn btn-outline-success saveSetting" onClick={openModal}>{lang === "en" ? "Save" : "حفظ"}</button>
              <button type="button" className="changes btn btn-outline-danger cancelSetting" onClick={cancel} >{lang === "en" ? "Cancel" : "الغاء"}</button>
          </div>
            <ModalComponent openModal = {openModal} closeModal = {closeModal} modalIsOpen = {modalIsOpen} type="sites" data = {list} />
        </div>

}
