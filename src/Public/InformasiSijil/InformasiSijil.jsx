import {React, useEffect, useState} from 'react';
import {useNavigate,useParams} from 'react-router-dom';
import {Worker, Viewer} from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import './InformasiSijil.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import backicon from '../../img/arrow.png';
import sijilExp from '../../SijilExample.pdf';
import { db } from '../../Backend/firebase/firebase-config'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, connectFirestoreEmulator } from 'firebase/firestore'

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
              //Using indexerClient here to query and search the transaction data in the blockchain using transaction id
            const info = await indexerClient.lookupTransactionByID(transId.transId);
             //get additional header from the transaction by using do function here
            await info.do().then((transInfo)=>{
              console.log(transInfo.transaction["application-transaction"]["application-args"][0]);
            //from the transInfo variable, we can easily know the application args applied in the transaction
            //using window.atob here to decode the base 64 string fetching from the application arg
              const decoder = new TextDecoder();
              const dTajuk = window.atob(transInfo.transaction["application-transaction"]["application-args"][0]);
              const dMula = window.atob(transInfo.transaction["application-transaction"]["application-args"][1]);
              const dTamat = window.atob(transInfo.transaction["application-transaction"]["application-args"][2]);
              const dNama = window.atob(transInfo.transaction["application-transaction"]["application-args"][3]);
                //to know whether the current transaction is created/updated/deleted, use onComplete data in the transaction
              const onComplete = transInfo.transaction["application-transaction"]["on-completion"];
               //after decode the string, change it to a string format from JSON object 
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
                        
                        {/* <div className='info'><span className='label'>NAMA</span><span>:</span><div className='data'>{sijil[0].nama}</div></div>
                        <div className='info'><span className='label'>NO. MYKAD</span><span>:</span><div className='data'>{sijil[0].mykad}</div></div>
                        <div className='info'><span className='label'>NAMA KURSUS</span><span>:</span><div className='data'>{sijil[0].kursus}</div></div>
                        <div className='info'><span className='label'>TARIKH</span><span>:</span><div className='data'>{sijil[0].date}</div></div>
                        <div className='info'><span className='label'>ALGORAND EXPLORER</span><span>:</span><div className='data'>{sijil[0].algoLink}</div></div>
                     */}
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