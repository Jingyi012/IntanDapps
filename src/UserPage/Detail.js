import React, { useState , useEffect} from "react";
import "./styles/Detail.css";
import Modal from "./Modal";
import { NavLink,useParams,useNavigate } from "react-router-dom";
import { db } from '../Backend/firebase/firebase-config'
import { collection, getDoc, deleteDoc, doc, updateDoc,} from 'firebase/firestore'
import { LocalActivity } from "@mui/icons-material";

function SenaraiProgramSediaAda() {
  const [showDaftar, setShowDaftar] = useState(false);
  const [isiProgram,setIsiProgram] = useState("");
  const [mula,setMula] = useState("");
  const [nama,setNama] = useState("");
  const [penganjur,setPenganjur] = useState("");
  const [jumPeserta,setJumPeserta] = useState("");
  const [tamat,setTamat] = useState("");
  const navigate = useNavigate();
  
  const handleShowDaftar = () => {
    setShowDaftar(true);
  };
  const handleCloseDaftar = () => {
    setShowDaftar(false);
  };

  let {programID} = useParams();

  useEffect(() => {
    const getProgram = async() =>{
      const docRef = doc(db,"Program",programID.toString());
      const data1 = await getDoc(docRef);
      setIsiProgram(data1.data().isiProgram);
      setMula(data1.data().mula);
      setNama(data1.data().nama);
      setPenganjur(data1.data().penganjur);
      setJumPeserta(data1.data().jumPeserta);
      setTamat(data1.data().tamat);
    }

    getProgram();
    
  },[]);

  const programDaftar = async () =>{
    const docRef = doc(db,"Program",programID);
    const data = await getDoc(docRef);
    const tempList = data.data().pesertaList;
    const tempNama = data.data().pesertaNama;
    const tempStatus = data.data().pesertaStatus;
    const tempTran = data.data().transactionId;
    var newList = tempList;
    var newNama = tempNama;
    var newStatus = tempStatus;
    var newTran = tempTran;
    const userID = localStorage.getItem("userID");
    const userNama = localStorage.getItem("userNama");
    const check = true;
    
    tempList.forEach((id) => {
      if (id == userID) {
        alert("Anda tidak dibenarkan untuk daftar semula program yang and telah mendaftar")
        check = false;
      }
    })
    if(check){
      newList.push(userID);
      newNama[userID] = userNama;
      newStatus[userID] = "-";
      newTran[userID] = "-";
      await updateDoc(docRef, {
        pesertaList: newList,
        pesertaNama: newNama,
        pesertaStatus: newStatus,
        transactionId: newTran,
      }).then(() => {
        alert("And telah berjaya mendaftar program ini!!");
        navigate(-1);
      })
    }
  }


  return (
    <div class="Detail">
      <div class="Detailheader">
        <NavLink to="/user/senarai-program-sedia-ada" class="Detailbackicon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
        </NavLink>
        <h1 class="titleDetail">{nama}</h1>
      </div>
      <div class="blue">
        <p>Informasi Program</p>
      </div>
      <div class="infoDetail">
        <div class="info1">
          <p>Nama Pengajur</p>
          <p>Tempoh</p>
          <p>Jumlah peserta</p>
          <p>Yuran</p>
        </div>
        <div class="info2">
          <p>:</p>
          <p>:</p>
          <p>:</p>
          <p>:</p>
        </div>
        <div class="info3">
          <p>{penganjur}</p>
          <p>{mula} - {tamat}</p>
          <p>{jumPeserta}</p>
          <p>Percuma</p>
        </div>
      </div>
      <div class="blue">
        <p>Sinopsis Program</p>
      </div>
      <div class="sinopsis">
        <p>
          {isiProgram}
        </p>
      </div>
      <div className="daftarcenter">
        <button onClick={handleShowDaftar} className="Daftarbutton">
          Daftar
        </button>
      </div>
      {showDaftar && (
        <div className="Detail-modal">
          <Modal isOpen={showDaftar} onClose={handleCloseDaftar}>
            <div className="confirmation-message ">
              <div className="headpopout">
                <p>Alert</p>
              </div>
              <button className="close" onClick={handleCloseDaftar}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-x-lg"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                </svg>
              </button>

              <div className="contentpopout">
                <p>
                  Tekan ya untuk sahkan perdaftaran kursus, tekan tidak untuk
                  batalkan perdaftaran kursus
                </p>
              </div>

              <div className="buttonrekod">
                <div className="comfirmya">
                  <button className="option" onClick={programDaftar}>Ya</button>
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
  );
}

export default SenaraiProgramSediaAda;
