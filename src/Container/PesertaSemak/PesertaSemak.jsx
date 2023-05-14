import React, { useState, useEffect,useContext} from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import backicon from '../../img/arrow.png'
import '../PesertaSemak/pesertasemak.css'
import closeicon from '../../img/close.png'
import { Buttons, Sejarah } from '../../Component'
import { db } from '../../Backend/firebase/firebase-config'
import { query, collection, where,updateDoc,addDoc, getDocs, doc, getDoc,deleteDoc} from 'firebase/firestore'
import AppContext from '../../Context/AppContext'
import { indexerClient } from '../../Constant/ALGOkey'
import { deleteProductAction, payContract } from '../../Utils/utils'
const PesertaSemak = () => {
  const [isOpen,setIsOpen]= useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [pesertaInfo, setPesertaInfo] = useState([]);
  const [pesertaPrograms, setPesertaPrograms] = useState([]);
  const [alertDelete, setDeleteAlert] = useState(false);
  const [currentProgram,setCurrentProgram] = useState('');
  const { account, setAccount } = useContext(AppContext);

  let { pesertaID } = useParams();

  //Delete the cert at firestore
  const deleteCert = async (deleteId, appId) => {
    //delete the sijil at sijil section in firebase
    const sijilDoc = doc(db, "Sijil", appId.toString());
    await deleteDoc(sijilDoc);
    //set the txnid at program section to delete transaction id
    //set the peserta of the person to dipadam
    const programDocRef = doc(db, "Program",currentProgram);
    const data = await getDoc(programDocRef);
    const pesertaStatusList = data.data().pesertaStatus;
    const txnIdList = data.data().transactionId;
    pesertaStatusList[pesertaID] = "dipadam";
    txnIdList[pesertaID] = deleteId;
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
      transactionId: deleteId,
      type: 'Delete',
    });
  }
  const getUserTxn = async (programID) => {
    console.log(programID)
    //obtain the app id for the particular user cert in the program 
    const programDocRef = doc(db, "Program", programID);
    const data = await getDoc(programDocRef);//read 2
    const userTxnId = data.data().transactionId[pesertaID];
    console.log(userTxnId);
    return userTxnId;
  }
  const semakUser = async (programID) => {
    const userTxnId = await getUserTxn(programID);
    navigate(`/informasi-sijil/${userTxnId}`);
  };

   //get all the information of the program when entering into this page
  useEffect(()=>{
    const getPesertaInfo = async () => {
      const pesertaRef = doc(db, "User", pesertaID)
      const data = await getDoc(pesertaRef);
      setPesertaInfo(data.data());
    }
    const getPesertaProgram = async () => {
      const progRef = query(collection(db, "Program"), where("pesertaList", "array-contains", pesertaID));
      const data = await getDocs(progRef);
      setPesertaPrograms(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));//read 3
      
    }
    getPesertaProgram();
    getPesertaInfo();
    //getPesertaProgram();
    console.log(pesertaInfo);
    console.log(pesertaPrograms);
  },[])
  
  return (
    <div className='app_box'>
      <div className='semakdaftarheader'>
      <button className='backbutton' onClick={()=>navigate(-1)}><img src={backicon} alt='This is a back button.' className="backicon"/></button>
      <h1 className='semakdaftaradmin'>{pesertaInfo.nama}</h1>
      <div className='smallback'><NavLink to="/admin/home">LAMAN UTAMA</NavLink>/PESERTA</div>
      </div>
      <div className='informasibox'>
        <div className='informasiprogramtitle'>
          INFORMASI PESERTA
        </div>
        <div className='programtitle'>
        <div className='informasiprogram'>
          <label>No Tel Pejabat</label>
          <p>:</p>
            <p className='informasicontent'>{pesertaInfo.telefonPejabat}</p>
        </div>
        <div className='informasiprogram'>
          <label>Alamat Emel Peribadi</label>
          <p>:</p>
            <p className='informasicontent'>{pesertaInfo.emelPeribadi}</p>
        </div>
        <div className='informasiprogram'>
          <label>No. MyKad</label>
          <p>:</p>
            <p className='informasicontent'>{pesertaInfo.ic}</p>
        </div>
        </div>
        </div>
    <div className='subtitle'>SENARAI PROGRAM</div>
    <div className='program'>
      <table className='progtable'>
        <thead>
            <tr>
              <th className='tarikhmula'>Tarikh</th>
              <th className='tarikhtamat'>Program Nama</th>
              <th className='kehadiran'>Kehadiran</th>
              <th className='statussijil'>Status</th>
              <th className='sijilaktiviti'>Sijil</th>
            </tr>
        </thead>
        <tbody>
          {pesertaPrograms.map((items)=>(
            <tr className='row1'>
              <td>{items.mula} - {items.tamat}</td>
              <td>{items.nama}</td>
              <td>80%</td>
              <td>
                {/* <Sejarah title="Dicipta"/> */}
                {items.pesertaStatus[pesertaID]}
              </td>
              <td className='sijill'>
              {(`${items.pesertaStatus[pesertaID]}` === 'dicipta' || `${items.pesertaStatus[pesertaID]}` === 'dikemasKini') ? <button className="semakbutton" disabled={true}>Cipta</button> :
                      <NavLink to={`/admin/cipta-sijil/${items.id}/${pesertaID}`} className="aktivititype">Cipta</NavLink>}

                    {(`${items.pesertaStatus[pesertaID]}` === 'dipadam' || `${items.pesertaStatus[pesertaID]}` === '-') ? <><button className="semakbutton" disabled={true}>Kemaskini</button><button className="semakbutton" disabled={true}>Semak</button><button className="semakbutton" disabled={true}>Padam</button></> :
                      <>
                      {/* kemaskini button */}
                        <NavLink to={`/admin/edit-sijil/${items.id}/${pesertaID}`} className="aktivititype">Kemaskini</NavLink>
                        {/* semak button */}
                        <button className="semakbutton" onClick={() => {
                          semakUser(items.id);
                        }}>Semak</button>
                         {/* padam button */}
                        <button className="padambutton" onClick={() => {
                          setCurrentProgram(items.id);
                          setIsOpen(true)
                        }}>Padam</button></>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {isOpen && (
        <div className='semaksijil'>
           <div className='contentdeletesijil'>
            <div className='semaksijilbox'>
              <div className='sejarahheader'>
              <h2 className='sejarahtitle'>Padam</h2>
              <button className='closebutton' onClick={() =>{ setIsOpen(false); setDeleteAlert(false); setLoading(false)}}>
                <img src={closeicon} alt="This is a close icon." className='closeicon'/></button>
              </div>
              {!alertDelete ? (
                <div className='contentdelete'>
                  <div><p>
                    Please be careful! Your action cannot be undo after you clicked the <b>'Padam'</b> button
                  </p></div>
                  <div className='padamconfirmbutton'>{(loading)?<div><center><div className="loading-spinner"></div><br></br><div>Kindly wait a momment...</div><br></br><div>  This cert is erasing from blockchain and database ...</div></center></div>
                  :<Buttons title="Padam" onClick={async () => {
                    setLoading(true);
                    console.log(account[0]);

                    //obtain the app id for the particular user cert in the program 
                    const userTxnId = await getUserTxn(currentProgram);
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
              <div className='contentdelete'>
          
              </div>
            </div>
            </div>
        </div>
        )}
    </div>
  )
}

export default PesertaSemak
