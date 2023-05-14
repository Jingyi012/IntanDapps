import {React, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './InformasiSijil.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import backicon from '../../img/arrow.png';
import { Certificate, getQrCodeDataUrl } from '../../Utils/utils';
import { PDFViewer } from '@react-pdf/renderer';
import templateSrc from '../../Certificate.png';
import { indexerClient } from '../../Constant/ALGOkey';
import ErrorBoundary from '../../Utils/ErrorBoundary';


function InformasiSijil(){

    const transId = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);
    const [qrCodeDataUrl, setQrCodeDataUrl] = useState(null);

    //  fetch all the data from blockchain first when entering this page
    useEffect(() => {
        async function fetchData() {
            const data = await fetchformDataFromBlockchain();
            setFormData(data);
            }
        fetchData();
    }, []);
    

    async function fetchformDataFromBlockchain() {
        //  using indexerClient to look up the transaction details by validating with the provided transaction id
        const info = indexerClient.lookupTransactionByID(transId.transId);
        //  obtain all data from algorand blockchain and set them to a constant variable named data 
        const data = await info.do().then((transInfo)=>{
            console.log(transInfo.transaction["application-transaction"]["application-args"][0]);
            
            /*
                Assign all the transaction information into these variables
                transInfo.transaction["application-transaction"]["application-args"][0] = The first argument in the transaction which is set as title of the event when create
                transInfo.transaction["application-transaction"]["application-args"][1] = The first argument in the transaction which is set as tarikh mula of the event when create
                transInfo.transaction["application-transaction"]["application-args"][2] = The first argument in the transaction which is set as tarikh tamat of the event when create
                transInfo.transaction["application-transaction"]["application-args"][3] = The first argument in the transaction which is set as name of the participant when create
                transInfo.transaction["application-transaction"]["application-args"][4] = The first argument in the transaction which is set as ic of the participant when create
            */
            const dTajuk = window.atob(transInfo.transaction["application-transaction"]["application-args"][0]);
            const dMula = window.atob(transInfo.transaction["application-transaction"]["application-args"][1]);
            const dTamat = window.atob(transInfo.transaction["application-transaction"]["application-args"][2]);
            const dNama = window.atob(transInfo.transaction["application-transaction"]["application-args"][3]);
            const dNRIC = window.atob(transInfo.transaction["application-transaction"]["application-args"][4]);
            
            //  Convert all the bytes variables into string object and assign them to particular varibles based on their variable names 
            const tajuk = Object.values(JSON.parse(dTajuk))[0];
            const mula = Object.values(JSON.parse(dMula))[0];
            const tamat = Object.values(JSON.parse(dTamat))[0];
            const nama = Object.values(JSON.parse(dNama))[0];
            const mykad = Object.values(JSON.parse(dNRIC))[0];

            //  Assign all the data into a constant variable named data
            const data = {
                participantName: nama? nama : 'PESERTA NAMA',
                participantMykad: mykad? mykad : 'PESERTA NO. MYKAD',
                courseName: tajuk? tajuk:'NAMA KURSUS',
                courseDate: mula && tamat ? `${mula} - ${tamat}` : 'TARIKH KURSUS',
                algorandExplorer: `https://testnet.algoexplorer.io/tx/${transId.transId}`
            };
        
            return data;
        });

        /* 
            Get all the QR code image from the database and
            change the QRcode to become the URL of the transaction
        */
        const qrCodeImage = null;

            if (qrCodeImage) {
                //  Set the existing QR code image data URL
                setQrCodeDataUrl(qrCodeImage);
            } else {
                //  Generate a new QR code data URL
                const newQrCodeDataUrl = await getQrCodeDataUrl(`https://intan-dapps.azurewebsites.net/maklumat-penyemak/${transId.transId}`);
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
                        <button className='backbtn' onClick={() => { 
                           sessionStorage.setItem("navigatingBack", "true");
                           navigate(-1);}}>
                                <img src={backicon} alt='This is a back button.' className="backicon" /></button>
                        <h1>Informasi Sijil</h1>
                    </div>
                    {/* Sijil detail section */}
                    <div className="infoContent">
                        <div className='info'><span className='label'>NAMA</span><span>:</span><div className='data'>{formData.participantName}</div></div>
                        <div className='info'><span className='label'>NO. MYKAD</span><span>:</span><div className='data'>{formData.participantMykad}</div></div>
                        <div className='info'><span className='label'>NAMA KURSUS</span><span>:</span><div className='data'>{formData.courseName}</div></div>
                        <div className='info'><span className='label'>TARIKH</span><span>:</span><div className='data'>{formData.courseDate}</div></div>
                        <div className='info'><span className='label'>ALGORAND EXPLORER</span><span>:</span><a href={formData.algorandExplorer}  className='data' blank>Check In ALGO Explorer</a></div>
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