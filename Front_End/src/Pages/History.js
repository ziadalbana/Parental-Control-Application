import React, { useEffect } from 'react'
import './History.css'
import { useState } from 'react'
import { ClipLoader } from "react-spinners";
export default function History() {
   const [history, setHistory] = useState();
   const [loading, setLoading] = useState(true);
   const [lang] = useState(localStorage.getItem('lang'));
   useEffect(() => {
    async function getHistory() {
      try {
        const response = await fetch(`http://localhost:8000/user/history/${localStorage.getItem('userName')}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        });
  
        if (response.ok) {
          const data = await response.json();
          setHistory(data);
        } else {
          console.error('Failed to fetch user history');
        }
      } catch (error) {
        console.error('Error while fetching user history:', error);
      }
    }
    getHistory();
    setLoading(false);
  }, []);
   console.log(history);
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
                { loading ?
                    <div className="spinner-container">
                    <ClipLoader color="#000" loading={true} size={100} />
                  </div>
                  :
                <tbody>
                    {history && history.word.map((record, index)=>
                        <tr key={index}>
                            <td>{record}</td>
                            <td>{history.timestamp[index]}</td>
                        </tr>
                    )}
                </tbody>
              }
            </table>
         </div>
        </div>
    
  )
}
