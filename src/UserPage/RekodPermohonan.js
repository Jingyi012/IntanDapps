import React, { useState, useEffect } from 'react'
import "./styles/rekodpermohonan.css"
import Intan from "../intan.png"
import Modal from './Modal'
import NavbarU from "../Component/userNavbar/NavbarU";
import { db } from '../Backend/firebase/firebase-config'
import { collection, getDoc, deleteDoc, doc, getDocs, query, where, updateDoc,} from 'firebase/firestore'

const data = [
    { kod: "SECD2523", nama: "Database", Tarikh: "14.3.2023-14.6.2023", Status: "Sedang diproses" },
    { kod: "SECR3253", nama: "Komunikasi", Tarikh: "20.4.2023-17.8.2023", Status: "-" },
    { kod: "SECK2323", nama: "Sistem Analysis Dan Cipta", Tarikh: "14.3.2023-14.6.2023", Status: "Berjaya" },
    { kod: "SECD2523", nama: "Database", Tarikh: "14.3.2023-14.6.2023", Status: "Sedang diproses" },
    { kod: "SECR3253", nama: "Komunikasi", Tarikh: "20.4.2023-17.8.2023", Status: "-" },
    { kod: "SECD2523", nama: "Database", Tarikh: "14.3.2023-14.6.2023", Status: "Berjaya" },
    { kod: "SECH2513", nama: "HTML CSS REACT", Tarikh: "14.3.2023-14.6.2023", Status: "Sedang diproses" },
    { kod: "SECR3253", nama: "Komunikasi", Tarikh: "20.4.2023-17.8.2023", Status: "-" },
    { kod: "SECD2523", nama: "Database", Tarikh: "14.3.2023-14.6.2023", Status: "Berjaya" }
];

function RekodPermohonan() {
    const [showMohon, setShowMohon] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [programs, setPrograms] = useState([]);
    const [progrmaID, setProgramID] = useState("");
    const userID = localStorage.getItem("userID");
    const userRef = doc(db, "User", userID)//crud 1,collection(reference, collectionName)
    const [reload, setReload] = useState(0);

    const filteredData = data.filter(item =>
        item.nama.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.kod.toLowerCase().includes(searchValue.toLowerCase())
    );

    useEffect(() => {
        const getUserProgram = async () => {
            const docRef = query(collection(db,"Program"), where("pesertaList", "array-contains", userID));
            const data = await getDocs(docRef);
            setPrograms(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));//read 3
        }
        getUserProgram();
        console.log(programs);
    },[reload])

    const handleShowMohon = (progID) => {
        setShowMohon(true);
        console.log(progID);
        setProgramID(progID);   
    }
    const handleCloseMohon = () => {
        setShowMohon(false);
    }

    const printSijil = () =>{
        console.log(programs);
    }

    const padamPermohonan = async () => {
        console.log(progrmaID);
        const progRef = doc(db,"Program",progrmaID);
        await getDoc(progRef).then(async (data) =>{
            const tempList = data.data().pesertaList;
            const tempNama = data.data().pesertaNama;
            const tempStatus = data.data().pesertaStatus;
            const tempTran = data.data().transactionId;
            
            var oldList = tempList;
            var newNama = tempNama;
            var newStatus = tempStatus;
            var newTran = tempTran;

            var newList = oldList.filter(item => item !== userID);
            delete newNama[userID];
            delete newStatus[userID];
            delete newTran[userID];

            await updateDoc((progRef),{
                pesertaList: newList,
                pesertaNama: newNama,
                pesertaStatus: newStatus,
                transactionId: newTran
            }).then(()=>{
                setShowMohon(false);
                alert("Anda telah berjaya padam program permohonan");
                setReload(reload + 1);
            })
        })
    }

    return (
        <div>
            <div className="navbarU">
                <NavbarU />
            </div>
            <div className="tableRekod">
                <div style={{ backgroundImage: `url(${Intan})` }}>
                    <div>
                        <h1>REKOD PERMOHONAN</h1>
                    </div>
                    <div class="Search">
                        <input type="text" placeholder='Kod/Name' className="textboxsearch"
                            value={searchValue} onChange={e => setSearchValue(e.target.value)} ></input>
                        <div className="searchicon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
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
                                    {programs.map((item, index) => (
                                        <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
                                            <td className="kod">{item.kod}</td>
                                            <td className="NameKursus">{item.nama}</td>
                                            <td className="Tarikh">{item.mula} - {item.tamat}</td>
                                            <td className="Status">Sedang Diprocess</td>
                                            <td className="Aktiviti">
                                                <div className="AktivitiContainer">
                                                    <button onClick={() => {handleShowMohon(item.id)}} className="Mohonbutton">BatalPermohonan</button>
                                                    <button onClick={printSijil} className="Printbutton">PrintSijil</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {showMohon && (
                                <div className="Rekod-modal">
                                    <Modal isOpen={showMohon} onClose={handleCloseMohon}>
                                        <div className="confirmation-message ">
                                            <div className="headpopout">
                                                <p>Alert</p>
                                            </div>
                                            <button className="close" onClick={handleCloseMohon}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                                </svg>
                                            </button>

                                            <div className="contentpopout">
                                                <p>
                                                    Tekan ya untuk sahkan permohonan kursus, tekan tidak untuk
                                                    batalkan perdaftaran kursus
                                                </p>
                                            </div>
                                            <div className="buttonrekod">
                                                <div className="comfirmya">
                                                    <button className="option" onClick={padamPermohonan}>Ya</button>
                                                </div>
                                                <div className="comfirmno">
                                                    <button className="option" onClick={handleCloseMohon}>Tidak</button>
                                                </div>
                                            </div>
                                        </div>
                                    </Modal>
                                </div>
                            )}
                        </div>


                    ) : (
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
                                    {filteredData.map((item, index) => (
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
                            {showMohon && (
                                <div className="Rekod-modal">
                                    <Modal isOpen={showMohon} onClose={handleCloseMohon}>
                                        <div className="confirmation-message ">
                                            <div className="headpopout">
                                                <p>Alert</p>
                                            </div>
                                            <button className="close" onClick={handleCloseMohon}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                                </svg>
                                            </button>

                                            <div className="contentpopout">
                                                <p>
                                                    Tekan ya untuk sahkan permohonan kursus, tekan tidak untuk
                                                    batalkan perdaftaran kursus
                                                </p>
                                            </div>
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


