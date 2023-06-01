import React,{useState} from 'react'
import {Menuheader} from '../../Component'
import { doc,getDoc,setDoc } from 'firebase/firestore'
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
    //doc() will define the path to the document data 
    const userCollectionRef = doc(db, "Admin",mykad)
    
    //getDoc() will get the document data based on the path of doc()
    //in this case, getDoc() will get the info of admin to test whether the admin ic has been registered or not
    await getDoc(userCollectionRef).then(async (data) => {
      //console.log(data.data())
      if (data.data() != undefined) {
        alert("No. MyKad telah didaftar !!");
      } else {
        //setDoc() will add the document data with the specific document id
        await setDoc(userCollectionRef, {
          acc: account,
        }).then(() => {
          setMykad("");
          setAccount("");
          alert("Admin Registerd!!");
        });
      }
    })

    
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
            {/* Input for NO.MYKAD */}
          </div>
          <div className='maklumat'>
            <label className="kik">ALAMAT DOMPET</label>
            <div className='textarea'>
            <p className="kik">:</p>
            <input type="text" className='inputtext' onChange={onChangeAcc} value={account}/></div>
            {/* Input for ALAMAT DOMPET */}
          </div>
          <div className="submitBtn"><button className='register' type='Submit'>Daftar Akaun</button></div>
        </form>
        </div>
      
      
    </div>
  )
}

export default Admin
