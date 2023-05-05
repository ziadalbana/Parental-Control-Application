import React, { useState } from "react";
import './Words.css';
import { useSelector, useDispatch } from 'react-redux';
import {  addBlockedKeyword , removeKeywordFromBlockedKeywords ,updateBlockedKeywords } from '../action';

import { FaTimes } from 'react-icons/fa';

export default function Words() {

  const dispatch = useDispatch();
    const [list , setList] = useState(useSelector(state => state.blockedKeyWords) );
    const [newWord , setNewWord] = useState("");

    console.log(useSelector(state => state.blockedKeyWords)) ;

    const handleInputChange = (event) => {
        setNewWord(event.target.value);
      };


      function handleAddNewWord(word) {
        dispatch(addBlockedKeyword(word));
      }
      function handleRemoveKeyword(list) {
        dispatch(updateBlockedKeywords(list));
      }
    const addNewWord = (e) => {
        e.preventDefault();
        if(newWord === '')
            return ;
        setList([...list , newWord]);
        handleAddNewWord(newWord);
        
        setNewWord("");
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
            <h2>Block By Words</h2>
           <form className="search-container">
            <input
              className="b-TextInput--lg size-100"
              placeholder={"Add a new Word..."}
              value={newWord}
              onChange={(event) => handleInputChange(event)}
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
        </div>
      );
}
