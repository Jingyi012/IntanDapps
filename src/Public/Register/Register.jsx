import {React, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [mykad, setMykad] = useState("");
    const navigate = useNavigate();

    //restrict input only number
    const onChangeMykad = (e) =>{
      const regex = /^[0-9\b]+$/;
      if(e.target.value === "" || regex.test(e.target.value)){
        setMykad(e.target.value);
      }
    }

    //navigate to login page after register
    const handleSubmit = (e) =>{
      e.preventDefault();
      navigate('/login');
    }

    return(
      <>
        <div className='registerPage'>
          <div className='registerContainer'>
            <div className='titleRegister'>
              <h1>Daftar Akaun</h1>
              <p>Sebagai User</p>
            </div>
            {/* Register Form */}
            <form className='RegisterForm' onSubmit={handleSubmit}>
              <label htmlFor='RegisterMyKad'>No. MyKad: 
                <input id='RegisterMyKad' name='RegisterMyKad' type='text' placeholder='No. MyKad' minLength='12' maxLength='12' onChange={onChangeMykad} value={mykad} />
              </label>
              <button className='register' type='Submit'>Daftar Akaun</button>
            </form>
            <div className='otherLinks'>
              <NavLink className='otherlink' to='/login'>Telah mempunyai akaun? Sila log masuk</NavLink>
            </div>
            
          </div>
        </div> 
      </>  
    )
}

export default Register;