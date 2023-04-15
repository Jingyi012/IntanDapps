import React,{useState} from 'react'
import "./styles/user1.css"
import Intan from "../intan.png"
import Modal from './Modal'
import NavbarU from "../Component/userNavbar/NavbarU";

const data=[
  {kod:"SECD2523",nama:"Database",Tarikh:"14.3.2023-14.6.2023",Status:"Sedang diproses"},
  {kod:"SECR3253",nama:"Komunikasi",Tarikh:"20.4.2023-17.8.2023",Status:"-"},
  {kod:"SECK2323",nama:"Sistem Analysis Dan Cipta",Tarikh:"14.3.2023-14.6.2023",Status:"Berjaya"},
  {kod:"SECD2523",nama:"Database",Tarikh:"14.3.2023-14.6.2023",Status:"Sedang diproses"},
  {kod:"SECR3253",nama:"Komunikasi",Tarikh:"20.4.2023-17.8.2023",Status:"-"},
  {kod:"SECD2523",nama:"Database",Tarikh:"14.3.2023-14.6.2023",Status:"Berjaya"},
  {kod:"SECH2513",nama:"HTML CSS REACT",Tarikh:"14.3.2023-14.6.2023",Status:"Sedang diproses"},
  {kod:"SECR3253",nama:"Komunikasi",Tarikh:"20.4.2023-17.8.2023",Status:"-"},
  {kod:"SECD2523",nama:"Database",Tarikh:"14.3.2023-14.6.2023",Status:"Berjaya"}
];

function RekodPermohonan() {
    const[showMohon,setShowMohon]=useState(false);
    const [searchValue, setSearchValue] = useState("");
  
    const filteredData = data.filter(item =>
      item.nama.toLowerCase().includes(searchValue.toLowerCase())||
      item.kod.toLowerCase().includes(searchValue.toLowerCase())
    );
  
    
    const handleShowMohon=()=>{
        setShowMohon(true);
    }
    const handleCloseMohon=()=>{
      setShowMohon(false);
    }

    return(
        <div>
            <div className="navbarU">
            <NavbarU/>
            </div>
            <div className="tableRekod">
                <div style={{ backgroundImage: `url(${Intan})`}}>
                    <div>
                        <h1>REKOD PERMOHONAN</h1>
                    </div>
                    <div class="Search">
                        <input type="text" placeholder='Kod/Name' className="textboxsearch"
                        value={searchValue} onChange={e => setSearchValue(e.target.value)} ></input>
                        <div className="searchicon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </div>
                    </div>
                    {searchValue === "" ? (
                        <div>
                            <table className="Rekod">
                                <thead className="header">
                                    <tr>
                                        <th>Kod</th>
                                        <th>Nama Kursus</th>
                                        <th>Tarikh</th>
                                        <th>Status Permohonan</th>
                                        <th>Aktiviti</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item,index)=>(
                                        <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
                                            <td className="kod">{item.kod}</td>
                                            <td className="NameKursus">{item.nama}</td>
                                            <td className="Tarikh">{item.Tarikh}</td>
                                            <td className="Status">{item.Status}</td>
                                            <td className="Aktiviti">
                                                <button onClick={handleShowMohon} className="Mohonbutton">Mohon</button> 
                                                <button className="Printbutton">Print</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {showMohon &&( 
                                <div  className="Rekod-modal">
                                <Modal isOpen={showMohon} onClose={handleCloseMohon}>
                                    <div className="confirmation-message ">
                                        <button className="close" onClick={handleCloseMohon}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                                        </svg>
                                        </button>

                                        <p>Tekan ya untuk sahkan permohonan kursus, tekan tidak untuk batalkan permohonana kursus</p>
                                        
                                        <div className="buttonrekod">
                                            <div className="comfirmya">
                                            <button className="option">Ya</button>
                                            </div>
                                            <div className="comfirmno">
                                            <button className="option">Tidak</button>
                                            </div>
                                        </div>
                                    </div>
                                </Modal>
                                </div>
                            )}
                        </div>


                    ):(
                        <div>
                            <table className="Rekod">
                                <thead className="header">
                                    <tr>
                                        <th>Kod</th>
                                        <th>Nama Kursus</th>
                                        <th>Tarikh</th>
                                        <th>Status Permohonan</th>
                                        <th>Aktiviti</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((item,index)=>(
                                        <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
                                            <td className="kod">{item.kod}</td>
                                            <td className="NameKursus">{item.nama}</td>
                                            <td className="Tarikh">{item.Tarikh}</td>
                                            <td className="Status">{item.Status}</td>
                                            <td className="Aktiviti">
                                                <button onClick={handleShowMohon} className="Mohonbutton">Mohon</button> 
                                                <button className="Printbutton">Print</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {showMohon &&( 
                                <div  className="Rekod-modal">
                                <Modal isOpen={showMohon} onClose={handleCloseMohon}>
                                    <div className="confirmation-message ">
                                        <button className="close" onClick={handleCloseMohon}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                                        </svg>
                                        </button>

                                        <p>Tekan ya untuk sahkan permohonan kursus, tekan tidak untuk batalkan permohonana kursus</p>
                                        
                                        <div className="buttonrekod">
                                            <div className="comfirmya">
                                            <button className="option">Ya</button>
                                            </div>
                                            <div className="comfirmno">
                                            <button className="option">Tidak</button>
                                            </div>
                                        </div>
                                    </div>
                                </Modal>
                                </div>
                            )}
                        </div>
                    )}
                    
                        


                </div>


            </div>

        </div>
    )
}


export default RekodPermohonan

