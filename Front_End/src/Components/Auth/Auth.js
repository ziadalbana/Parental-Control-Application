import React , { useRef }from 'react'
import './Auth.css'
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react"

export default function Auth () {
  
  const formRef = useRef(null);
 
  let [authMode, setAuthMode] = useState("signin");
  let [errorLogin, setErrorLogin] = useState(false);
  let [emptyLogin, setEmptyLogin] = useState(false);
  let [errorSignUp, setErrorSignUp] = useState(false);
  let [EmptySignUp, setEmptySignUp] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  


  const [user] = useState({
    userName: '',
    password: ''
  });
  const [newUser] = useState({
    userName: '',
    email:'',
    password: ''
  });

  async function loginUser() {
    console.log(user);
    return fetch('http://localhost:8000/user/signin', {
      method: 'POST',
      body: JSON.stringify(user)
    })
      .then(data => data.json())
   }

   async function saveUserName(username){
    const chrome = window.chrome;
    chrome.runtime.sendMessage({ type: "SAVE_USERNAME", data: { username } }, (response) => {

      console.log("Response from background script:", response);
      });
   }

   async function signUp() {
    return fetch('http://localhost:8000/user/signup', {
      method: 'POST',
      body: JSON.stringify(newUser)
    })
      .then(data => data.json())
   }

  const changeAuthMode = () => {
    user.userName = '' ;
    newUser.userName = '';
    formRef.current.reset();
    setAuthMode(authMode === "signin" ? "signup" : "signin");
    setErrorLogin(false);
    setErrorSignUp(false);
    setEmptySignUp(false);
    setEmptyLogin(false);
    
  }
  const HandleSignUp = async e => {
    e.preventDefault();
    setIsButtonDisabled(true);
    let token = false ;
    setErrorLogin(false);
    setErrorSignUp(false);
    setEmptyLogin(false);
    setEmptySignUp(false)
    if(newUser.password ==='' || newUser.email==='' || newUser.userName ==='')
      setEmptySignUp(true);
    else
    {
      token = await signUp();
      const resp_status =  token.result === 'True';
      if (resp_status) {
        localStorage.setItem('userName', newUser.userName);
        await saveUserName(newUser.userName);
        window.location.reload();
      }

      setErrorSignUp(!resp_status);
    } 
    setIsButtonDisabled(false);

  }

  const HandleSignIn = async e => {
    setIsButtonDisabled(true);
    setErrorLogin(false);
    setErrorSignUp(false);
    setEmptySignUp(false);
    setEmptyLogin(false);
    let token = false ;
    e.preventDefault();
    
    if(user.userName === '' || user.password === '')
      setEmptyLogin(true);
    else 
    {
      token = await loginUser();
      const resp_status =  token.result === 'True';
      console.log(resp_status);
      if (resp_status) {
        localStorage.setItem('userName', user.userName);
        await saveUserName( user.userName);
        window.location.reload();
      }

      setErrorLogin(!resp_status);
    }

    setIsButtonDisabled(false);
    
  }

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form ref={formRef}  className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter username"
                onChange={e => user.userName = e.target.value}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1 "
                placeholder="Enter password"
                onChange={e => user.password = e.target.value}
              />
            </div>
            <div className={`${!errorLogin ? "hidden" : ""}`} style={{ color: 'red' , fontSize:'14px' }}>
              Incorrect Username or Password
            </div>
            <div className={`${!emptyLogin ? "hidden" : ""}`} style={{ color: 'red' , fontSize:'14px' }}>
                There is an Empty Field !
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary" onClick={HandleSignIn} disabled={isButtonDisabled}>
                Submit
              </button>
            </div>
            
            
          </div>
        </form>
      </div>
    )
  }
  return (
    <div className="Auth-form-container">
      <form ref={formRef}  className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g JaneDoe76"
              onChange={e => newUser.userName = e.target.value}
            />
          </div>
          <div className={`${!errorSignUp ? "hidden" : ""}`} style={{ color: 'red' , fontSize:'14px' }}>
              Username is Already Existed
            </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              onChange={e => newUser.email = e.target.value}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              onChange={e => newUser.password = e.target.value}
            />
          </div>
          <div className={`${!EmptySignUp ? "hidden" : ""}`} style={{ color: 'red' , fontSize:'14px' }}>
              There is an Empty Field !
            </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={HandleSignUp} disabled={isButtonDisabled}>
              Submit
            </button>
          </div>
          
          
        </div>
      </form>
    </div>
  )
}
