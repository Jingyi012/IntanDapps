import React,{useState} from 'react'
import '../CiptaSijil/ciptasijil.css'
import { Buttons } from '../../Component'
import AppContext,{ AppContextProvider, } from '../../Context/AppContext'
import { NavLink, useNavigate } from 'react-router-dom'
import { deployContract,payContract, optInContract } from '../../Utils/utils';
import backicon from '../../img/arrow.png'
import algosdk from 'algosdk';

const CiptaSijil = ({backpage}) => {
  const navigate = useNavigate();
  const [tajukSijil,setTajukSijil] = useState('');
  const [tarikhMula,setTarikhMula] = useState('');
  const [tarikhTamat,setTarikhTamat] = useState('');
  const [nama,setNama] = useState('');
  const [NRIC,setNRIC] = useState('');
  const mnemonic = 'leg cage army someone purse hurt imitate reform impulse west girl find abuse empty bone employ air post bid custom guilt surge weather abstract bulb';
  const recoveredAccount = algosdk.mnemonicToSecretKey(mnemonic);
  const [userMnemonic, setUserMnemonic] = useState('');
 
  //ask user to insert his/her mnemonic before deploy the contract 
const handleClick = async (event) => {
  const enteredInput = await prompt('Please enter wallet mnemonic')
  setUserMnemonic(enteredInput)
  return enteredInput;
}

  const handleDeployContract = async () => {
    return await deployContract(recoveredAccount, {tajukSijil},{tarikhMula},{tarikhTamat},{nama});
    //setDeployedAddress(Txn);
  };
  const payDeployContract = async (userAcc,appId) => {
    console.log(userAcc);
    return await payContract(userAcc, appId,{tajukSijil},{tarikhMula},{tarikhTamat},{nama});
    //setDeployedAddress(Txn);
  };
  return (
    <div className='app_box'>
      
      <div className='semakdaftarheader'>
      <button className='backbutton' onClick={()=>navigate(-1)}><img src={backicon} alt='This is a back button.' className="backicon"/></button>
      <h1 className='semakdaftaradmin'>CIPTA SIJIL</h1>
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
          value={NRIC}
          onChange={(e) => setNRIC(e.target.value)}
        /></div>
          </div>
          </div>
          </div>
          </div>
          <button onClick={async ()=>{
       const mnemonic = await handleClick();
     //   let txn; 
       const appid= await handleDeployContract();
       console.log(mnemonic);
       const userAcc = await algosdk.mnemonicToSecretKey(mnemonic)
       const txnId = await payDeployContract(userAcc, appid);
       
       navigate(`/admin/display-sijil/${txnId}`);
    }
        }>Deploy Contract</button>


    </div>
  )
}

export default CiptaSijil
