import {React, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Worker, Viewer} from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import './InformasiSijil.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import backicon from '../../img/arrow.png';
import { Certificate } from '../../Utils/utils.jsx';
import { PDFViewer } from '@react-pdf/renderer';
import templateSrc from '../../Certificate.png';
import qrCodeImage from '../../intan.png'

function InformasiSijil(){
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);
    

    useEffect(() => {
        async function fetchData() {
            const data = await fetchformDataFromDatabase();
            setFormData(data);
        }
        fetchData();
    }, []);


    async function fetchformDataFromDatabase() {
        const data = {
            participantName: 'PESERTA NAMA',
            participantMykad: 'PESERTA NO. MYKAD',
            courseName: 'NAMA KURSUS',
            courseDate: 'TARIKH KURSUS',
            algorandExplorer: 'ALGORAND EXPLORER'
        };

        return data;
    }

    if (!formData) return <div>Loading...</div>;
 
    return(
        <>
             <div className='infoSijil-container'>
                <div className='infoSection'>
                    <div className="infoSijil-title">
                        <button className='backbtn' onClick={() => navigate(-1)}><img src={backicon} alt='This is a back button.' className="backicon" /></button>
                        <h1>Informasi Sijil</h1>
                    </div>
                    {/* Sijil detail section */}
                    <div className="infoContent">
                        <div className='info'><span className='label'>NAMA</span><span>:</span><div className='data'>{formData.participantName}</div></div>
                        <div className='info'><span className='label'>NO. MYKAD</span><span>:</span><div className='data'>{formData.participantMykad}</div></div>
                        <div className='info'><span className='label'>NAMA KURSUS</span><span>:</span><div className='data'>{formData.courseName}</div></div>
                        <div className='info'><span className='label'>TARIKH</span><span>:</span><div className='data'>{formData.courseDate}</div></div>
                        <div className='info'><span className='label'>ALGORAND EXPLORER</span><span>:</span><div className='data'>{formData.algorandExplorer}</div></div>
                    </div>

                    {/* Display sijil pdf */}
                    <div className="viewPdf">
                        <PDFViewer width="100%" height="100%">
                            <Certificate {...formData} templateSrc={templateSrc} qrCodeImage={qrCodeImage} />
                        </PDFViewer>
                    </div>
                    
                </div>
            </div>
        </>
    )
};

export default InformasiSijil;