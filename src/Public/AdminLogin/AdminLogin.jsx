import {React, useState} from 'react';
import {NavLink} from 'react-router-dom';
import './AdminLogin.css';

export default function AdminLogin(){
    return(
      <>
        <div className='adminLoginPage'>
          <div className='adminLoginContainer'>
            <div className='titleAdminLogin'>
              <h1>Daftar Masuk</h1>
              <p>Sebagai Admin</p>
            </div>
            <form className='adminLoginForm' action="/admin/home">
              <label htmlFor='LoginMykad'>No. MyKad: 
                <input id='LoginMykad' name='LoginMykad' type='text' placeholder='No. MyKad'/>
              </label>

              <label htmlFor='walletAddress'>Alamat Dompet: 
                <input id='walletAddress' name='walletAddress' type='text' placeholder='Alamat Dompet'/>
              </label>

              <button type='Submit'>Daftar Masuk</button>
              
            </form>
            <div className='otherLinks'>
              <NavLink className='otherlink' to='/login'>Log masuk sebagai user</NavLink>
            </div>
          </div>
        </div> 
      </>  
    )
}