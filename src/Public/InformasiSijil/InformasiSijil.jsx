import {React, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import './InformasiSijil.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import backicon from '../../img/arrow.png';
import { Certificate, getQrCodeDataUrl } from '../../Utils/utils';
import { PDFViewer } from '@react-pdf/renderer';
import templateSrc from '../../Certificate.png';
import qrCodeImage from '../../intan.png'
import { indexerClient } from '../../Constant/ALGOkey';
import ErrorBoundary from '../../Utils/ErrorBoundary';


function InformasiSijil(){
    const transId = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);
    const [qrCodeDataUrl, setQrCodeDataUrl] = useState(null);

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
        const data = await info.do().then((transInfo)=>{
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
        
            return data;
        });

        // TODO: Get the QR code image from the database
        // TODO: change the QRcode to become the URL of the transaction
        const qrCodeImage = null;

            if (qrCodeImage) {
                // Set the existing QR code image data URL
                setQrCodeDataUrl(qrCodeImage);
            } else {
                // Generate a new QR code data URL
                const newQrCodeDataUrl = await getQrCodeDataUrl(JSON.stringify(data));
                setQrCodeDataUrl(newQrCodeDataUrl);
     }
       

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
                        <div className='info'><span className='label'>NO. MYKAD</span><span>:</span><div className='data'>{'----'}</div></div>
                        <div className='info'><span className='label'>NAMA KURSUS</span><span>:</span><div className='data'>{formData.courseName}</div></div>
                        <div className='info'><span className='label'>TARIKH</span><span>:</span><div className='data'>{formData.courseDate}</div></div>
                        <div className='info'><span className='label'>ALGORAND EXPLORER</span><span>:</span><a href={formData.algorandExplorer}  className='data'>{formData.algorandExplorer}</a></div>
                    </div>

                    Display sijil pdf
                    <div className="viewPdf">
                        <ErrorBoundary>
                        <PDFViewer width="100%" height="100%">
                            <Certificate {...formData} templateSrc={templateSrc} qrCodeImage={qrCodeDataUrl} />
                        </PDFViewer>
                        </ErrorBoundary>
                    </div>
                    
                </div>
            </div>
        </>
    )
};

export default InformasiSijil;