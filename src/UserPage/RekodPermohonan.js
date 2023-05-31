import React, { useState, useEffect } from 'react'
import { useNavigate, } from 'react-router-dom'
import "./styles/rekodpermohonan.css"
import Intan from "../intan.png"
import Modal from './Modal'
import NavbarU from "../Component/userNavbar/NavbarU";
import { db } from '../Backend/firebase/firebase-config'
import { collection, getDoc, deleteDoc, doc, getDocs, query, where, updateDoc, } from 'firebase/firestore'

function RekodPermohonan() {
    //state for showing the pop out page
    const [showMohon, setShowMohon] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [programs, setPrograms] = useState([]);
    const [pesertaStatus, setPesertaStatus] = useState([]);
    const [transactionId, setTransactionId] = useState([]);
    const [progrmaID, setProgramID] = useState("");
    const userID = sessionStorage.getItem("userID");
    const userRef = doc(db, "User", userID)//crud 1,collection(reference, collectionName)
    const [reload, setReload] = useState(0);

    const navigate = useNavigate();

    //Filter the data array based on the nama or kod value entered by the user.
    const filteredData = programs.filter(
        (item) =>
            item.nama.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.kod.toLowerCase().includes(searchValue.toLowerCase())
    );

    useEffect(() => {
        const getUserProgram = async () => {
            //define the document path with the specific requirement
            //which is the document data in the document path must have the userID in the array fields
            const docRef = query(collection(db, "Program"), where("pesertaList", "array-contains", userID));
            const data = await getDocs(docRef);
            setPrograms(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));//read 3
            setPesertaStatus(data.docs.map((doc) => ({ ...doc.data().pesertaStatus })))
            setTransactionId(data.docs.map((doc) => ({ ...doc.data().transactionId })))
        }
        getUserProgram();
        console.log(programs);
    }, [reload])

    const handleShowMohon = (progID) => {
        setShowMohon(true);
        console.log(progID);
        setProgramID(progID);
    }
    const handleCloseMohon = () => {
        setShowMohon(false);
    }

    const printSijil = (index) => {
        const id = sessionStorage.getItem("userID")
        console.log(transactionId[index][id]);
        navigate(`/informasi-sijil/${transactionId[index][id]}`);
    }

    const padamPermohonan = async () => {
        console.log(progrmaID);
        const progRef = doc(db, "Program", progrmaID);
        //fetch the program info and reduce the total peserta
        await getDoc(progRef).then(async (data) => {
            const tempJumlahPeserta = data.data().jumlahPeserta;
            var newJumlahPesertaNum = Number(tempJumlahPeserta) - 1;
            var newJumlahPesertaString = newJumlahPesertaNum.toString();

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

            //update the new total peserta
            await updateDoc((progRef), {
                pesertaList: newList,
                pesertaNama: newNama,
                pesertaStatus: newStatus,
                transactionId: newTran,
                jumlahPeserta: newJumlahPesertaString,
            }).then(() => {
                setShowMohon(false);
                alert("Anda telah berjaya padam program permohonan");
                setReload(reload + 1);
            })
        })
    }
    //If there is a search value, show the filtered data array. Otherwise, show the whole data array
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
                    <div className="Search">
                        <input type="text" placeholder='Kod/Name' className="textboxsearch"
                            value={searchValue} onChange={e => setSearchValue(e.target.value)} ></input>
                        <div className="searchicon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
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
                                        <th>Status Sijil</th>
                                        <th className="centered">🗑️</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {programs.map((item, index) => (
                                        <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
                                            <td className="kod">{item.kod}</td>
                                            <td className="NameKursus">{item.nama}</td>
                                            <td className="Tarikh">{item.mula} - {item.tamat}</td>
                                            <td className="Status">
                                                {(`${pesertaStatus[index][userID]}` === 'dicipta' || `${pesertaStatus[index][userID]}` === 'dikemasKini') ?
                                                    <button onClick={() => { printSijil(index); }} className="Printbutton">Print</button> :
                                                    <button disabled={true} className="semakbutton">Print</button>}
                                            </td>
                                            <td className="Aktiviti">
                                                <div className="AktivitiContainer">
                                                    <button onClick={() => { handleShowMohon(item.id) }} className="Mohonbutton">Batal</button>
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
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
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
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                                </svg>
                                            </button>

                                            <div className="contentpopout">
                                                <p>
                                                    Tekan ya untuk sahkan permohonan kursus, tekan tidak
                                                    untuk batalkan perdaftaran kursus
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
    );
}

export default RekodPermohonan;
