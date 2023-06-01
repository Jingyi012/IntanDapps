import React from 'react'
import { NavLink } from 'react-router-dom'
import './menuheader.css'

const menuheader = () => {
  const adminRole = sessionStorage.getItem("adminRole");

  return (
    <div className='menuheader'>
      <ul>
        <li>
          <NavLink to="/admin/home" className='last'>Senarai Program</NavLink>
        </li>
        <li>
          <NavLink to="/admin/peserta" className='last'>Senarai Peserta</NavLink>
        </li>
        <li className="noborder">
          <NavLink to="/admin/log" className='last'>Log Aktiviti</NavLink>
        </li>
        {adminRole == "SuperAdmin" ?
          <li>
            <NavLink to="/admin/daftar-admin" className='last'>Daftar Admin</NavLink>
          </li>
          :
          <div></div>
        }

      </ul>
    </div>
  )
}

export default menuheader
