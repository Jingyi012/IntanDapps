import {React, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Worker, Viewer} from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import './InformasiSijil.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import Sijil from '../../SijilExample.pdf';
import backicon from '../../img/arrow.png';

function InformasiSijil(){
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const navigate = useNavigate();
    const [sijil, setSijil] = useState(null);
    console.log(Sijil);
    {/* get sijil url from database
    useEffect(()=>{
    getDownloadURL(ref(storage, 'sijil.pdf')).then((url)=>{
      setSijil(url);
    })
  },[]) */}
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
                    
                    {/*View pdf*/}
                    <div className="viewPdf">
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                            <Viewer fileUrl="/static/media/SijilExample.77c24c37a27aaff01234.pdf" plugins={[defaultLayoutPluginInstance]}></Viewer>
                        </Worker>
                    </div>
                    
                </div>
            </div>
        </>
    )
};

export default InformasiSijil;