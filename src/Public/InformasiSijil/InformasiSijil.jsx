import {React, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Worker, Viewer} from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import './InformasiSijil.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import backicon from '../../img/arrow.png';

function InformasiSijil(){
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const navigate = useNavigate();
 
    return(
        <>
            <div className='infoSijil-container'>
                <div className='infoSection'>
                    <div className="infoSijil-title">
                    <button className='backbtn' onClick={()=>navigate(-1)}><img src={backicon} alt='This is a back button.' className="backicon"/></button>
                    <h1>Informasi Sijil</h1>
                    </div>
                    <div className="infoContent">
                        <div className='info'><span className='label'>NAMA</span><span>:</span><div className='data'>PESERTA NAMA</div></div>
                        <div className='info'><span className='label'>NO. MYKAD</span><span>:</span><div className='data'>PESERTA NO. MYKAD</div></div>
                        <div className='info'><span className='label'>NAMA KURSUS</span><span>:</span><div className='data'>NAMA KURSUS</div></div>
                        <div className='info'><span className='label'>TARIKH</span><span>:</span><div className='data'>TARIKH KURSUS</div></div>
                        <div className='info'><span className='label'>ALGORAND EXPLORER</span><span>:</span><div className='data'>ALGORAND EXPLORER</div></div>
                    </div>
                    
                    {/* <div className="viewPdf">
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                            <Viewer fileUrl="" plugins={[defaultLayoutPluginInstance]}></Viewer>
                        </Worker>
                    </div> */}
                    
                </div>
            </div>
        </>
    )
};

export default InformasiSijil;