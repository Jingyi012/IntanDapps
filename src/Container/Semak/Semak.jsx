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
  const [isDeleted, setIsDeleted] = useState(false);
  const [alertDelete, setDeleteAlert] = useState(false);
  const navigate = useNavigate();
  const { account, setAccount } = useContext(AppContext);
  const txnId = 'OMC2FKODOV3N76MVJGTQWXCLUKNYDIMOTR245VKDFJR3ASYIW5FQ';
  const userCollectionRef = collection(db, "ActionLog")//crud 1,collection(reference, collectionName)
  const [appId, setAppId] = useState("");
  const [mula, setMula] = useState("");
  const [nama, setNama] = useState("");
  const [penganjur, setPenganjur] = useState("");
  const [jumPeserta, setJumPeserta] = useState("");
  const [tamat, setTamat] = useState("");
  const [pesertaNama, setPesertaNama] = useState([]);
  //console.log(account[0]);
  const semakUser = async (user) => {
    //obtain the app id for the particular user cert in the program 
    const programDocRef = doc(db, "Program", programID);
    const data = await getDoc(programDocRef);//read 2
    const userTxnId = data.data().transactionId[user];
    console.log(userTxnId);
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
      setPeserta(detail.data().pesertaStatus);

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
            {Object.entries(pesertaNama).map(([key, value]) => {

              return (
                <tr className='row2'>
                  <td>{key}</td>
                  <td>{value}</td>
                  <td className='centerdata'>80%</td>
                  <td className='centerdata'>{`${value}`}</td>
                  {/* <td className='centerdata'><Sejarah title={`${value}`} /></td> */}
                  <td>
                    {(`${value}` === 'dicipta') ? <button className="semakbutton" disabled={true}>Cipta</button> :
                      <NavLink to={`/admin/cipta-sijil/${programID}/${key}`} className="aktivititype">Cipta</NavLink>}
                    <NavLink to={`/admin/edit-sijil/${programID}/${key}`} className="aktivititype">Edit</NavLink>
                    {(`${value}` === 'dipadam') ? <button className="semakbutton" disabled={true}>Semak</button> :
                      <button className="semakbutton" onClick={() => {
                        semakUser(key);
                      }}>Semak</button>}
                    <button className="padambutton" onClick={() => {
                      setCurrentUser(key);
                      setIsOpen(true)
                    }}>Padam</button>
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
                <button className='closebutton' onClick={() => { setIsOpen(false); setIsDeleted(false); setDeleteAlert(false) }}><img src={closeicon} alt="This is a close icon." className='closeicon' /></button>
              </div>

              {!alertDelete ? (
                <div className='contentdelete'>
                  <div><p>
                    Please be careful! Your action cannot be undo after you clicked the <b>'Padam'</b> button
                  </p></div>
                  <div className='padamconfirmbutton'><Buttons title="Padam" onClick={async () => {
                    console.log(account[0]);

                    //obtain the app id for the particular user cert in the program 
                    const programDocRef = doc(db, "Program", programID);
                    const data = await getDoc(programDocRef);//read 2
                    const userTxnId = data.data().transactionId[currentUser];
                    console.log(userTxnId);
                    const info = await indexerClient.lookupTransactionByID(userTxnId).do();
                    const appId = await info.transaction["application-transaction"]["application-id"];
                    console.log(appId);

                    //delete the cert at algorand blockchain
                    const deleteId = await deleteProductAction(appId);
                    console.log(deleteId);


                    //delete the sijil at sijil section in firebase
                    const sijilDoc = doc(db, "Sijil", appId.toString());
                    await deleteDoc(sijilDoc);

                    //set the txnid at program section to delete transaction id
                    //set the peserta of the person to dipadam
                    const pesertaStatusList = data.data().pesertaStatus;
                    const txnIdList = data.data().transactionId;
                    pesertaStatusList[currentUser] = "dipadam";
                    txnIdList[currentUser] = deleteId;
                    await updateDoc(programDocRef, {
                      transactionId: txnIdList,
                      pesertaStatus: pesertaStatusList,
                    }).then(response => {
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


                    // const transId=payContract(deleteId);
                    if (deleteId != null) setIsDeleted(true);
                    setDeleteAlert(true);
                  }} /></div>
                </div>
              ) :
                (<div className='contentdelete'>
                  {isDeleted ? (
                    <div><p>
                      This cert was successfully deleted in the algorand blockchain!!
                    </p></div>) : (<div><p>
                      This cert was already deleted in the algorand blockchain!! It cannot be deleted anymore
                    </p></div>)

                  }

                </div>)}

            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Semak
