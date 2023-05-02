import {React, useEffect, useState} from 'react';
import {useNavigate,useParams} from 'react-router-dom';
import {Worker, Viewer} from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import './InformasiSijil.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import backicon from '../../img/arrow.png';
import sijilExp from '../../SijilExample.pdf';
import { Certificate } from '../../Utils/utils';
import { PDFViewer } from '@react-pdf/renderer';
import templateSrc from '../../Certificate.png';
import qrCodeImage from '../../intan.png'
import { indexerClient } from '../../Constant/ALGOkey';

function InformasiSijil(){
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);
    const transId = useParams("");
    const [tajuk,setTajukSijil] = useState('');
    const [mula,setTarikhMula] = useState('');
    const [tamat,setTarikhTamat] = useState('');
    const [nama,setNama] = useState('');
    const [link,setLink] = useState('');
    const [courseAction, setCourseAction] = useState('');

    console.log(transId.transId);
    useEffect(() => {
        async function fetchData() {
            console.log("hello");
            const info = await indexerClient.lookupTransactionByID(transId.transId);
            await info.do().then((transInfo)=>{
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
              setTajukSijil(tajuk);
              setTarikhMula(mula);
              setTarikhTamat(tamat);
              setNama(nama);
              setCourseAction(onComplete);
              const data = {
                participantName: nama,
                participantMykad: 'PESERTA NO. MYKAD',
                courseName: tajuk,
                courseDate: `${mula}-${tamat}`,
                algorandExplorer: `https://testnet.algoexplorer.io/tx/${transId.transId}`
            };
            setFormData(data);
            })
        }
        fetchData();
    }, []);
 
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
                        <div className='info'><span className='label'>NAMA</span><span>:</span><div className='data'>{nama}</div></div>
                        <div className='info'><span className='label'>NO. MYKAD</span><span>:</span><div className='data'>{'----'}</div></div>
                        <div className='info'><span className='label'>NAMA KURSUS</span><span>:</span><div className='data'>{tajuk}</div></div>
                        <div className='info'><span className='label'>TARIKH</span><span>:</span><div className='data'>{mula}-{tamat}</div></div>
                        <div className='info'><span className='label'>ALGORAND EXPLORER</span><span>:</span><a href={`https://testnet.algoexplorer.io/tx/${transId.transId}`}  className='data'>{`https://testnet.algoexplorer.io/tx/${transId.transId}`}</a></div>
                    </div>

                    Display sijil pdf
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