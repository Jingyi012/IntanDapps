import {React, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import './InformasiSijil.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import backicon from '../../img/arrow.png';

import { Certificate, getQrCodeDataUrl } from '../../Utils/utils';
import { PDFViewer, pdf } from '@react-pdf/renderer';
import templateSrc from '../../Certificate.png';
import { indexerClient } from '../../Constant/ALGOkey';
import ErrorBoundary from '../../Utils/ErrorBoundary';
import {isMobile} from 'react-device-detect';
import { Button } from '@mui/material';



function InformasiSijil(){
    const transId = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);
    const [qrCodeDataUrl, setQrCodeDataUrl] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    console.log(transId.transId);

    useEffect(() => {
        async function fetchData() {
            const data = await fetchformDataFromBlockchain();
            setFormData(data);

           
            }
        fetchData();
    }, []);
    

    async function fetchformDataFromBlockchain() {
        const info = await indexerClient.lookupTransactionByID(transId.transId);
        const data = await info.do().then(async (transInfo)=>{
            console.log(transInfo.transaction["application-transaction"]["application-args"][0]);
            const decoder = new TextDecoder();
            const dTajuk = window.atob(transInfo.transaction["application-transaction"]["application-args"][0]);
            const dMula = window.atob(transInfo.transaction["application-transaction"]["application-args"][1]);
            const dTamat = window.atob(transInfo.transaction["application-transaction"]["application-args"][2]);
            const dNama = window.atob(transInfo.transaction["application-transaction"]["application-args"][3]);
            const onComplete = transInfo.transaction["application-transaction"]["on-completion"];
            const tajuk = Object.values(JSON.parse(dTajuk))[0];
            const mula = Object.values(JSON.parse(dMula))[0];
            const tamat = Object.values(JSON.parse(dTamat))[0];
            const nama = Object.values(JSON.parse(dNama))[0];

            const data = {
                participantName: nama? nama : 'PESERTA NAMA',
                participantMykad: 'PESERTA NO. MYKAD',
                courseName: tajuk? tajuk:'NAMA KURSUS',
                courseDate: mula && tamat ? `${mula} - ${tamat}` : 'TARIKH KURSUS',
                algorandExplorer: `https://testnet.algoexplorer.io/tx/${transId.transId}`
            };

            const newQrCodeDataUrl = await getQrCodeDataUrl(`https://intan-dapps.azurewebsites.net/maklumat-penyemak/${transId.transId}`);
            setQrCodeDataUrl(newQrCodeDataUrl);

            const blob = await pdf(<Certificate {...data} templateSrc={templateSrc} qrCodeImage={newQrCodeDataUrl} />).toBlob();
            setFileUrl(URL.createObjectURL(blob));
            
        
            return data;
        });
 
        return data;
    }

    if (!formData) return <div>Loading...</div>;
 
    return(
        <>
             <div className='infoSijil-container'>
                <div className='infoSection'>
                    <div className="infoSijil-title">
                        <button className='backbtn' onClick={() => { 
                           sessionStorage.setItem("navigatingBack", "true");
                           navigate(-1);}}>
                                <img src={backicon} alt='This is a back button.' className="backicon" /></button>
                        <h1>Informasi Sijil</h1>
                    </div>
                    {/* Sijil detail section */}
                    <div className="infoContent">
                        <div className='info'><span className='label'>NAMA</span><span>:</span><div className='data'>{formData.participantName}</div></div>
                        <div className='info'><span className='label'>NO. MYKAD</span><span>:</span><div className='data'>{'----'}</div></div>
                        <div className='info'><span className='label'>NAMA KURSUS</span><span>:</span><div className='data'>{formData.courseName}</div></div>
                        <div className='info'><span className='label'>TARIKH</span><span>:</span><div className='data'>{formData.courseDate}</div></div>
                        <div className='info'><span className='label'>ALGORAND EXPLORER</span><span>:</span><a href={formData.algorandExplorer}  className='data'>Check In ALGO Explorer</a></div>
                    </div>

                    Display sijil pdf
                    <div className="viewPdf">
                        <ErrorBoundary>
                        {isMobile?
                        <>
                        <Button variant="contained" color="primary" href={fileUrl} target="_blank" rel="noreferrer">
                        Preview Sijil
                        </Button> 
                        </>
                        :<PDFViewer width="100%" height="100%" >
                            <Certificate {...formData} templateSrc={templateSrc} qrCodeImage={qrCodeDataUrl} />
                        </PDFViewer>}
                        </ErrorBoundary>
                    </div>
                    
                </div>
            </div>
        </>
    )
};

export default InformasiSijil;