import {React, useState} from 'react';
import {NavLink} from 'react-router-dom';
import './Register.css';

export default function Register(){
    return(
      <>
        <div className='registerPage'>
          <div className='registerContainer'>
            <div className='titleRegister'>
              <h1>Daftar Akaun</h1>
              <p>Sebagai User</p>
            </div>
            
            <form className='RegisterForm' action="/login">
              <label htmlFor='RegisterMyKad'>No. MyKad: 
                <input id='RegisterMyKad' name='RegisterMyKad' type='text' placeholder='No. MyKad'/>
              </label>
              <button className='register' type='Submit'>Daftar Masuk</button>
            </form>
            <div className='otherLinks'>
              <NavLink className='otherlink' to='/login'>Telah mempunyai akaun? Sila log masuk</NavLink>
            </div>
            
          </div>
        </div> 
      </>  
    )
}