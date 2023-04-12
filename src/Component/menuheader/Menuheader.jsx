import React from 'react'
import { NavLink } from 'react-router-dom'
import './menuheader.css'

const menuheader = () => {
  return (
    <div className='menuheader'>
          <ul>
            <li>
              <NavLink to="/admin/home">Senarai Program</NavLink>
              </li>
            <li>
              <NavLink to="/admin/peserta">Senarai Peserta</NavLink>
              </li>
            <li>
              <NavLink to="/admin/daftar-admin">Daftar Admin</NavLink>
              </li>
            <li className='last'>
              <NavLink to="/admin/log">Log Aktiviti</NavLink>
              </li>
          </ul>
    </div>
  )
}

export default menuheader
