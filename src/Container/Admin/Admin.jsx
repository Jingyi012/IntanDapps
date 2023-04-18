import React from 'react'
import {Buttons,Menuheader} from '../../Component'
import '../Admin/admin.css'

const Admin = () => {
  return (
    <div className='app_box'>
      <Menuheader/>
      <h1 className='admintitle'>DAFTAR ADMIN</h1>
      <div>
        <div className='maklumatadminbahru'>
          MAKLUMAT ADMIN BARU
        </div>
        <form className='maklumatadmin'>
          <div className='maklumat'>
            <label className="kik">NO.MYKAD</label>
            <div className='textarea'>
            <p className="kik">:</p>
            <input type="text" className='inputtext'/></div>
          </div>
          <div className='maklumat'>
            <label className="kik">ALAMAT DOMPET</label>
            <div className='textarea'>
            <p className="kik">:</p>
            <input type="text" className='inputtext'/></div>
          </div>
        </form>
        </div>
      <div className="submitBtn"><Buttons title="SUBMIT"/></div>
    </div>
  )
}

export default Admin
