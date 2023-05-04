import React,{useState,useContext} from 'react'
import '../EditSijil/EditSijil.css'
import { NavLink } from 'react-router-dom'
import { Buttons } from '../../Component'
import backicon from '../../img/arrow.png'
import { useNavigate } from 'react-router-dom'
import AppContext,{ AppContextProvider, } from '../../Context/AppContext'
import { updateCertificateAction} from '../../Utils/utils'
import algosdk from 'algosdk';
const EditSijil = ({backpage}) => {
  const navigate = useNavigate();
  const [tajukSijil,setTajukSijil] = useState('');
  const [tarikhMula,setTarikhMula] = useState('');
  const [tarikhTamat,setTarikhTamat] = useState('');
  const [nama,setNama] = useState('');
  const [NRIC,setNRIC] = useState('');
  const { account, setAccount } = useContext(AppContext);
    //ask user to insert his/her mnemonic before deploy the contract 
const handleClick = async (event) => {
  const enteredInput = await prompt('Please enter wallet mnemonic')
  return enteredInput;
}
  return (
    <div className='app_box'>
      
    <div className='semakdaftarheader'>
    <button className='backbutton' onClick={()=>navigate(-1)}><img src={backicon} alt='This is a back button.' className="backicon"/></button>
    <h1 className='semakdaftaradmin'>EDIT SIJIL</h1>
    {backpage==='/peserta-semak' &&
    <div className='smallback'><NavLink to="/admin/home">LAMAN UTAMA</NavLink>/<NavLink to={backpage}>PESERTA</NavLink>/EDIT SIJIL</div>}
    {backpage==='/semak' &&
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
        <div className='submitBtn' ><Buttons title="Selesai" onClick={async ()=>{
       const mnemonic = await handleClick();
       const arr = [{tajukSijil},{tarikhMula},{tarikhTamat},{nama}];
     //   let txn; 
     const userAcc = await algosdk.mnemonicToSecretKey(mnemonic)
       const txnId= await updateCertificateAction(userAcc,'210164268',arr);
       
       navigate(`/admin/display-sijil/${txnId}`);
    }
        }></Buttons></div>
      
    </div>
  )
}

export default EditSijil
