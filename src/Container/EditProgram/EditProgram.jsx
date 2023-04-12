import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import backicon from '../../img/arrow.png'
import { Buttons } from '../../Component'
import '../EditProgram/editprogram.css'

const EditProgram = () => {
  const navigate = useNavigate();
  return (
    <div>
       <div className='daftarheader'>
      <button className='backbutton' onClick={()=>navigate(-1)}><img src={backicon} alt='This is a back button.' className="backicon"/></button>
      <h1 className='daftaradmin'>Edit Program</h1>
      <div className='smallback'><NavLink to="/admin/home">LAMAN UTAMA</NavLink>/ADD PROGRAM</div></div>
      <form className='maklumatbox'>
      <div>
        <div className='maklumatadminbahru'>
          MAKLUMAT PROGRAM
        </div>
        <div className='maklumatsijil'>
          <div className='maklumat'>
            <label className="kik">KOD KURSUS</label>
            <div className='textarea'>
            <p className="kik">:</p>
            <input type="text" className='inputtext'/></div>
          </div>
          <div className='maklumat'>
            <label className="kik">NAMA KURSUS</label>
            <div className='textarea'>
            <p className="kik">:</p>
            <input type="text" className='inputtext'/></div>
          </div>
          <div className='maklumat'>
            <label className="kik">TARIKH MULA</label>
            <div className='textarea'>
            <p className="kik">:</p>
            <input type="text" className='inputtext'/></div>
          </div>
          <div className='maklumat'>
            <label className="kik">TARIKH TAMAT</label>
            <div className='textarea'>
            <p className="kik">:</p>
            <input type="text" className='inputtext'/></div>
          </div>
          <div className='maklumat'>
            <label className="kik">JUMLAH PESERTA</label>
            <div className='textarea'>
            <p className="kik">:</p>
            <input type="text" className='inputtext'/></div>
          </div>
          <div className='maklumat'>
            <label className="kik">ISI PROGRAM</label>
            <div className='textarea'>
            <p className="kik">:</p>
            <textarea placeholder='Definisi program' className='inputarea' rows={9}/>
          </div>
          </div>
          </div>
          </div>
        </form>
        <div className='submitBtn'><Buttons title="SELESAI"/></div>
    </div>
  )
}

export default EditProgram
