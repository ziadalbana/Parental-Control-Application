import React from 'react'
import './History.css'
import { useState } from 'react'
export default function History() {
   const [history, setHistory] = useState([{id:1,word:"test",time:"2021-05-05 12:00:00"},{id:2,word:"test2",time:"2021-05-05 12:00:00"}
   ,{id:1,word:"test",time:"2021-05-05 12:00:00"},{id:2,word:"test2",time:"2021-05-05 12:00:00"},{id:1,word:"test",time:"2021-05-05 12:00:00"},{id:2,word:"test2",time:"2021-05-05 12:00:00"}
   ,{id:1,word:"test",time:"2021-05-05 12:00:00"},{id:2,word:"test2",time:"2021-05-05 12:00:00"},{id:1,word:"test",time:"2021-05-05 12:00:00"},{id:2,word:"test2",time:"2021-05-05 12:00:00"}
   ,{id:1,word:"test",time:"2021-05-05 12:00:00"},{id:2,word:"test2",time:"2021-05-05 12:00:00"},{id:1,word:"test",time:"2021-05-05 12:00:00"},{id:2,word:"test2",time:"2021-05-05 12:00:00"}
]);
   const [lang] = useState(localStorage.getItem('lang'))
  return (
<div className={`${lang === 'en' ? "containerEn" : "container"}`}>
            <h3 className="p">{lang === "en" ? "History of blocked searched keywords or links" :" سجل البحث بالكلمات او المواقع الممنوعة" }</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>{lang==="en" ?"Blocked search": "البحث الممنوع"}</th>
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
  )
}
