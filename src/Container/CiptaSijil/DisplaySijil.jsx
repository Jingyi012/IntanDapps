import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppContext, { AppContextProvider } from "../../Context/AppContext";
import { indexerClient } from "../../Constant/ALGOkey";
import { checkTransactionAndFetchData } from "../../Utils/ethUtils";

const DisplaySijil = () => {
  const transId = useParams();
  const [tajuk, setTajukSijil] = useState("");
  const [mula, setTarikhMula] = useState("");
  const [tamat, setTarikhTamat] = useState("");
  const [nama, setNama] = useState("");
  const [courseAction, setCourseAction] = useState("");

  //console.log(transId.transId);
  useEffect(() => {
    async function fetchData() {
      let info;
      info = await checkTransactionAndFetchData(transId.transId);

      if (info) {
        console.log("Transaction found. Details:", info);

        const {
          courseTitle,
          recipientName,
          recipientIC,
          startDate,
          endDate,
          isValid,
        } = info;

        setTajukSijil(courseTitle);
        setTarikhMula(startDate);
        setTarikhTamat(endDate);
        setNama(recipientName);
        setCourseAction(isValid ? "Created" : "Invalidated");
      } else {
        //Using indexerClient here to query and search the transaction data in the blockchain using transaction id
        info = await indexerClient.lookupTransactionByID(transId.transId);
        //get additional header from the transaction by using do function here
        await info.do().then((transInfo) => {
          //console.log(transInfo.transaction["application-transaction"]["application-args"][0]);
          //from the transInfo variable, we can easily know the application args applied in the transaction
          //using window.atob here to decode the base 64 string fetching from the application arg
          const dTajuk = window.atob(
            transInfo.transaction["application-transaction"][
              "application-args"
            ][0]
          );
          const dMula = window.atob(
            transInfo.transaction["application-transaction"][
              "application-args"
            ][1]
          );
          const dTamat = window.atob(
            transInfo.transaction["application-transaction"][
              "application-args"
            ][2]
          );
          const dNama = window.atob(
            transInfo.transaction["application-transaction"][
              "application-args"
            ][3]
          );
          //to know whether the current transaction is created/updated/deleted, use onComplete data in the transaction
          const onComplete =
            transInfo.transaction["application-transaction"]["on-completion"];
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
        });
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Confirmation Page</h1>
      <div>
        <label htmlFor="courseInfo">Sijil Information:</label>
        <br></br>
        <p>Tajuk Sijil: </p>
        <div>{tajuk.replaceAll('"', "")}</div>
        <p>Tarikh Mula: {mula.replaceAll('"', "")}</p>
        <p>Tarikh Tamat: {tamat.replaceAll('"', "")}</p>
        <p>Nama: {nama.replaceAll('"', "")}</p>
        <p>Course Action: {courseAction.replaceAll('"', "")}</p>
      </div>
    </div>
  );
};
export default DisplaySijil;
