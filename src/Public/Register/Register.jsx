import { React, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { doc, setDoc} from 'firebase/firestore'
import { db } from '../../Backend/firebase/firebase-config'
import './Register.css';

const Register = () => {
  const [mykad, setMykad] = useState("");
  const [alamat, setAlamat] = useState("");
  const [emelPeribadi, setEmelPeribadi] = useState("");
  const [emelRasmi, setEmelRasmi] = useState("");
  const [gelaran, setGelaran] = useState("");
  const [nama, setNama] = useState("");
  const [telefonPejabat, setTelefonPejabat] = useState("");
  const navigate = useNavigate();

  //navigate to login page after register
  const handleSubmit = async (e) => {
    e.preventDefault();
    const regex = /[0-9][0-9][0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9][0-9][0-9]/;
    if (!regex.test(mykad)) {
      alert('Sila masukan ic dengan format "123456-12-1234"');
      return;
    }
    const userCollectionRef = doc(db, "User",mykad)//crud 1,collection(reference, collectionName)
    await setDoc(userCollectionRef, {// create 2
      alamat: alamat,
      emelPeribadi: emelPeribadi,
      emelRasmi: emelRasmi,
      gelaran: gelaran,
      ic: mykad,
      nama: nama,
      pass: "password",
      picture: "https://lumiere-a.akamaihd.net/v1/images/c94eed56a5e84479a2939c9172434567c0147d4f.jpeg?region=0,0,600,600&width=480",
      telefonPejabat: telefonPejabat,
    });//create 2 end
    navigate('/login');
  }

  return (
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
              <input id='RegisterMyKad' name='RegisterMyKad' type='text' placeholder='No. MyKad' minLength='14' maxLength='14' onChange= {(event) => {
                setMykad(event.target.value)
              }}/>
            </label>
            <label htmlFor='RegisterMyKad'><br></br>Nama:
              <input id='RegisterMyKad' name='Nama' type='text' placeholder='Nama' onChange= {(event) => {
                setNama(event.target.value)
              }}/>
            </label>
            <label htmlFor='RegisterMyKad'><br></br>Alamat:
              <input id='RegisterMyKad' name='Alamat' type='text' placeholder='Alamat' onChange= {(event) => {
                setAlamat(event.target.value)
              }}/>
            </label>
            <label htmlFor='RegisterMyKad'><br></br>Emel Peribadi:
              <input id='RegisterMyKad' name='Emel Peribadi' type='text' placeholder='Emel Peribadi' onChange= {(event) => {
                setEmelPeribadi(event.target.value)
              }}/>
            </label>
            <label htmlFor='RegisterMyKad'><br></br>Emel Rasmi:
              <input id='RegisterMyKad' name='EmelRasmi' type='text' placeholder='Emel Rasmi' onChange= {(event) => {
                setEmelRasmi(event.target.value)
              }}/>
            </label>
            <label htmlFor='RegisterMyKad'><br></br>Gelaran:
              <input id='RegisterMyKad' name='Gelaran' type='text' placeholder='Gelaran' onChange= {(event) => {
                setGelaran(event.target.value)
              }}/>
            </label>
            <label htmlFor='RegisterMyKad'><br></br>TelefonPejabat:
              <input id='RegisterMyKad' name='TelefonPejabat' type='text' placeholder=' TelefonPejabat' onChange= {(event) => {
                setTelefonPejabat(event.target.value)
              }}/>
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