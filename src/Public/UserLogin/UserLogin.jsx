import {React, useState} from 'react';
import {NavLink} from 'react-router-dom';
import './UserLogin.css';

function UserLogin(){
  const [mykad, setMykad] = useState("");
  const onChangeMykad = (e) =>{
    const regex = /^[0-9\b]+$/;
    if(e.target.value === "" || regex.test(e.target.value)){
      setMykad(e.target.value);
    }
  }
    return(
      <>
        <div className='loginPage'>
          <div className='loginContainer'>
            <div className='titleLogin'>
              <h1>Daftar Masuk</h1>
              <p>Sebagai User</p>
            </div>
            
            <form className='loginForm' action="/user/profile">
              <label htmlFor='LoginMyKad'>No. MyKad: 
                <input id='LoginMyKad' name='LoginMyKad' type='text' placeholder='No. MyKad' minlength='12' maxLength='12' onChange={onChangeMykad} value={mykad}/>
              </label>
              <button className='login' type='Submit'>Daftar Masuk</button>
            </form>
            <div className='otherLinks'>
              <NavLink className='otherlink' to='/register'>Tidak mempunyai akaun? Daftar akaun</NavLink>
              <NavLink className='otherlink' to='/admin-login'>Log masuk sebagai Admin</NavLink>
            </div>
            
          </div>
        </div> 
      </>  
    )
}

export default UserLogin;