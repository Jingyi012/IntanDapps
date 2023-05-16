import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import backicon from '../../img/arrow.png'
import { Buttons } from '../../Component'
import '../EditProgram/editprogram.css'
import { db } from '../../Backend/firebase/firebase-config'
import { collection, getDoc, updateDoc, doc } from 'firebase/firestore'


const EditProgram = () => {
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

  let { programID } = useParams();

  useEffect(() => {
    const getProgram = async () => {
      const docRef = doc(db, "Program", programID.toString());
      const data1 = await getDoc(docRef);
      setIsiProgram(data1.data().isiProgram);
      setKod(data1.data().kod);
      setMula(data1.data().mula);
      setNama(data1.data().nama);
      setPenganjur(data1.data().penganjur);
      setMaksimumPeserta(data1.data().maksimumPeserta);
      setYuran(data1.data().yuran);
      setTamat(data1.data().tamat);
    }

    getProgram();

  }, []);

  const editProgram = async (e) => {
    e.preventDefault();
    const userCollectionRef = doc(db, "Program", programID)//crud 1,collection(reference, collectionName)
    await updateDoc(userCollectionRef, {// create 2
      isiProgram: isiProgram,
      kod: kod,
      mula: mula,
      nama: nama,
      penganjur: penganjur,
      maksimumPeserta: maksimumPeserta,
      yuran: yuran,
      tamat: tamat,
    }).then(() => {
      setIsiProgram("");
      setKod("");
      setMula("");
      setNama("");
      setPenganjur("");
      setMaksimumPeserta("");
      setTamat("");
      setYuran("");
      alert("Program Updated!!");
      navigate(-1);
    });
  }
  return (
    <div className='app_box'>
      <div className='semakdaftarheader'>
        {/* back to previous page */}
        <button className='backbutton' onClick={() => navigate(-1)}><img src={backicon} alt='This is a back button.' className="backicon" /></button>
        <h1 className='semakdaftaradmin'>KEMASKINI PROGRAM</h1>
        <div className='smallback'><NavLink to="/admin/home">LAMAN UTAMA</NavLink>/ADD PROGRAM</div></div>
      {/*Information input section for Edit Program */}
      <form className='maklumatbox' onSubmit={editProgram}>
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
            </div>
            <div className='maklumat'>
              <label className="kik">NAMA KURSUS</label>
              <div className='textarea'>
                <p className="kik">:</p>
                <input type="text" className='inputtext' onChange={onChangeNama} value={nama} /></div>
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
            </div>
            <div className='maklumat'>
              <label className="kik">TARIKH TAMAT</label>
              <div className='textarea'>
                <p className="kik">:</p>
                <input type="text" className='inputtext' onChange={onChangeTamat} value={tamat} /></div>
            </div>
            <div className='maklumat'>
              <label className="kik">MAKSIMUM PESERTA</label>
              <div className='textarea'>
                <p className="kik">:</p>
                <input type="text" className='inputtext' onChange={onChangeMaksimumPeserta} value={maksimumPeserta} /></div>
            </div>
            <div className='maklumat'>
              <label className="kik">YURAN</label>
              <div className='textarea'>
                <p className="kik">:</p>
                <input type="text" className='inputtext' onChange={onChangeYuran} value={yuran} /></div>
            </div>
            <div className='maklumat'>
              <label className="kik">ISI PROGRAM</label>
              <div className='textarea'>
                <p className="kik">:</p>
                <textarea className='inputarea' rows={9} onChange={onChangeIsiProgram} value={isiProgram} />
              </div>
            </div>
          </div>
        </div>
        <div className='submitBtn'><Buttons title="SELESAI" /></div>
      </form>

    </div>
  )
}

export default EditProgram
