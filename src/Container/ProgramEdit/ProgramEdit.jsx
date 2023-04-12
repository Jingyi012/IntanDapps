import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Buttons } from '../../Component'
import backicon from '../../img/arrow.png'
import '../ProgramEdit/programedit.css'

const ProgramEdit = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className='daftarheader'>
      <button className='backbutton' onClick={()=>navigate(-1)}><img src={backicon} alt='This is a back button.' className="backicon"/></button>
      <h1 className='daftaradmin'>EDIT SIJIL</h1>
      </div>
        <form>
      <div>
        <div className='maklumatadminbahru'>
          MAKLUMAT SIJIL
        </div>
        <div className='maklumatsijil'>
          <div className='maklumat'>
            <label>TAJUK SIJIL</label>
            <div className='textarea'>
            <p>:</p>
            <input type="text" className='inputtext'/></div>
          </div>
          <div className='maklumat'>
            <label>TARIKH MULA</label>
            <div className='textarea'>
            <p>:</p>
            <input type="text" className='inputtext'/></div>
          </div>
          <div className='maklumat'>
            <label>TARIKH TAMAT</label>
            <div className='textarea'>
            <p>:</p>
            <input type="text" className='inputtext'/></div>
          </div>
          </div>
          </div>
          <div>
          <div className='maklumatadminbahru'>
          MAKLUMAT PENGUNA
        </div>
        <div className='maklumatsijil'>
          <div className='maklumat'>
            <label>NAMA</label>
            <div className='textarea'>
            <p>:</p>
            <input type="text" className='inputtext'/></div>
          </div>
          <div className='maklumat'>
            <label>No. MYKAD</label>
            <div className='textarea'>
            <p>:</p>
            <input type="text" className='inputtext'/></div>
          </div>
          </div>
          </div>
        </form>
        <div className='submitBtn'><Buttons title="SELESAI"/></div>
      
    </div>
  )
}

export default ProgramEdit
