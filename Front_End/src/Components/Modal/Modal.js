import React , { useState }  from 'react'
import Modal from 'react-modal';
import Form from 'react-bootstrap/Form';
import './Modal.css'

Modal.setAppElement('#root');

export default function ModalComponent(props) {

    let [wrongPassword, setWrongPassword] = useState(false);
    let [emptyPassword, setEmptyPassword] = useState(false);
    const [inputUser ] = useState({
      userName: localStorage.getItem('userName'),
      password: ''
    });

        async function checkUser() {
            return fetch('http://localhost:8000/user/signin', {
            method: 'POST',
            headers: {
              Authorization : `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(inputUser)
            })
            .then(data => data.json())
       }
       async function saveWords(words) {
        return fetch(`http://localhost:8000/user/blockedkeywords/${inputUser.userName}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json', Authorization : `Bearer ${localStorage.getItem('token')}`},
        body: JSON.stringify({
            blockedKeyWords : words 
        })
        })
        .then(data => data.json())
        }
        async function saveSites(sites) {
            return fetch(`http://localhost:8000/user/blockedlinkes/${inputUser.userName}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json', Authorization : `Bearer ${localStorage.getItem('token')}`},
            body: JSON.stringify({
                blockedLinks : sites 
            })
            })
            .then(data => data.json())
        }
        async function triggerAdultTweets(adult) {
            return fetch(`http://localhost:8000/user/removetweets/${inputUser.userName}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json', Authorization : `Bearer ${localStorage.getItem('token')}`,},
            body: JSON.stringify({
                removeAdultTweets : adult 
            })
            })
            .then(data => data.json())
        }
        async function triggerAdultImages(adult) {
            return fetch(`http://localhost:8000/user/removeimages/${inputUser.userName}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json', Authorization : `Bearer ${localStorage.getItem('token')}`},
            body: JSON.stringify({
                removeAdultImages : adult 
            })
            })
            .then(data => data.json())
        }
        async function triggerSafeSearch(adult) {
            return fetch(`http://localhost:8000/user/enforcesafesearch/${inputUser.userName}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json', Authorization : `Bearer ${localStorage.getItem('token')}`,},
            body: JSON.stringify({
                enforceSafeSearch : adult 
            })
            })
            .then(data => data.json())
        }

     function close(){
        props.closeModal();
        if(props.type === 'adultImages' || props.type === 'safeSearch' || props.type === 'AdultTweets')
          window.location.href = 'index.html';
     }
        
        
       async function saveChanges(){
        console.log(props.type) ;
        console.log(props.data) ;
        setWrongPassword(false)
        setEmptyPassword(false);
        console.log(emptyPassword);
        const storedUserName = localStorage.getItem('userName');
         inputUser.userName = storedUserName !== null ? storedUserName : '';
      
        console.log(inputUser)
        if(inputUser.password === '')
        {
            setEmptyPassword(true);
            return ;
        }
        else 
        {
            setWrongPassword(false)
            setEmptyPassword(false);
          let token = false ;
           token = await checkUser();
           setWrongPassword(!token.result);
          console.log(token);
          const isCorrectPassword = token.result ;
          console.log(isCorrectPassword);
          if(isCorrectPassword)
          {
            if(props.type === "logout")
            {
              props.logout();
            }
            else if(props.type === "words")
            {
                await saveWords(props.data);
            }else if(props.type === "sites")
            {
                await saveSites(props.data);
            }else if(props.type === "adultImages")
            {
                await triggerAdultImages(props.data);
                window.location.href = 'index.html';
            }else if(props.type === "safeSearch")
            {
                await triggerSafeSearch(props.data);
                window.location.href = 'index.html';
            }else if(props.type === "AdultTweets")
            {
                await triggerAdultTweets(props.data);
                window.location.href = 'index.html';
            }
            props.closeModal();
          }
         
          
        }

       
      }
      

      
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width:'40%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '1px 2px #888888',
    zIndex : '10000' 
  },
};

  return (
    <Modal isOpen={props.modalIsOpen} onRequestClose={props.closeModal} style={customStyles}>
        <Form>
        <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Please, Enter your password to save changes</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={e => inputUser.password = e.target.value} />
            <div className={`${!wrongPassword ? "hidden" : ""}`} style={{ color: 'red' , fontSize:'14px' }}>
              Please, Enter the correct password !
            </div>
            <div className={`${!emptyPassword ? "hidden" : ""}`} style={{ color: 'red' , fontSize:'14px' }}>
              This Field is Empty !
            </div>
        </Form.Group>
        <button type="button" className="btn btn-primary" onClick={saveChanges} style={{marginRight : '10px'}}>Submit</button>
        <button type="button" className="btn btn-danger" onClick={close}>cancel</button>
        </Form>
    </Modal>
  )
  
}

<style>


</style>
