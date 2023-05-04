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
const Semak = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [alertDelete, setDeleteAlert] = useState(false);
  const navigate = useNavigate();
  const { account, setAccount } = useContext(AppContext);
  const txnId = 'OMC2FKODOV3N76MVJGTQWXCLUKNYDIMOTR245VKDFJR3ASYIW5FQ';
  const userCollectionRef = collection(db, "ActionLog")//crud 1,collection(reference, collectionName)

  const [mula, setMula] = useState("");
  const [nama, setNama] = useState("");
  const [penganjur, setPenganjur] = useState("");
  const [jumPeserta, setJumPeserta] = useState("");
  const [tamat, setTamat] = useState("");
  const [peserta, setPeserta] = useState([]);

  const deleteSijil = async (sender, transId) => {//creat 2
    const date = new Date();
    console.log(date.toLocaleString());

    await addDoc(userCollectionRef, {
      admin: `${sender}`,
      date: `${date.toString()}`,
      transactionId: `${transId}`,
      type: 'Delete',
    });
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
      setPeserta(detail.data().peserta);
     
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
            {Object.entries(peserta).map(([key,value]) =>{ 

              return (
                <tr className='row2'>
                  <td>SECK0233</td>
                  <td>{key}</td>
                  <td className='centerdata'>80%</td>
                  <td className='centerdata'><Sejarah title={`${value}`} /></td>
                  <td>

                    <NavLink to='/admin/cipta-sijil' className="aktivititype">Cipta</NavLink>
                    <NavLink to='/admin/edit-sijil' className="aktivititype">Edit</NavLink>
                    <NavLink to={`/informasi-sijil/${txnId}`} className="aktivititype">Semak</NavLink>
                    <button className="padambutton" onClick={() => setIsOpen(true)}>Padam</button>
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
                  <div className='padamconfirmbutton'><Buttons title="Padam" onClick={() => {
                    console.log(account);
                    const deleteId = deleteProductAction('210164268');

                    // const transId=payContract(deleteId);
                    console.log(deleteId);
                    if (deleteId != null) setIsDeleted(true);
                    setDeleteAlert(true);
                    deleteSijil(account, deleteId);
                    console.log(deleteSijil);
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
