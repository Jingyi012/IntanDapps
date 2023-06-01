import { React, useState } from 'react';
import { NavLink } from 'react-router-dom';
import "./LamanUtama.css"

export default function LamanUtama() {
  //get the user role, if user had login, the main page will display Dashboard button. 
  //If no logged, it will display login button
  let user = JSON.parse(sessionStorage.getItem("user"));
  const roleChoice = () => {
    if (user.role === "ADMIN") {
      return true;
    } else {
      return false;
    }
  }
  const authIdentify = () => {
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <>
      <div className="mainPageContent">
        <div className='content-container'>
          <div className='description'>
            <h1 className='title'>Intan</h1>
            <hr className='lineBreak' />
            <p className='white'>
              Bagi mempelbagaikan kaedah penyampaian perkhidmatan kepada pelanggan, INTAN telah menyediakan kemudahan di mana penjawat awam boleh memohon kursus secara dalam talian. Kemudahan ini bukan saja dapat memudahkan proses permohonan kursus tetapi juga telah menggalakkan lebih ramai lagi penjawat awam untuk mengikuti kursus di INTAN.
            </p>
            {/* Dashboard button for user who had logged in, Log Masuk button for others */}
            <button className="login-Btn">
              {
                authIdentify() ? roleChoice() ? <NavLink className="LoginBtn" to="/admin/home">Dashboard</NavLink>
                  : <NavLink className="LoginBtn" to="/user/senarai-program-sedia-ada">Dashboard</NavLink>
                  : <NavLink className="LoginBtn" to="/login">Log Masuk</NavLink>
              }
            </button>

          </div>
        </div>

      </div>
    </>
  )
}
