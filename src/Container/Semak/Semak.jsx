import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import backicon from '../../img/arrow.png'
import '../Semak/semak.css'
import closeicon from '../../img/close.png'
import { Buttons, Sejarah } from '../../Component'

const Semak = ({title}) => {
  const [isOpen,setIsOpen]= useState(false);
  const navigate = useNavigate();
  return (
    <div className='app_box'>
      <div className='semakdaftarheader'>
      <button className='backbutton' onClick={()=>navigate(-1)}><img src={backicon} className="backicon" alt='It is a back icon.'/></button>
      <h1 className='semakdaftaradmin'>{title}</h1>
      <div className='smallback'><NavLink to="/admin/home">LAMAN UTAMA</NavLink>/{title}</div>
      </div>
      <div className='informasibox'>
        <div className='informasiprogramtitle'>
          INFORMASI PROGRAM
        </div>
        <div className='programtitle'>
        <div className='informasiprogram'>
          <label>Nama Penganjur</label>
          <p>:</p>
          <p className='informasicontent'>XXX XXX XXXX</p>
        </div>
        <div className='informasiprogram'>
          <label>Tempoh</label>
          <p>:</p>
          <p className='informasicontent'>12/2/2023 - 12/4/2023</p>
        </div>
        <div className='informasiprogram'>
          <label>Jumlah Peserta</label>
          <p>:</p>
          <p className='informasicontent'>30</p>
        </div>
        </div>
        </div>
    <div className='subtitle'>SENARAI PESERTA</div>
    <div className='program'>
      <table className='progtable'>
        <thead>
            <tr>
              <th className='nomykad'>No. MyKad</th>
              <th className='pesertaname'>Nama Peserta</th>
              <th className='kehadiran'>Kehadiran</th>
              <th className='statussijil'>Status</th>
              <th className='sijilaktiviti'>Sijil</th>
            </tr>
        </thead>
        <tbody>
          <tr className='row2'>
              <td>SECK0233</td>
              <td>s</td>
              <td className='centerdata'>80%</td>
              <td className='centerdata'><Sejarah title="Dicipta"/></td>
              <td>
                <NavLink to='/admin/cipta-sijil' className="aktivititype">Cipta</NavLink>
                <NavLink to='/admin/edit-sijil' className="aktivititype">Edit</NavLink>
                <NavLink to='/admin/semak-program' className="aktivititype">Semak</NavLink>
                <button className="padambutton" onClick={()=>setIsOpen(true)}>Padam</button>
              </td>
          </tr>
        </tbody>
      </table>
      </div>
      {isOpen && (
        <div className='semaksijil'>
           <div className='contentdeletesijil'>
            <div className='semaksijilbox'>
              <div className='sejarahheader'>
              <h2 className='sejarahtitle'>Padam</h2>
              <button className='closebutton' onClick={() => setIsOpen(false)}><img src={closeicon} alt="This is a close icon." className='closeicon'/></button>
              </div>
              <div className='contentdelete'>
              <div><p>
                  Please be careful! Your action cannot be undo after you clicked the <b>'Padam'</b> button
                </p></div>
                <div className='padamconfirmbutton'><Buttons title="Padam"/></div>
              </div>
            </div>
            </div>
        </div>
        )}
      </div>
  )
}

export default Semak
