import React,{useState,useEffect} from 'react'
import "./styles/SenaraiProgram.css"
import Intan from "../intan.png"
import { NavLink } from "react-router-dom";
import NavbarU from "../Component/userNavbar/NavbarU";
import { db } from '../Backend/firebase/firebase-config'
import { collection, getDocs, deleteDoc, doc,} from 'firebase/firestore'

const data=[
  {kod:"SECD2523",nama:"Database",Tarikh:"14.3.2023-14.6.2023"},
  {kod:"SECR3253",nama:"Komunikasi",Tarikh:"20.4.2023-17.8.2023"},
  {kod:"SECD2523",nama:"Database",Tarikh:"14.3.2023-14.6.2023"}
  
];


function SenaraiProgramSediaAda() {

  const [searchValue, setSearchValue] = useState("");
  const [programs,setPrograms] = useState([]);

  const filteredData = data.filter(item =>
    item.nama.toLowerCase().includes(searchValue.toLowerCase())||
    item.kod.toLowerCase().includes(searchValue.toLowerCase())
  );
  
  const userCollectionRef = collection(db, "Program")//crud 1,collection(reference, collectionName)

  useEffect(() => {
    const getProgram = async () => {
      const data = await getDocs(userCollectionRef);//read 2
      console.log(data);
      setPrograms(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));//read 3
    }
    getProgram().then(console.log(programs));
  }, [])

  return (
    <>
    <div className="navbarU">
    <NavbarU/>
    </div>
    <div className="tableSenarai">
      <div style={{ backgroundImage: `url(${Intan})`}}>
      <div>
      <h1>SENARAI PROGRAM SEDIA ADA</h1>
      </div>
      <div className="Search">
        <input type="text" placeholder='Kod/Name' className="textboxsearch"
        value={searchValue} onChange={e => setSearchValue(e.target.value)} ></input>
        <div className="searchicon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
        </div>
      
      </div>
      {searchValue === "" ? (
      <table className="Senarai">
      <thead className="header">
        <tr>
          <th>Kod</th>
          <th>Nama Kursus</th>
          <th>Tarikh</th>
          <th>Aktiviti</th>
        </tr>
      </thead>
      <tbody>
        {programs.map((item,index)=>(
          <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
            <td className="Kod">{item.kod}</td>
            <td className="NameKursus">{item.nama}</td>
            <td className="Tarikh">{item.mula}-{item.tamat}</td>
            <td className="Aktiviti">
              <NavLink to={`/user/Detail/${item.id}`} className="Semaklink">Semak</NavLink>
            </td>
          </tr>
        )
        )}
      </tbody>
    </table>
     ) : (
      <table className="Senarai">
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

export default SenaraiProgramSediaAda

