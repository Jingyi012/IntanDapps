import React,{useState} from 'react'
import "./styles/SeneraiProgram.css"
import Intan from "../intan.png"
import { NavLink } from "react-router-dom";
import NavbarU from "../Component/userNavbar/NavbarU";


const data=[
  {kod:"SECD2523",nama:"Database",Tarikh:"14.3.2023-14.6.2023"},
  {kod:"SECR3253",nama:"Komunikasi",Tarikh:"20.4.2023-17.8.2023"},
  {kod:"SECD2523",nama:"Database",Tarikh:"14.3.2023-14.6.2023"}
  
];


function SeneraiProgramSediaAda() {

  const [searchValue, setSearchValue] = useState("");

  const filteredData = data.filter(item =>
    item.nama.toLowerCase().includes(searchValue.toLowerCase())||
    item.kod.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
    <div className="navbarU">
    <NavbarU/>
    </div>
    <div className="tableSenerai">
      <div style={{ backgroundImage: `url(${Intan})`}}>
      <div>
      <h1>SENERAI PROGRAM SEDIA ADA</h1>
      </div>
      <div class="Search">
        <input type="text" placeholder='Kod/Name' className="textboxsearch"
        value={searchValue} onChange={e => setSearchValue(e.target.value)} ></input>
        <div className="searchicon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
        </div>
      
      </div>
      {searchValue === "" ? (
      <table className="Senerai">
      <thead className="header">
        <tr>
          <th>Kod</th>
          <th>Nama Kursus</th>
          <th>Tarikh</th>
          <th>Aktiviti</th>

        </tr>
      </thead>
      <tbody>
        {data.map((item,index)=>(
          <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
            <td className="Kod">{item.kod}</td>
            <td className="NameKursus">{item.nama}</td>
            <td className="Tarikh">{item.Tarikh}</td>
            <td className="Aktiviti">
              <NavLink to="/user/Detail" className="Semaklink">Semak</NavLink>
            </td>
          </tr>
        )
        )}
      </tbody>
    </table>
     ) : (
      <table className="Senerai">
      <thead className="header">
        <tr>
          <th>Kod</th>
          <th>Nama Kursus</th>
          <th>Tarikh</th>
          <th>Aktiviti</th>

        </tr>
      </thead>
      <tbody>
        {filteredData.map((item,index)=>(
          <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
            <td className="Kod">{item.kod}</td>
            <td className="NameKursus">{item.nama}</td>
            <td className="Tarikh">{item.Tarikh}</td>
            <td className="Aktiviti">
            <NavLink to="/user/detail" className="Semaklink">Semak</NavLink>
            </td>
          </tr>
        )
        )}
      </tbody>
    </table>
     )}
    </div>
    </div>
    </>
  )
}

export default SeneraiProgramSediaAda

