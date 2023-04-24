import {React, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './Penyemak.css';

export default function Penyemak(){
  const [mykad, setMykad] = useState("");
  const navigate = useNavigate();
  //restrict input only number
  const onChangeMykad = (e) =>{
    const regex = /^[0-9\b]+$/;
    if(e.target.value === "" || regex.test(e.target.value)){
      setMykad(e.target.value);
    }
  }
  //navigate to semak sijil page after submit the penyemak details
  const handleSubmit = (e) =>{
    e.preventDefault();
    navigate('/semaksijil');
  }

    return(
      <>
        <div className='penyemakPage'>
          <div className='penyemakContainer'>
            <div className='titlePenyemak'>
              <h1>Maklumat Penyemak</h1>
            </div>
            {/*penyemak information form  method need change later*/}
            <form className='maklumatPenyemak' method='get' onSubmit={handleSubmit}>

              <label htmlFor='namaPenyemak'>Nama: 
                <input id='namaPenyemak' name='namaPenyemak' type='text' placeholder='Nama'/>
              </label>
              
              <label htmlFor='myKadPenyemak'>No. MyKad: 
                <input id='myKadPenyemak' name='myKadPenyemak' type='text' placeholder='No. MyKad' minLength='12' maxLength='12' onChange={onChangeMykad} value={mykad}/>
              </label>

              <label htmlFor='organisasiPenyemak'>Nama Organisasi: 
                <input id='organisasiPenyemak' name='organisasiPenyemak' type='text' placeholder='Alamat Dompet'/>
              </label>

              <button type='Submit'>Masuk</button>
              
            </form>
          </div>
        </div> 
      </>  
    )
}