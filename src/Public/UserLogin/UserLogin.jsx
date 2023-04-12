import {React, useState} from 'react';
import {NavLink} from 'react-router-dom';
import './UserLogin.css';

function UserLogin(){
  
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
                <input id='LoginMyKad' name='LoginMyKad' type='text' placeholder='No. MyKad' maxLength='12'/>
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