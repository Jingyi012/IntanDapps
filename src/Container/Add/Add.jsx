import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import backicon from '../../img/arrow.png'
import { Buttons } from '../../Component'
import '../Add/add.css'
import { db } from '../../Backend/firebase/firebase-config'
import { collection, addDoc } from 'firebase/firestore'


const Add = () => {
  const navigate = useNavigate();
  const [isiProgram, setIsiProgram] = useState("");
  const [kod, setKod] = useState("");
  const [mula, setMula] = useState("");
  const [nama, setNama] = useState("");
  const [penganjur, setPenganjur] = useState("");
  const [maksimumPeserta, setMaksimumPeserta] = useState("");
  const [yuran, setYuran] = useState("");
  const [tamat, setTamat] = useState("");

  const onChangeIsiProgram = (e) => {
    setIsiProgram(e.target.value);
  }
  const onChangeKod = (e) => {
    setKod(e.target.value);
  }
  const onChangeMula = (e) => {
    setMula(e.target.value);
  }
  const onChangeNama = (e) => {
    setNama(e.target.value);
  }
  const onChangePenganjur = (e) => {
    setPenganjur(e.target.value);
  }
  const onChangeMaksimumPeserta = (e) => {
    setMaksimumPeserta(e.target.value);
  }
  const onChangeYuran = (e) => {
    setYuran(e.target.value);
  }
  const onChangeTamat = (e) => {
    setTamat(e.target.value);
  }

  const programRegister = async (e) => {
    e.preventDefault();
    //collection() will define the path to the collection
    const userCollectionRef = collection(db, "Program")
    //addDoc() is used for add new document data but with auto generated id in the firestore
    //in this case it will add new program
    await addDoc(userCollectionRef, {
      isiProgram: isiProgram,
      kod: kod,
      mula: mula,
      nama: nama,
      penganjur: penganjur,
      maksimumPeserta: maksimumPeserta,
      jumlahPeserta: "0",
      pesertaStatus: {},
      pesertaList: [],
      transactionId: {},
      pesertaNama: {},
      tamat: tamat,
      yuran: yuran,
    }).then(() => {
      setIsiProgram("");
      setKod("");
      setMula("");
      setNama("");
      setPenganjur("");
      setMaksimumPeserta("");
      setTamat("");
      setYuran("");
      alert("Program Registerd!!");
      navigate(-1);
    });//create 2 end
  }

  return (
    <div className='app_box'>
      <div className='semakdaftarheader'>
        <button className='backbutton' onClick={() => navigate(-1)}><img src={backicon} alt='This is a back button.' className="backicon" /></button>
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
                <input type="text" className='inputtext' onChange={onChangeKod} value={kod} /></div>
              {/* Input for Kod Kursus */}
            </div>
            <div className='maklumat'>
              <label className="kik">NAMA KURSUS</label>
              <div className='textarea'>
                <p className="kik">:</p>
                <input type="text" className='inputtext' onChange={onChangeNama} value={nama} /></div>
              {/* Input for Nama Kursus */}
            </div>
            <div className='maklumat'>
              <label className="kik">NAMA PENGANJUR</label>
              <div className='textarea'>
                <p className="kik">:</p>
                <input type="text" className='inputtext' onChange={onChangePenganjur} value={penganjur} /></div>
            </div>
            <div className='maklumat'>
              <label className="kik">TARIKH MULA</label>
              <div className='textarea'>
                <p className="kik">:</p>
                <input type="text" className='inputtext' onChange={onChangeMula} value={mula} /></div>
              {/* Input for Tarikh Mula */}
            </div>
            <div className='maklumat'>
              <label className="kik">TARIKH TAMAT</label>
              <div className='textarea'>
                <p className="kik">:</p>
                <input type="text" className='inputtext' onChange={onChangeTamat} value={tamat} /></div>
              {/* Input for Tarikh Tamat */}
            </div>
            <div className='maklumat'>
              <label className="kik">MAKSIMUM PESERTA</label>
              <div className='textarea'>
                <p className="kik">:</p>
                <input type="text" className='inputtext' onChange={onChangeMaksimumPeserta} value={maksimumPeserta} /></div>
              {/* Input for MAKSIMUM PESERTA */}
            </div>
            <div className='maklumat'>
              <label className="kik">YURAN</label>
              <div className='textarea'>
                <p className="kik">:</p>
                <input type="text" className='inputtext' onChange={onChangeYuran} value={yuran} /></div>
              {/* Input for Yuran */}
            </div>
            <div className='maklumat'>
              <label className="kik">ISI PROGRAM</label>
              <div className='textarea'>
                <p className="kik">:</p>
                <textarea className='inputarea' rows={9} onChange={onChangeIsiProgram} value={isiProgram} />
                {/* Input for Isi Program */}
              </div>
            </div>
          </div>
        </div>
        <div className='submitBtn'><Buttons title="TAMBAH" /></div>
      </form>

    </div>
  )
}

export default Add
