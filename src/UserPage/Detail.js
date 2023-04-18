import React, { useState } from "react";
import "./styles/Detail.css";
import Modal from "./Modal";
import { NavLink } from "react-router-dom";

function SenaraiProgramSediaAda() {
  const [showDaftar, setShowDaftar] = useState(false);
  const handleShowDaftar = () => {
    setShowDaftar(true);
  };
  const handleCloseDaftar = () => {
    setShowDaftar(false);
  };
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
        <h1 class="titleDetail">Database</h1>
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
          <p>XXX XXX XXXXXX</p>
          <p>12/2/2023 - 12/4/2023</p>
          <p>30</p>
          <p>Percuma</p>
        </div>
      </div>
      <div class="blue">
        <p>Sinopsis Program</p>
      </div>
      <div class="sinopsis">
        <p>
          Menerangkan mengenai isu-isu yang dilaporkan dalam Laporan Ketua Audit
          Negara dan meningkatkan kesedaran para penjawat awam terhadap
          kepentingan mempunyai tahap integriti dan akauntabiliti yang tinggi
          dalam Perkhidmatan Awam. Di samping itu, kursus ini bakal berkongsi
          mengenai punca-punca berlakunya rasuah, salah guna kuasa dan
          ketidakpatuhan kepada peraturan kewangan awam yang berkuatkuasa serta
          kesan-kesan buruk kepada diri sendiri, keluarga dan masyarakat.
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
  );
}

export default SenaraiProgramSediaAda;
