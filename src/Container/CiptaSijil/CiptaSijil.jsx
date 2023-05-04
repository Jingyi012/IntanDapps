import React,{useState} from 'react'
import '../CiptaSijil/ciptasijil.css'
import { Buttons } from '../../Component'

import { NavLink, useNavigate } from 'react-router-dom'
import backicon from '../../img/arrow.png'
import { deployContract, payContract} from '../../Utils/utils'
import { systemAccount } from '../../Constant/ALGOkey';
import algosdk from 'algosdk';



const CiptaSijil = ({backpage}) => {
  const navigate = useNavigate();
  const [tajukSijil,setTajukSijil] = useState('');
  const [tarikhMula,setTarikhMula] = useState('');
  const [tarikhTamat,setTarikhTamat] = useState('');
  const [nama,setNama] = useState('');
  const [NRIC,setNRIC] = useState('');

 
  //ask user to insert his/her mnemonic before deploy the contract 
const handleClick = async (event) => {
  const enteredInput = await prompt('Please enter wallet mnemonic')
  return enteredInput;
}

  const handleDeployContract = async (arr) => {
    return await deployContract(systemAccount, arr);
    //setDeployedAddress(Txn);
  };
  const payDeployContract = async (userAcc,appId,arr) => {
    console.log(userAcc);
    return await payContract(userAcc, appId,arr);
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
          <div className='submitBtn' ><Buttons title="Deploy Contract" onClick={async ()=>{
       const arr = [{tajukSijil},{tarikhMula},{tarikhTamat},{nama}];
       const mnemonic = await handleClick();
     //   let txn; 
       const appid= await handleDeployContract(arr);
       console.log(mnemonic);
       const userAcc = await algosdk.mnemonicToSecretKey(mnemonic)
       const txnId = await payDeployContract(userAcc, appid,arr);
       
       navigate(`/admin/display-sijil/${txnId}`);
    }
        }></Buttons></div>


    </div>
  )
}

export default CiptaSijil
