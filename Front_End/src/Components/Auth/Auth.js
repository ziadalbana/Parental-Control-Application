import React , { useRef }from 'react'
import './Auth.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react"

export default function Auth () {
  
  const formRef = useRef(null);
  const showToastMessage = () => {
    toast.success('Successful !', {
        position: toast.POSITION.TOP_CENTER
    });
};
  let [authMode, setAuthMode] = useState("signin");
  let [errorLogin, setErrorLogin] = useState(false);
  let [emptyLogin, setEmptyLogin] = useState(false);
  let [errorSignUp, setErrorSignUp] = useState(false);
  let [EmptySignUp, setEmptySignUp] = useState(false);
  let [visibleLogin, setVisibleLogin] = useState(false);
  let [visibleSignUp, setVisibleSignUp] = useState(false);

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
    return fetch('http://localhost:8000/user/signin', {
      method: 'POST',
      body: JSON.stringify(user)
    })
      .then(data => data.json())
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
    let token = false ;
    showToastMessage();
    setErrorLogin(false);
    setErrorSignUp(false);
    setEmptySignUp(false);
    setEmptyLogin(false);
    setEmptySignUp(false)
    console.log(newUser);
    if(newUser.password ==='' || newUser.email==='' || newUser.userName ==='')
      setEmptySignUp(true);
    else
    {
      
      token = await signUp();
      setErrorSignUp(!token);
      setVisibleSignUp(token);
      console.log(token);
      


    } 
    setVisibleSignUp(token);

  }

  const HandleSignIn = async e => {
    showToastMessage();
    setErrorLogin(false);
    setErrorSignUp(false);
    setEmptySignUp(false);
    setEmptyLogin(false);
    let token = false ;
    e.preventDefault();
    console.log(user);
    if(user.userName === '' || user.password === '')
      setEmptyLogin(true);
    else 
    {
      token = await loginUser();
      setErrorLogin(!token);
      console.log(token);
      console.log(user);
      token ? localStorage.setItem('userName', newUser.userName) : localStorage.setItem('userName', null);
      
    }
    setVisibleLogin(token);
  }

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        {visibleLogin && <ToastContainer />}
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
              <button type="submit" className="btn btn-primary" onClick={HandleSignIn}>
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
      {visibleSignUp && <ToastContainer />}
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
            <button type="submit" className="btn btn-primary" onClick={HandleSignUp}>
              Submit
            </button>
          </div>
          
          
        </div>
      </form>
    </div>
  )
}
