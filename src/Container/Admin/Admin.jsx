import React, { useState } from 'react'
import { Menuheader } from '../../Component'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../../Backend/firebase/firebase-config'
import '../Admin/admin.css'

const Admin = () => {
  const [mykad, setMykad] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [account, setAccount] = useState("");
  const [role, setRole] = useState("Admin");

  const onChangeMykad = (e) => {
    const regex = /[0-9]*/;
    if (regex.test(e.target.value)) {
      setMykad(e.target.value);
    }
  }

  const onChangeName = (e) => {
    setName(e.target.value);
  }

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const onChangeAcc = (e) => {
    setAccount(e.target.value);
  }

  const onChangeRole = (e) => {
    setRole(e.target.value);
  }

  const adminRegister = async (e) => {
    e.preventDefault();
    const regex = /[0-9][0-9][0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9][0-9][0-9]/;
    if (!regex.test(mykad)) {
      alert('Sila masukan ic dengan format "123456-12-1234"');
      return;
    }
    //doc() will define the path to the document data 
    const userCollectionRef = doc(db, "Admin", mykad)

    //getDoc() will get the document data based on the path of doc()
    //in this case, getDoc() will get the info of admin to test whether the admin ic has been registered or not
    await getDoc(userCollectionRef).then(async (data) => {
      console.log(data.data())
      if (data.data() != undefined) {
        alert("No. MyKad telah didaftar !!");
      } else {
        //setDoc() will add the document data with the specific document id
        await setDoc(userCollectionRef, {
          name: name,
          email: email,
          acc: account,
          role: role,
        }).then(() => {
          setMykad("");
          setName("");
          setEmail("");
          setAccount("");
          setRole("");
          alert("Admin Baru telah Didaftar!!");
        });
      }
    })
  }

  return (
    <div className='app_box'>
      <Menuheader />
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
              <input type="text" className='inputtext' onChange={onChangeMykad} value={mykad} placeholder="000000-00-0000" minLength='14' maxLength='14' required /></div>
            {/* Input for NO.MYKAD */}
          </div>
          <div className='maklumat'>
            <label className="kik">ADMIN NAME</label>
            <div className='textarea'>
              <p className="kik">:</p>
              <input type="text" className='inputtext' onChange={onChangeName} value={name} placeholder="Ali Mohamad" required /></div>
            {/* Input for ADMIN NAME */}
          </div>
          <div className='maklumat'>
            <label className="kik">ADMIN EMAIL</label>
            <div className='textarea'>
              <p className="kik">:</p>
              <input type="email" className='inputtext' onChange={onChangeEmail} value={email} placeholder="ali@gmail.com" required /></div>
            {/* Input for ADMIN EMAIL */}
          </div>
          <div className='maklumat'>
            <label className="kik">ALAMAT E-WALLET</label>
            <div className='textarea'>
              <p className="kik">:</p>
              <input type="text" className='inputtext' onChange={onChangeAcc} value={account} required /></div>
            {/* Input for ALAMAT E-Wallet */}
          </div>
          <div className='maklumat'>
            <label className="kik">ADMIN ROLE</label>
            <div className='textarea'>
              <p className="kik">:</p>
              <select className='inputselect' onChange={onChangeRole} >
                <option value="Admin" selected>Admin</option>
                <option value="SuperAdmin">SuperAdmin</option>
              </select>
            </div>
            {/* Input for ADMIN ROLE */}
          </div>
          <div className="submitBtn"><button className='register' type='Submit'>Daftar Akaun</button></div>
        </form>
      </div >


    </div >
  )
}

export default Admin
