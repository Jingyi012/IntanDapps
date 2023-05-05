import React from 'react'
import '../EditSijil/EditSijil.css'
import { NavLink, useLocation } from 'react-router-dom'
import { Buttons } from '../../Component'
import backicon from '../../img/arrow.png'
import { useNavigate } from 'react-router-dom'


const EditSijil = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className='app_box'>
      <div className='semakdaftarheader'>
      {/* back to previous page */}
      <button className='backbutton' onClick={() => navigate(-1)}><img src={backicon} alt='This is a back button.' className="backicon"/></button>
      <h1 className='semakdaftaradmin'>EDIT SIJIL</h1>
      {location.pathname==='/admin/edit-sijil-peserta' &&
      <div className='smallback'><NavLink to="/admin/home">SENARAI PESERTA</NavLink>/<NavLink onClick={() => navigate(-1)}>PESERTA</NavLink>/EDIT SIJIL</div>}
      {location.pathname==='/admin/edit-sijil' &&
      <div className='smallback'><NavLink to="/admin/home">SENARAI PROGRAM</NavLink>/<NavLink onClick={() => navigate(-1)}>PROGRAM</NavLink>/EDIT SIJIL</div>}
      </div>
      {/* Information input section for Edit Sijil */}
        <form className='maklumatbox'>
      <div>
        <div className='maklumatadminbahru'>
          MAKLUMAT SIJIL
        </div>
        <div className='maklumatsijil'>
          <div className='maklumat'>
            <label className="kik">TAJUK SIJIL</label>
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
            <input type="text" className='inputtext'/></div>
          </div>
          <div className='maklumat'>
            <label className="kik">No. MYKAD</label>
            <div className='textarea'>
            <p className="kik">:</p>
            <input type="text" className='inputtext'/></div>
          </div>
          </div>
          </div>
        </form>
        <div className='submitBtn'><Buttons title="SELESAI"/></div>
      
    </div>
  )
}

export default EditSijil
