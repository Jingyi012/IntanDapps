import React from 'react'
import { NavLink } from 'react-router-dom'
import './menuheader.css'

const menuheader = () => {
  return (
    <div className='menuheader'>
          <ul>
            <li>
              <NavLink to="/admin/home" className='last'>Senarai Program</NavLink>
              </li>
            <li>
              <NavLink to="/admin/peserta" className='last'>Senarai Peserta</NavLink>
              </li>
            <li>
              <NavLink to="/admin/daftar-admin" className='last'>Daftar Admin</NavLink>
              </li>
            <li>
              <NavLink to="/admin/log" className='last'>Log Aktiviti</NavLink>
              </li>
          </ul>
    </div>
  )
}

export default menuheader
