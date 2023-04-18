import {React, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import './AdminLogin.css';

function AdminLogin(){
  const navigate = useNavigate();
  const [mykad, setMykad] = useState("");
  const onChangeMykad = (e) =>{
    const regex = /^[0-9\b]+$/;
    if(e.target.value === "" || regex.test(e.target.value)){
      setMykad(e.target.value);
    }
  }

  const adminLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify({role: "ADMIN"}));
    navigate("/admin/home");
    window.location.reload();
  }

    return(
      <>
        <div className='adminLoginPage'>
          <div className='adminLoginContainer'>
            <div className='titleAdminLogin'>
              <h1>Daftar Masuk</h1>
              <p>Sebagai Admin</p>
            </div>
            <form className='adminLoginForm' method="post"  action="/admin/home" onSubmit={adminLogin}>
              <label htmlFor='LoginMykad'>No. MyKad: 
                <input id='LoginMykad' name='LoginMykad' type='text' placeholder='No. MyKad' minLength='12' maxLength='12' onChange={onChangeMykad} value={mykad}/>
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

export default AdminLogin;