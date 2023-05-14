import React, { useState, useContext, useEffect } from 'react'
import '../EditSijil/EditSijil.css'
import { NavLink, useParams } from 'react-router-dom'
import { Buttons } from '../../Component'
import backicon from '../../img/arrow.png'
import { useNavigate } from 'react-router-dom'
import AppContext, { AppContextProvider, } from '../../Context/AppContext'
import { updateCertificateAction } from '../../Utils/utils';
import { db } from '../../Backend/firebase/firebase-config';
import { collection, getDoc, addDoc, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import algosdk from 'algosdk';
import { indexerClient } from '../../Constant/ALGOkey'
const EditSijil = ({ backpage }) => {
  const navigate = useNavigate();
  let { programId, key } = useParams();
  console.log(programId);
  console.log(key);
  const [loading, setLoading] = useState(false);
  const [tajukSijil, setTajukSijil] = useState('');
  const [tarikhMula, setTarikhMula] = useState('');
  const [tarikhTamat, setTarikhTamat] = useState('');
  const [nama, setNama] = useState('');
  const [NRIC, setNRIC] = useState('');
  const [appId, setAppId] = useState('');
  const { account, setAccount } = useContext(AppContext);
  const actionRef = collection(db, "ActionLog")//crud 1,collection(reference, collectionName)

  //sijil collection
  const programDocRef = doc(db, "Program", programId); //program collection


  //fetch the cert app id from the user current transaction id
  useEffect(() => {
    const getUser = async () => {
      const data = await getDoc(programDocRef);//read 2
      const userTxnId = data.data().transactionId[key];
      console.log(userTxnId);
      const info = await indexerClient.lookupTransactionByID(userTxnId).do();
      setAppId(info.transaction["application-transaction"]["application-id"]);
      console.log(appId);
    }

    getUser();
  }, [])

  const updateSijil = async (sender, transId) => {//creat 2
    const date = new Date();
    console.log(date.toLocaleString());
    console.log(appId.toString());
    const sijilCollectionRef = doc(db, "Sijil", appId.toString());

    //add this update action to action log
    await addDoc(actionRef, {
      admin: `${sender}`,
      date: `${date.toString()}`,
      transactionId: `${transId}`,
      type: 'Update',
    });
    //update the sijil in sijil section
    await updateDoc(sijilCollectionRef, {
      txnId: `${transId}`,
      action: `Update`
    });
    //update the sijil in program section
    const data = await getDoc(programDocRef);
    const txnIdList = data.data().transactionId;
    const pesertaStatusList = data.data().pesertaStatus;
    txnIdList[key] = transId;
    pesertaStatusList[key] = "dikemasKini";
    await updateDoc(programDocRef, {
      transactionId: txnIdList,
      pesertaStatus: pesertaStatusList,
    }).then(response => {
      alert("updated")
    }).catch(error => {
      console.log(error.message)
    })

  //sijil collection
  const programDocRef = doc(db, "Program", programId); //program collection


  };
  
  //ask user to insert his/her mnemonic before deploy the contract 
  const handleClick = async (event) => {
    const enteredInput = await prompt('Please enter wallet mnemonic');
    if(enteredInput==null) setLoading(false);
    return enteredInput;
  }
  return (
    <div className='app_box'>

      <div className='semakdaftarheader'>
        {/* back to previous page */}
        <button className='backbutton' onClick={() => navigate(-1)}><img src={backicon} alt='This is a back button.' className="backicon" /></button>
        <h1 className='semakdaftaradmin'>EDIT SIJIL</h1>
        {backpage === '/peserta-semak' &&
          <div className='smallback'><NavLink to="/admin/home">LAMAN UTAMA</NavLink>/<NavLink to={backpage}>PESERTA</NavLink>/EDIT SIJIL</div>}
        {backpage === '/semak' &&
          <div className='smallback'><NavLink to="/admin/home">LAMAN UTAMA</NavLink>/<NavLink to={backpage}>PROGRAM</NavLink>/EDIT SIJIL</div>}
      </div>

      {/* Information input section for Edit Sijil */}
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
      <div className='submitBtn' >{(loading)?<div><center><div className="loading-spinner"></div><br></br><div>Kindly wait a momment...</div><br></br><div>  Your data is updating into blockchain and database ...</div></center></div>:<Buttons title="Selesai" onClick={async () => {
       setLoading(true);
       const mnemonic = await handleClick();
       if(mnemonic!=null){
        const arr = [{ tajukSijil }, { tarikhMula }, { tarikhTamat }, { nama }, { NRIC }];
        //   let txn; 
        const userAcc = await algosdk.mnemonicToSecretKey(mnemonic)
        const txnId = await updateCertificateAction(userAcc, appId, arr);
        updateSijil(userAcc.addr, txnId);
        console.log(updateSijil);
        navigate(`/informasi-sijil/${txnId}`);}
      }
      }></Buttons>}</div>

    </div>
  )
}

export default EditSijil
