import {React, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Worker, Viewer} from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import './InformasiSijil.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import backicon from '../../img/arrow.png';
import sijilExp from '../../SijilExample.pdf';
import { db } from '../../Backend/firebase/firebase-config'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, connectFirestoreEmulator } from 'firebase/firestore'


function InformasiSijil(){
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const navigate = useNavigate();

    const [sijil,setSijil] = useState([])
    const userCollectionRef = collection(db, "Sijil")//crud 1,collection(reference, collectionName)

    useEffect(() => {
        const getSijil = async () => {
          const data = await getDocs(userCollectionRef);//read 2
          console.log(data);
          setSijil(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));//read 3
        }
    
        getSijil();
      }, [])

    return(
        <>
            <div className='infoSijil-container'>
                <div className='infoSection'>
                    <div className="infoSijil-title">
                    <button className='backbtn' onClick={()=>navigate(-1)}><img src={backicon} alt='This is a back button.' className="backicon"/></button>
                    <h1>Informasi Sijil</h1>
                    </div>
                    {/* Sijil detail section */}
                    <div className="infoContent">
                        <div className='info'><span className='label'>NAMA</span><span>:</span><div className='data'>{sijil[0].nama}</div></div>
                        <div className='info'><span className='label'>NO. MYKAD</span><span>:</span><div className='data'>{sijil[0].mykad}</div></div>
                        <div className='info'><span className='label'>NAMA KURSUS</span><span>:</span><div className='data'>{sijil[0].kursus}</div></div>
                        <div className='info'><span className='label'>TARIKH</span><span>:</span><div className='data'>{sijil[0].date}</div></div>
                        <div className='info'><span className='label'>ALGORAND EXPLORER</span><span>:</span><div className='data'>{sijil[0].algoLink}</div></div>
                    </div>

                    {/* Display sijil pdf */}
                    <div className="viewPdf">
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                            <Viewer fileUrl={sijilExp} plugins={[defaultLayoutPluginInstance]}></Viewer>
                        </Worker>
                    </div> 
                    
                </div>
            </div>
        </>
    )
};

export default InformasiSijil;