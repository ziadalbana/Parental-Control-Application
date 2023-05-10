import { useState ,useEffect } from 'react'

import './Toggle.css'





export const Toggle = (props) => {

 console.log(props) ;

 console.log(props.toggled);

  const [on, setOnState] = useState(props.toggled);

  useEffect(() => {

   setOnState(props.toggled);

  }, [props.toggled]);




  console.log(on);

  const toggle = () => {

    setOnState(!on);

    props.onClick(!on);

  }

 return (

  <button className={ on ? 'on' : 'off'} on={on} onClick={toggle}>

   <span className="pin" />

  </button>

 );

 

}