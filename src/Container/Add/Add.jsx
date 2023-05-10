import React,{useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import backicon from '../../img/arrow.png'
import { Buttons } from '../../Component'
import '../Add/add.css'
import { db } from '../../Backend/firebase/firebase-config'
import { collection, addDoc} from 'firebase/firestore'


const Add = () => {
  const navigate = useNavigate();
  const [isiProgram,setIsiProgram] = useState("");
  const [kod,setKod] = useState("");
  const [mula,setMula] = useState("");
  const [nama,setNama] = useState("");
  const [penganjur,setPenganjur] = useState("");
  const [jumPeserta,setJumPeserta] = useState("");
  const [tamat,setTamat] = useState("");

  const onChangeIsiProgram = (e) =>{
    setIsiProgram(e.target.value);
  }
  const onChangeKod = (e) =>{
    setKod(e.target.value);
  }
  const onChangeMula = (e) =>{
    setMula(e.target.value);
  }
  const onChangeNama = (e) =>{
    setNama(e.target.value);
  }
  const onChangePenganjur = (e) =>{
    setPenganjur(e.target.value);
  }
  const onChangeJumPeserta= (e) =>{
    setJumPeserta(e.target.value);
  }
  const onChangeTamat = (e) =>{
    setTamat(e.target.value);
  }

  const programRegister = async (e) => {
    e.preventDefault();
    const userCollectionRef = collection(db, "Program")//crud 1,collection(reference, collectionName)
    await addDoc(userCollectionRef, {// create 2
      isiProgram: isiProgram,
      kod: kod,
      mula: mula,
      nama: nama,
      penganjur: penganjur,
      jumPeserta: jumPeserta,
      pesertaStatus: {},
      pesertaList:[],
      transactionId:{},
      pesertaNama:{},
      tamat: tamat,
    }).then(()=>{
      setIsiProgram("");
      setKod("");
      setMula("");
      setNama("");
      setPenganjur("");
      setJumPeserta("");
      setTamat("");
      alert("Program Registerd!!");
      navigate(-1);
    });//create 2 end
  }

  return (
    <div className='app_box'>
      <div className='semakdaftarheader'>
      <button className='backbutton' onClick={()=>navigate(-1)}><img src={backicon} alt='This is a back button.' className="backicon"/></button>
      <h1 className='semakdaftaradmin'>Tambah Program</h1>
      <div className='smallback'><NavLink to="/admin/home">LAMAN UTAMA</NavLink>/TAMBAH PROGRAM</div></div>
      <form className='maklumatbox' onSubmit={programRegister}>
      <div>
        <div className='maklumatadminbahru'>
          MAKLUMAT PROGRAM
        </div>
        <div className='maklumatsijil'>
          <div className='maklumat'>
            <label className="kik">KOD KURSUS</label>
            <div className='textarea'>
            <p className="kik">:</p>
            <input type="text" className='inputtext' onChange={onChangeKod} value={kod}/></div>
          </div>
          <div className='maklumat'>
            <label className="kik">NAMA KURSUS</label>
            <div className='textarea'>
            <p className="kik">:</p>
            <input type="text" className='inputtext' onChange={onChangeNama} value={nama}/></div>
          </div>
          <div className='maklumat'>
            <label className="kik">NAMA PENGANJUR</label>
            <div className='textarea'>
            <p className="kik">:</p>
            <input type="text" className='inputtext' onChange={onChangePenganjur} value={penganjur}/></div>
          </div>
          <div className='maklumat'>
            <label className="kik">TARIKH MULA</label>
            <div className='textarea'>
            <p className="kik">:</p>
            <input type="text" className='inputtext' onChange={onChangeMula} value={mula}/></div>
          </div>
          <div className='maklumat'>
            <label className="kik">TARIKH TAMAT</label>
            <div className='textarea'>
            <p className="kik">:</p>
            <input type="text" className='inputtext' onChange={onChangeTamat} value={tamat}/></div>
          </div>
          <div className='maklumat'>
            <label className="kik">JUMLAH PESERTA</label>
            <div className='textarea'>
            <p className="kik">:</p>
            <input type="text" className='inputtext' onChange={onChangeJumPeserta} value={jumPeserta}/></div>
          </div>
          <div className='maklumat'>
            <label className="kik">ISI PROGRAM</label>
            <div className='textarea'>
            <p className="kik">:</p>
            <textarea className='inputarea' rows={9} onChange={onChangeIsiProgram} value={isiProgram}/>
          </div>
          </div>
          </div>
          </div>
          <div className='submitBtn'><Buttons title="TAMBAH"/></div>
        </form>
        
    </div>
  )
}

export default Add
