import React, { useState, useEffect} from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import backicon from '../../img/arrow.png'
import '../PesertaSemak/pesertasemak.css'
import closeicon from '../../img/close.png'
import { Buttons, Sejarah } from '../../Component'
import { db } from '../../Backend/firebase/firebase-config'
import { query, collection, where, getDocs, doc, getDoc} from 'firebase/firestore'

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

const PesertaSemak = () => {
  const [isOpen,setIsOpen]= useState(false);
  const navigate = useNavigate();
  const [pesertaInfo, setPesertaInfo] = useState([]);
  const [pesertaPrograms, setPesertaPrograms] = useState([]);

  let { pesertaID } = useParams();
  
  useEffect(()=>{
    const getPesertaInfo = async () => {
      const pesertaRef = doc(db, "User", pesertaID)
      const data = await getDoc(pesertaRef);
      setPesertaInfo(data.data());
    }
    const getPesertaProgram = async () => {
      const progRef = query(collection(db, "Program"), where("pesertaList", "array-contains", pesertaID));
      const data = await getDocs(progRef);
      setPesertaPrograms(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));//read 3
      
    }
    getPesertaProgram();
    getPesertaInfo();
    //getPesertaProgram();
    console.log(pesertaInfo);
    console.log(pesertaPrograms);
  },[])
  
  return (
    <div className='app_box'>
      <div className='semakdaftarheader'>
      <button className='backbutton' onClick={()=>navigate(-1)}><img src={backicon} alt='This is a back button.' className="backicon"/></button>
      <h1 className='semakdaftaradmin'>{pesertaInfo.nama}</h1>
      <div className='smallback'><NavLink to="/admin/home">LAMAN UTAMA</NavLink>/PESERTA</div>
      </div>
      <div className='informasibox'>
        <div className='informasiprogramtitle'>
          INFORMASI PESERTA
        </div>
        <div className='programtitle'>
        <div className='informasiprogram'>
          <label>No Tel Pejabat</label>
          <p>:</p>
            <p className='informasicontent'>{pesertaInfo.telefonPejabat}</p>
        </div>
        <div className='informasiprogram'>
          <label>Alamat Emel Peribadi</label>
          <p>:</p>
            <p className='informasicontent'>{pesertaInfo.emelPeribadi}</p>
        </div>
        <div className='informasiprogram'>
          <label>No. MyKad</label>
          <p>:</p>
            <p className='informasicontent'>{pesertaInfo.ic}</p>
        </div>
        </div>
        </div>
    <div className='subtitle'>SENARAI PROGRAM</div>
    <div className='program'>
      <table className='progtable'>
        <thead>
            <tr>
              <th className='tarikhmula'>Tarikh</th>
              <th className='tarikhtamat'>Program Nama</th>
              <th className='kehadiran'>Kehadiran</th>
              <th className='statussijil'>Status</th>
              <th className='sijilaktiviti'>Sijil</th>
            </tr>
        </thead>
        <tbody>
          {pesertaPrograms.map((items)=>(
            <tr className='row1'>
              <td>{items.mula} - {items.tamat}</td>
              <td>{items.nama}</td>
              <td>80%</td>
              <td>
                {/* <Sejarah title="Dicipta"/> */}
                {items.pesertaStatus[pesertaID]}
              </td>
              <td className='sijill'>
                <NavLink to='/admin/cipta-sijil-peserta' className="aktivititype">Cipta</NavLink>
                <NavLink to='/admin/edit-sijil-peserta' className="aktivititype">Kemaskini</NavLink>
                <NavLink to='/admin/semak-sijil-peserta' className="aktivititype">Semak</NavLink>
                <button className="padambutton" onClick={()=>setIsOpen(true)}>Padam</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {isOpen && (
        <div className='semaksijil'>
           <div className='contentdeletesijil'>
            <div className='semaksijilbox'>
              <div className='sejarahheader'>
              <h2 className='sejarahtitle'>Padam</h2>
              <button className='closebutton' onClick={() => setIsOpen(false)}>
                <img src={closeicon} alt="This is a close icon." className='closeicon'/></button>
              </div>
              <div className='contentdelete'>
              <div><p>
                  Please be careful! Your action cannot be undo after you clicked the <b>'Padam'</b> button
                </p></div>
                <div className='padamconfirmbutton'><Buttons title="Padam"/></div>
              </div>
            </div>
            </div>
        </div>
        )}
    </div>
  )
}

export default PesertaSemak
