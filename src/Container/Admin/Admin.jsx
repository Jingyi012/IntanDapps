import React,{useState} from 'react'
import {Buttons,Menuheader} from '../../Component'
import { doc,setDoc } from 'firebase/firestore'
import { db } from '../../Backend/firebase/firebase-config'
import '../Admin/admin.css'

const Admin = () => {
  const [mykad, setMykad] = useState("");
  const [
    account,
    setAccount,
   ] = useState("");

  const onChangeMykad = (e) =>{
    const regex = /[0-9]*/;
    if(regex.test(e.target.value)){
      setMykad(e.target.value);
    }
  }

  const onChangeAcc = (e) =>{
      setAccount(e.target.value);
  }

  const adminRegister = async (e) => {
    e.preventDefault();
    const regex = /[0-9][0-9][0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9][0-9][0-9]/;
    if (!regex.test(mykad)) {
      alert('Sila masukan ic dengan format "123456-12-1234"');
      return;
    }
    const userCollectionRef = doc(db, "Admin",mykad)//crud 1,collection(reference, collectionName)
    await setDoc(userCollectionRef, {// create 2
      acc: account,
    }).then(() => {
      setMykad("");
      setAccount("");
      alert("Admin Registerd!!");
    });//create 2 end
  }

  return (
    <div className='app_box'>
      <Menuheader/>
      <h1 className='admintitle'>DAFTAR ADMIN</h1>
      <div>
        <div className='maklumatadminbahru'>
          MAKLUMAT ADMIN BARU
        </div>
        <form className='maklumatadmin' onSubmit={adminRegister}>
          <div className='maklumat'>
            <label className="kik" onChange={(event) => {
                setMykad(event.target.value)
              }}>NO.MYKAD</label>
            <div className='textarea'>
            <p className="kik">:</p>
            <input type="text" className='inputtext' onChange={onChangeMykad} value={mykad}/></div>
          </div>
          <div className='maklumat'>
            <label className="kik">ALAMAT DOMPET</label>
            <div className='textarea'>
            <p className="kik">:</p>
            <input type="text" className='inputtext' onChange={onChangeAcc} value={account}/></div>
          </div>
          <div className="submitBtn"><button className='register' type='Submit'>Daftar Akaun</button></div>
        </form>
        </div>
      
      
    </div>
  )
}

export default Admin
