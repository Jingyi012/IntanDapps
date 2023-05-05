import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import backicon from '../../img/arrow.png'
import '../PesertaSemak/pesertasemak.css'
import closeicon from '../../img/close.png'
import { Buttons, Sejarah } from '../../Component'

const PesertaSemak = () => {
  const [isOpen,setIsOpen]= useState(false);
  const navigate = useNavigate();
  return (
    <div className='app_box'>
      <div className='semakdaftarheader'>
      <button className='backbutton' onClick={()=>navigate(-1)}><img src={backicon} alt='This is a back button.' className="backicon"/></button>
      <h1 className='semakdaftaradmin'>Olivia Lim Shi Ting</h1>
      <div className='smallback'><NavLink to="/admin/peserta">SENARAI PESERTA</NavLink>/PESERTA</div>
      </div>
      {/* Peserta Information */}
      <div className='informasibox'>
        <div className='informasiprogramtitle'>
          INFORMASI PESERTA
        </div>
        <div className='programtitle'>
        <div className='informasiprogram'>
          <label>No Tel</label>
          <p>:</p>
          <p className='informasicontent'>60-xxxxxxxxxxx</p>
        </div>
        <div className='informasiprogram'>
          <label>Alamat Emel Peribadi</label>
          <p>:</p>
          <p className='informasicontent'>xxxxxxx@gmail.com</p>
        </div>
        <div className='informasiprogram'>
          <label>No. MyKad</label>
          <p>:</p>
          <p className='informasicontent'>000000-00-0000</p>
        </div>
        </div>
        </div>
        {/* Senarai program peserta menyertai */}
    <div className='subtitle'>SENARAI PROGRAM</div>
    <div className='program'>
      <table className='progtable'>
        <thead>
            <tr>
              <th className='tarikhmula'>Tarikh Mula</th>
              <th className='tarikhtamat'>Tarikh Tamat</th>
              <th className='kehadiran'>Kehadiran</th>
              <th className='statussijil'>Status</th>
              <th className='sijilaktiviti'>Sijil</th>
            </tr>
        </thead>
        <tbody>
          <tr className='row1'>
              <td>12/02/2023</td>
              <td>13/04/2023</td>
              <td>80%</td>
              <td>
                <Sejarah title="Dicipta"/>
              </td>
              <td className='sijill'>
                <NavLink to='/admin/cipta-sijil-peserta' className="aktivititype">Cipta</NavLink>
                <NavLink to='/admin/edit-sijil-peserta' className="aktivititype">Edit</NavLink>
                <NavLink to='/admin/semak-sijil-peserta' className="aktivititype">Semak</NavLink>
                <button className="padambutton" onClick={()=>setIsOpen(true)}>Padam</button>
              </td>
          </tr>
        </tbody>
      </table>
      </div>
      {/* padam sijil peserta */}
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

export default PesertaSemak
