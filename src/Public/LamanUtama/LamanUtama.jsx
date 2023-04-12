import {React, useState} from 'react';
import {NavLink} from 'react-router-dom';
import "./LamanUtama.css"

export default function LamanUtama(){
    return(
      <>
        <div className="mainPageContent">
          <div className='content-container'>
            <div className='description'>
              <h1 className='title'>Intan</h1>
              <hr className='lineBreak'/>
              <p>
                Bagi mempelbagaikan kaedah penyampaian perkhidmatan kepada pelanggan, INTAN telah menyediakan kemudahan di mana penjawat awam boleh memohon kursus secara dalam talian. Kemudahan ini bukan saja dapat memudahkan proses permohonan kursus tetapi juga telah menggalakkan lebih ramai lagi penjawat awam untuk mengikuti kursus di INTAN.
              </p>
              <button className="login-Btn"><NavLink className="LoginBtn" to="/login">
                Log Masuk
              </NavLink>
              </button>
            </div>
          
            <div className='content-pic'>

            </div>
          </div>
        </div>
      </>  
    )
}
