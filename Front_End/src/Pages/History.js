import React, { useEffect } from 'react'
import './History.css'
import { useState } from 'react'
export default function History() {
   const [history, setHistory] = useState([]);
   const [lang] = useState(localStorage.getItem('lang'));
   useEffect(() => {

    async function getHistory() {
      return fetch(`http://localhost:8000/user/getHistory/${localStorage.getItem('userName')}`, {
      method: 'GET',
      headers: {
        Authorization : `Bearer ${localStorage.getItem('token')}`,
      }
      })
      .then(data => data.json())
    }

    getHistory().then((token) => {
      setHistory(token);
    });
   }, []);
  return (
<div className={`${lang === 'en' ? "containerEn" : "container"}`}>
    <div className="header">
            <h3 className={`${lang === 'en' ? "pEnglish" : "pArabic"}`}>{lang === "en" ? "History of blocked searched keywords or links" :" سجل البحث بالكلمات او المواقع الممنوعة" }</h3>
            <table className="table">
                <thead >
                    <tr>
                        <th>{lang==="en" ?"Blocked action": " الممنوع"}</th>
                        <th>{lang==="en" ?"Time": "التاريخ"}</th>
                    </tr>
                </thead>
                <tbody>
                    {history && history.map((record, index)=>
                        <tr key={index}>
                            <td>{record.word}</td>
                            <td>{record.time}</td>
                        </tr>
                    )}
                </tbody>
            </table>
         </div>
        </div>
  )
}
