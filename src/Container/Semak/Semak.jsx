import React, { useState, useContext, useEffect } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import backicon from '../../img/arrow.png'
import '../Semak/semak.css'
import closeicon from '../../img/close.png'
import { Buttons, Sejarah } from '../../Component'
import { systemAccount } from '../../Constant/ALGOkey';
import AppContext, { AppContextProvider, } from '../../Context/AppContext'
import { deleteProductAction, payContract } from '../../Utils/utils'
import { SignalWifiStatusbarNullSharp } from '@mui/icons-material'
import { db } from '../../Backend/firebase/firebase-config';
import { collection, getDoc, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { indexerClient } from '../../Constant/ALGOkey';
const Semak = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [alertDelete, setDeleteAlert] = useState(false);
  const navigate = useNavigate();
  const { account } = useContext(AppContext);
  const [appId, setAppId] = useState("");
  const [mula, setMula] = useState("");
  const [nama, setNama] = useState("");
  const [loading, setLoading] = useState(false);
  const [penganjur, setPenganjur] = useState("");
  const [jumPeserta, setJumPeserta] = useState("");
  const [tamat, setTamat] = useState("");
  const [pesertaNama, setPesertaNama] = useState([]);
  const [pesertaStatus, setPesertaStatus] = useState([]);
  //console.log(account[0]);
  //get the transaction id of the user
  const deleteCert = async (deleteId, appId) => {
    //delete the sijil at sijil section in firebase
    const sijilDoc = doc(db, "Sijil", appId.toString());
    await deleteDoc(sijilDoc);
    //set the txnid at program section to delete transaction id
    //set the peserta of the person to dipadam
    const programDocRef = doc(db, "Program", programID);
    const data = await getDoc(programDocRef);
    const pesertaStatusList = data.data().pesertaStatus;
    const txnIdList = data.data().transactionId;
    pesertaStatusList[currentUser] = "dipadam";
    txnIdList[currentUser] = deleteId;
    await updateDoc(programDocRef, {
      transactionId: txnIdList,
      pesertaStatus: pesertaStatusList,
    }).then(() => {
      alert("the cert was deleted")
    }).catch(error => {
      console.log(error.message)
    })
    //add this action to the action log
    const actionRef = collection(db, "ActionLog")
    const date = new Date();
    await addDoc(actionRef, {
      admin: `${account[0]}`,
      date: `${date.toString()}`,
      transactionId: `any`,
      type: 'Delete',
    });
  }
  const getUserTxn = async (user) => {
    //obtain the app id for the particular user cert in the program 
    const programDocRef = doc(db, "Program", programID);
    const data = await getDoc(programDocRef);//read 2
    const userTxnId = data.data().transactionId[user];
    console.log(userTxnId);
    return userTxnId;
  }
  const semakUser = async (user) => {
    const userTxnId = await getUserTxn(user);
    navigate(`/informasi-sijil/${userTxnId}`);
  };

  let { programID } = useParams();

  useEffect(() => {
    const getPeserta = async () => {
      const docRef = doc(db, "Program", programID.toString());
      const detail = await getDoc(docRef);
      setMula(detail.data().mula);
      setNama(detail.data().nama);
      setPenganjur(detail.data().penganjur);
      setJumPeserta(detail.data().jumPeserta);
      setTamat(detail.data().tamat);
      setPesertaStatus(detail.data().pesertaStatus);
      setPesertaNama(detail.data().pesertaNama);
    }
    getPeserta();
  }, []);
  return (
    <div className='app_box'>
      <div className='semakdaftarheader'>
        <button className='backbutton' onClick={() => navigate(-1)}><img src={backicon} className="backicon" alt='It is a back icon.' /></button>
        <h1 className='semakdaftaradmin'>{nama}</h1>
        <div className='smallback'><NavLink to="/admin/home">LAMAN UTAMA</NavLink>/DATABASE</div>
      </div>
      <div className='informasibox'>
        <div className='informasiprogramtitle'>
          INFORMASI PROGRAM
        </div>
        <div className='programtitle'>
          <div className='informasiprogram'>
            <label>Nama Penganjur</label>
            <p>:</p>
            <p className='informasicontent'>{penganjur}</p>
          </div>
          <div className='informasiprogram'>
            <label>Tempoh</label>
            <p>:</p>
            <p className='informasicontent'>{mula} - {tamat}</p>
          </div>
          <div className='informasiprogram'>
            <label>Jumlah Peserta</label>
            <p>:</p>
            <p className='informasicontent'>{jumPeserta}</p>
          </div>
        </div>
      </div>
      <div className='subtitle'>SENARAI PESERTA</div>
      <div className='program'>
        <table className='progtable'>
          <thead>
            <tr>
              <th className='nomykad'>No. MyKad</th>
              <th className='pesertaname'>Nama Peserta</th>
              <th className='kehadiran'>Kehadiran</th>
              <th className='statussijil'>Status</th>
              <th className='sijilaktiviti'>Sijil</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(pesertaStatus).map(([key, value]) => {

              return (
                <tr className='row2'>
                  <td>{key}</td>
                  <td>{pesertaNama[key]}</td>
                  <td className='centerdata'>80%</td>
                  <td className='centerdata'>{`${value}`}</td>
                  {/* <td className='centerdata'><Sejarah title={`${value}`} /></td> */}
                  <td>
                    {(`${value}` === 'dicipta' || `${value}` === 'dikemasKini') ? <button className="semakbutton" disabled={true}>Cipta</button> :
                      <NavLink to={`/admin/cipta-sijil/${programID}/${key}`} className="aktivititype">Cipta</NavLink>}

                    {(`${value}` === 'dipadam' || `${value}` === '-') ? <><button className="semakbutton" disabled={true}>Kemaskini</button><button className="semakbutton" disabled={true}>Semak</button><button className="semakbutton" disabled={true}>Padam</button></> :
                      <>
                        <NavLink to={`/admin/edit-sijil/${programID}/${key}`} className="aktivititype">Kemaskini</NavLink>
                        <button className="semakbutton" onClick={() => {
                          semakUser(key);
                        }}>Semak</button>
                        <button className="padambutton" onClick={() => {
                          setCurrentUser(key);
                          setIsOpen(true)
                        }}>Padam</button></>}
                  </td>
                </tr>
              );
            })}

          </tbody>
        </table>
      </div>
      {isOpen && (
        <div className='semaksijil'>
          <div className='contentdeletesijil'>
            <div className='semaksijilbox'>
              <div className='sejarahheader'>
                <h2 className='sejarahtitle'>Padam</h2>
                <button className='closebutton' onClick={() => { setIsOpen(false); setDeleteAlert(false); setLoading(false) }}><img src={closeicon} alt="This is a close icon." className='closeicon' /></button>
              </div>

              {!alertDelete ? (
                <div className='contentdelete'>
                  <div><p>
                    Please be careful! Your action cannot be undo after you clicked the <b>'Padam'</b> button
                  </p></div>
                  <div className='padamconfirmbutton'>{(loading)?<div><center><div className="loading-spinner"></div><br></br><div>Kindly wait a momment...</div><br></br><div>  This cert is erasing from blockchain and database ...</div></center></div>
                  :<Buttons title="Padam" onClick={async () => {
                    setLoading(true);
                    console.log(account);
                    console.log(currentUser);

                    //obtain the app id for the particular user cert in the program 
                    const userTxnId = await getUserTxn(currentUser);
                    console.log(userTxnId);
                    const info = await indexerClient.lookupTransactionByID(userTxnId).do();
                    const appId = await info.transaction["application-transaction"]["application-id"];
                    console.log(appId);

                    //delete the cert at algorand blockchain
                    const deleteId = await deleteProductAction(appId);
                    console.log(deleteId);

                    //delete the cert in firebase
                    deleteCert(deleteId,appId)

                    // const transId=payContract(deleteId);
                    setDeleteAlert(true);
                  }} />}</div>
                </div>
              ) :
                <div className='contentdelete'>
                    <div><p>
                      This cert was successfully deleted in the algorand blockchain!!
                    </p></div>
                </div>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Semak
