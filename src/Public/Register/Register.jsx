import { React, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { doc, setDoc} from 'firebase/firestore'
import { db } from '../../Backend/firebase/firebase-config'
import './Register.css';

const Register = () => {
  const [mykad, setMykad] = useState("");
  const [alamat, setAlamat] = useState("");
  const [emelPeribadi, setEmelPeribadi] = useState("");
  const [kataLaluan, setKataLaluan] = useState("");
  const [sahkataLaluan, setPengesahanKataLaluan] = useState("");
  const [jawatan, setJawatan] = useState("");
  const [nama, setNama] = useState("");
  const [TelefonPeribadi, setTelefonPeribadi] = useState("");
  const navigate = useNavigate();

  //navigate to login page after register
  const handleSubmit = async (e) => {
    e.preventDefault();
    const regex = /[0-9][0-9][0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9][0-9][0-9]/;
    if (!regex.test(mykad)) {
      alert('Sila masukan ic dengan format "123456-12-1234"');
      return;
    }
    if(kataLaluan!=sahkataLaluan){
      alert('kata laluan tidak sama dengan kata laluan yang sah \n Sila pastikan kata laluan sama dengan pengesahan kata laluan');
      return;
    }
    const userCollectionRef = doc(db, "User",mykad)//crud 1,collection(reference, collectionName)
    await setDoc(userCollectionRef, {// create 2
      alamat: alamat,
      emelPeribadi: emelPeribadi,
      kataLaluan: kataLaluan,
      jawatan: jawatan,
      ic: mykad,
      nama: nama,
      imageUrl: "https://lumiere-a.akamaihd.net/v1/images/c94eed56a5e84479a2939c9172434567c0147d4f.jpeg?region=0,0,600,600&width=480",
      telefonPeribadi: TelefonPeribadi,
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
              <input id='RegisterMyKad' name='RegisterMyKad' type='text' placeholder='000000-00-0000' minLength='14' maxLength='14' onChange= {(event) => {
                setMykad(event.target.value)
              }}/>
            </label>
            <label htmlFor='RegisterMyKad'><br></br>Nama:
              <input id='RegisterMyKad' name='Nama' type='text' placeholder='Ali bin Ahmad' onChange= {(event) => {
                setNama(event.target.value)
              }}/>
            </label>
            <label htmlFor='RegisterMyKad'><br></br>Alamat:
              <input id='RegisterMyKad' name='Alamat' type='text' placeholder='23, Jalan Teknologi, Shah Alam' onChange= {(event) => {
                setAlamat(event.target.value)
              }}/>
            </label>
            <label htmlFor='RegisterMyKad'><br></br>Emel Peribadi:
              <input id='RegisterMyKad' name='Emel Peribadi' type='email' placeholder='aliAhmad@gmail.com' onChange= {(event) => {
                setEmelPeribadi(event.target.value)
              }}/>
            </label>
        
            <label htmlFor='RegisterMyKad'><br></br>Jawatan/Gred:
              <input id='RegisterMyKad' name='Jawatan/Gred' type='text' placeholder='Jurutera V027' onChange= {(event) => {
                setJawatan(event.target.value)
              }}/>
            </label>
            <label htmlFor='RegisterMyKad'><br></br>Telefon Peribadi:
              <input id='RegisterMyKad' name='TelefonPeribadi' type='tel' placeholder='012-34567819' onChange= {(event) => {
                setTelefonPeribadi(event.target.value)
              }}/>
            </label>
            <label htmlFor='RegisterMyKad'><br></br>Kata Laluan:
              <input id='RegisterMyKad' name='KataLaluan' type='password' placeholder='******' onChange= {(event) => {
                setKataLaluan(event.target.value)
              }}/>
            </label>
            <label htmlFor='RegisterMyKad'><br></br>Pengesahan Kata Laluan:
              <input id='RegisterMyKad' name='PengesahanKataLaluan' type='password' placeholder='******' onChange= {(event) => {
                setPengesahanKataLaluan(event.target.value)
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