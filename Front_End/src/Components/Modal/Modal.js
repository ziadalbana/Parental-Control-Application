import React , { useState }  from 'react'
import Modal from 'react-modal';
import Form from 'react-bootstrap/Form';
import './Modal.css'

Modal.setAppElement('#root');

export default function ModalComponent(props) {

    console.log(props.type)
    let [wrongPassword, setWrongPassword] = useState(false);
    let [emptyPassword, setEmptyPassword] = useState(false);
    const [inputUser ,setInputUser] = useState({
      userName: localStorage.getItem('userName'),
      password: ''
    });

        async function checkUser() {
            return fetch('http://localhost:8000/user/signin', {
            method: 'POST',
            body: JSON.stringify(inputUser)
            })
            .then(data => data.json())
       }
       async function saveWords(words) {
        return fetch(`http://localhost:8000/user/blockedkeywords/${inputUser.userName}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            blockedKeyWords : words 
        })
        })
        .then(data => data.json())
        }
        async function saveSites(sites) {
            return fetch(`http://localhost:8000/user/blockedlinkes/${inputUser.userName}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                blockedLinks : sites 
            })
            })
            .then(data => data.json())
        }
        async function triggerAdultTweets(adult) {
            return fetch(`http://localhost:8000/user/removetweets/${inputUser.userName}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                removeAdultTweets : adult 
            })
            })
            .then(data => data.json())
        }
        async function triggerAdultImages(adult) {
            return fetch(`http://localhost:8000/user/removeimages/${inputUser.userName}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                removeAdultImages : adult 
            })
            })
            .then(data => data.json())
        }
        async function triggerSafeSearch(adult) {
            return fetch(`http://localhost:8000/user/enforcesafesearch/${inputUser.userName}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                enforceSafeSearch : adult 
            })
            })
            .then(data => data.json())
        }


        
        
       async function saveChanges(){
        console.log(props.type) ;
        console.log(props.data) ;
        const storedUserName = localStorage.getItem('userName');
         inputUser.userName = storedUserName !== null ? storedUserName : '';
      
         console.log(inputUser)
        if(inputUser.userName === '' || inputUser.password === '')
            setEmptyPassword(true);
        else 
        {
          let token = false ;
           token = await checkUser();
           setWrongPassword(!token.result);
          console.log(token);
          const isCorrectPassword = token.result ;
          console.log(isCorrectPassword);
          if(isCorrectPassword)
          {
            if(props.type === "words")
            {
                console.log("vvvvvvvvvvv");
                await saveWords(props.data);
            }else if(props.type === "sites")
            {
                await saveSites(props.data);
            }else if(props.type === "adultImages")
            {
                await triggerAdultImages(props.data);
            }else if(props.type === "safeSearch")
            {
                await triggerSafeSearch(props.data);
            }else if(props.type === "AdultTweets")
            {
                console.log("zzzzz")
                await triggerAdultTweets(props.data);
            }
            console.log(token);
          }
          
        }

        props.closeModal();
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
        </Form.Group>
        <button type="button" className="btn btn-primary" onClick={saveChanges} style={{marginRight : '10px'}}>Submit</button>
        <button type="button" className="btn btn-danger" onClick={props.closeModal}>cancel</button>
        </Form>
    </Modal>
  )
  
}

<style>


</style>
