import React, { useState,useContext,useEffect} from 'react';
import {useNavigate, useParams } from "react-router-dom";
import AppContext ,{ AppContextProvider } from '../../Context/AppContext';
import { indexerClient } from '../../Constant/ALGOkey';
const DisplaySijil = () =>{

    const transId = useParams();
    const [tajuk,setTajukSijil] = useState('');
    const [mula,setTarikhMula] = useState('');
    const [tamat,setTarikhTamat] = useState('');
    const [nama,setNama] = useState('');
    const [courseAction, setCourseAction] = useState('');

    //const algodClient = new algosdk.Algodv2('QZ584lQ7DF7U2somENFzV7GwLGNbiNdB82oPh7j3', 'https://node.testnet.algoexplorerapi.io', '');
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
        });
      
      }
      fetchData();
  }, []);


    return (<div>
    <h1>Confirmation Page</h1>
    <div>
      <label htmlFor="courseInfo">Sijil Information:</label>
      <br></br>
      <p>Tajuk Sijil: </p><div>{tajuk.replaceAll('"','')}</div>
      <p>Tarikh Mula: {mula.replaceAll('"','')}</p>
      <p>Tarikh Tamat: {tamat.replaceAll('"','')}</p>
      <p>Nama: {nama.replaceAll('"','')}</p>
      <p>Course Action: {courseAction.replaceAll('"','')}</p>
    </div>
  </div>);
}
export default DisplaySijil;