import { useState } from 'react'
import './Toggle.css'

export const Toggle = ({isToggled , onClick}) => {
    const [on, setOnState] = useState(isToggled);
    const toggle = () => {
        setOnState(!on);
        onClick(!on);
    }
  return (
    <button className={ on ? 'on' : 'off'} on={on} onClick={toggle}>
      <span className="pin" />
    </button>
  );
    
}