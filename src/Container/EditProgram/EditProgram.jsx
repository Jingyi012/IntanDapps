import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import backicon from '../../img/arrow.png'
import { Buttons } from '../../Component'
import '../EditProgram/editprogram.css'

const EditProgram = () => {
  const navigate = useNavigate();
  return (
    <div className='app_box'>
      <div className='semakdaftarheader'>
      {/* back to previous page */}
      <button className='backbutton' onClick={()=>navigate(-1)}><img src={backicon} alt='This is a back button.' className="backicon"/></button>
      <h1 className='semakdaftaradmin'>Edit Program</h1>
      <div className='smallback'><NavLink to="/admin/home">SENARAI PROGRAM</NavLink>/EDIT PROGRAM</div></div>
      {/*Information input section for Edit Program */}
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
