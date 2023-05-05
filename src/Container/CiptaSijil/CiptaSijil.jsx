import React from 'react'
import '../CiptaSijil/ciptasijil.css'
import { Buttons } from '../../Component'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import backicon from '../../img/arrow.png'

const CiptaSijil = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className='app_box'>
      <div className='semakdaftarheader'>
      {/* back to previous page */}
      <button className='backbutton' onClick={()=>navigate(-1)}><img src={backicon} alt='This is a back button.' className="backicon"/></button>
      <h1 className='semakdaftaradmin'>CIPTA SIJIL</h1>
      {location.pathname==='/admin/cipta-sijil-peserta' &&
      <div className='smallback'><NavLink to="/admin/peserta">SENARAI PESERTA</NavLink>/<NavLink onClick={()=>navigate(-1)}>PESERTA</NavLink>/EDIT SIJIL</div>}
      {location.pathname==='/admin/cipta-sijil' &&
      <div className='smallback'><NavLink to="/admin/home">SENARAI PROGRAM</NavLink>/<NavLink onClick={()=>navigate(-1)}>PROGRAM</NavLink>/EDIT SIJIL</div>}
      </div>
      {/* Information input section for Cipta Sijil */}
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
        <div className='submitBtn'><Buttons title="CIPTA"/></div>
      
    </div>
  )
}

export default CiptaSijil
