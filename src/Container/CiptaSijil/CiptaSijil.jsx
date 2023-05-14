import React, { useState } from 'react'
import '../CiptaSijil/ciptasijil.css'
import { Buttons } from '../../Component'

import { NavLink, useNavigate, useParams } from 'react-router-dom'
import backicon from '../../img/arrow.png'
import { deployContract, payContract } from '../../Utils/utils'
import { systemAccount } from '../../Constant/ALGOkey';
import algosdk from 'algosdk';
import { db } from '../../Backend/firebase/firebase-config';
import { collection, getDoc, addDoc, setDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const CiptaSijil = ({ backpage }) => {
  const navigate = useNavigate();
  let { programId, key } = useParams();
  console.log(programId);
  console.log(key);
  const [tajukSijil, setTajukSijil] = useState('');
  const [tarikhMula, setTarikhMula] = useState('');
  const [tarikhTamat, setTarikhTamat] = useState('');
  const [nama, setNama] = useState('');
  const [loading, setLoading] = useState(false);
  const [NRIC, setNRIC] = useState('');
  const actionCollectionRef = collection(db, "ActionLog")//crud 1,collection(reference, collectionName)

  const programDocRef = doc(db, "Program", programId)
  //add created cert into program, sijil and action log section in firestore
  const createSijil = async (sender, transId, appid) => {//creat 2
    console.log(appid);
    const date = new Date();
    const sijilCollectionRef = doc(db, "Sijil", appid.toString())
    console.log(date.toLocaleString());
    await setDoc(sijilCollectionRef, {
      txnId: `${transId}`,
      action: 'Create'
    });
    await addDoc(actionCollectionRef, {
      admin: `${sender}`,
      date: `${date.toString()}`,
      transactionId: `${transId}`,
      type: 'Create',
    });
    const data = await getDoc(programDocRef);
    const txnIdList = data.data().transactionId;
    const pesertaStatusList = data.data().pesertaStatus;
    txnIdList[key] = transId;
    pesertaStatusList[key] = "dicipta";
    await updateDoc(programDocRef, {
      transactionId: txnIdList,
      pesertaStatus: pesertaStatusList,
    }).then(response => {
      alert("sijil was successfully added")
    }).catch(error => {
      console.log(error.message)
    })
  };

  //ask user to insert his/her mnemonic before deploy the contract 
  const handleClick = async (event) => {
    const enteredInput = await window.prompt('Please enter wallet mnemonic')
    if(enteredInput==null) setLoading(false);
    return enteredInput;
  }

  const handleDeployContract = async (arr) => {
    return await deployContract(systemAccount, arr);
    //setDeployedAddress(Txn);
  };
  const payDeployContract = async (userAcc, appId, arr) => {
    console.log(userAcc);
    return await payContract(userAcc, appId, arr);
    //setDeployedAddress(Txn);
  };
  return (
    <div className='app_box'>

      <div className='semakdaftarheader'>
        <button className='backbutton' onClick={() => navigate(-1)}><img src={backicon} alt='This is a back button.' className="backicon" /></button>
        <h1 className='semakdaftaradmin'>CIPTA SIJIL</h1>
        {backpage === '/peserta-semak' &&
          <div className='smallback'><NavLink to="/admin/home">LAMAN UTAMA</NavLink>/<NavLink to={backpage}>PESERTA</NavLink>/EDIT SIJIL</div>}
        {backpage === '/semak' &&
          <div className='smallback'><NavLink to="/admin/home">LAMAN UTAMA</NavLink>/<NavLink to={backpage}>PROGRAM</NavLink>/EDIT SIJIL</div>}
      </div>

      <div>
        <div className='maklumatadminbahru'>
          MAKLUMAT SIJIL
        </div>
        <div className='maklumatsijil'>
          <div className='maklumat'>
            <label className="kik">TAJUK SIJIL</label>
            <div className='textarea'>
              <p className="kik">:</p>
              <input
                type="text"
                className='inputtext'
                id="tajukSijil"
                value={tajukSijil}
                onChange={(e) => setTajukSijil(e.target.value)}
              />
            </div>
          </div>

          <div className='maklumat'>
            <label className="kik">TARIKH MULA</label>
            <div className='textarea'>
              <p className="kik">:</p>
              <input
                type="text"
                id="tarikhMula"
                className='inputtext'
                value={tarikhMula}
                onChange={(e) => setTarikhMula(e.target.value)}
              />
            </div>
          </div>
          <div className='maklumat'>
            <label className="kik">TARIKH TAMAT</label>
            <div className='textarea'>
              <p className="kik">:</p>
              <input
                type="text"
                id="tarikhTamat"
                className='inputtext'
                value={tarikhTamat}
                onChange={(e) => setTarikhTamat(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div>
          <div className='maklumatadminbahru'>
            MAKLUMAT PENGUNA
          </div>
          <div className='maklumatsijil'>
            <div className='maklumat'>
              <label className="kik">NAMA</label>
              <div className='textarea'>
                <p className="kik">:</p>
                <input
                  type="text"
                  id="nama"
                  className='inputtext'
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                /></div>
            </div>
            <div className='maklumat'>
              <label className="kik">No. MYKAD</label>
              <div className='textarea'>
                <p className="kik">:</p>
                <input
                  type="text"
                  id="NRIC"
                  className='inputtext'
                  value={NRIC}
                  onChange={(e) => setNRIC(e.target.value)}
                /></div>
            </div>
          </div>
        </div>
      </div>
      <div className='submitBtn' >{(loading)?<div><center><div className="loading-spinner"></div><br></br><div>Kindly wait a momment...</div><br></br><div>  Your data is adding into blockchain and database ...</div></center></div>:<Buttons title="Deploy Contract" onClick={async () => {
        setLoading(true);
        const arr = [{ tajukSijil }, { tarikhMula }, { tarikhTamat }, { nama }, { NRIC }];
        const mnemonic = await handleClick();
        if(mnemonic!=null){
        //   let txn; 
        const appid = await handleDeployContract(arr);
        console.log(mnemonic);
        const userAcc = await algosdk.mnemonicToSecretKey(mnemonic)
        //getting the transaction id after the admin paying the contract
        const txnId = await payDeployContract(userAcc, appid, arr)

        createSijil(userAcc.addr, txnId, appid);
        console.log(createSijil);
        navigate(`/informasi-sijil/${txnId}`);}
      }
      }></Buttons>}</div>


    </div>
  )
}

export default CiptaSijil
