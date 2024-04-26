import React, { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import backicon from "../../img/arrow.png";
import "../Semak/semak.css";
import closeicon from "../../img/close.png";
import { Buttons } from "../../Component";
import AppContext from "../../Context/AppContext";
import { deleteProductAction } from "../../Utils/utils";
import { db } from "../../Backend/firebase/firebase-config";
import {
  collection,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { indexerClient } from "../../Constant/ALGOkey";
import {
  checkTransactionAndFetchData,
  readCertificate,
  invalidateCertificate,
} from "../../Utils/ethUtils";
const Semak = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [alertDelete, setDeleteAlert] = useState(false);
  const navigate = useNavigate();
  const { account, setAccount } = useContext(AppContext);
  const [reload, setReload] = useState(0);
  const txnId = "OMC2FKODOV3N76MVJGTQWXCLUKNYDIMOTR245VKDFJR3ASYIW5FQ";
  const userCollectionRef = collection(db, "ActionLog");
  const [appId, setAppId] = useState("");
  const [mula, setMula] = useState("");
  const [nama, setNama] = useState("");
  const [loading, setLoading] = useState(false);
  const [penganjur, setPenganjur] = useState("");
  const [maksimumPeserta, setMaksimumPeserta] = useState("");
  const [jumlahPeserta, setJumlahPeserta] = useState("");
  const [tamat, setTamat] = useState("");
  const [pesertaNama, setPesertaNama] = useState([]);
  const [pesertaStatus, setPesertaStatus] = useState([]);
  const [yuran, setYuran] = useState("");

  //Delete the cert at firestore
  const deleteCert = async (deleteId, appId) => {
    //delete the sijil at sijil section in firebase
    const sijilDoc = doc(db, "Sijil", appId.toString());
    await deleteDoc(sijilDoc);
    //set the txnid at program section to delete transaction id
    //set the peserta of the person to dipadam
    const programDocRef = doc(db, "Program", programID);
    //get the program info and modify the info
    const data = await getDoc(programDocRef);
    const pesertaStatusList = data.data().pesertaStatus;
    const txnIdList = data.data().transactionId;
    pesertaStatusList[currentUser] = "dipadam";
    txnIdList[currentUser] = deleteId;

    const adminName = sessionStorage.getItem("adminName");
    const adminID = sessionStorage.getItem("userID");

    //update the new program info
    await updateDoc(programDocRef, {
      transactionId: txnIdList,
      pesertaStatus: pesertaStatusList,
    })
      .then(() => {
        alert("the cert was deleted");
      })
      .catch((error) => {
        console.error(error.message);
      });
    //add this action to the action log
    const actionRef = collection(db, "ActionLog");
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${padNumber(
      date.getMonth() + 1
    )}-${padNumber(date.getDate())} ${padNumber(date.getHours())}:${padNumber(
      date.getMinutes()
    )}:${padNumber(date.getSeconds())}`;
    await addDoc(actionRef, {
      admin: `${account[0]}`,
      adminName: adminName,
      adminID: adminID,
      date: `${formattedDate.toString()}`,
      transactionId: deleteId,
      type: "Delete",
    });
    setReload(reload + 1);
  };

  const padNumber = (num) => {
    return num.toString().padStart(2, "0");
  };

  const getUserTxn = async (user) => {
    //obtain the app id for the particular user cert in the program
    const programDocRef = doc(db, "Program", programID);
    const data = await getDoc(programDocRef); //read 2
    const userTxnId = data.data().transactionId[user];
    // console.log(userTxnId);
    return userTxnId;
  };
  const semakUser = async (user) => {
    const userTxnId = await getUserTxn(user);
    navigate(`/informasi-sijil/${userTxnId}`);
  };

  let { programID } = useParams();

  //get all the information of the program when entering into this page
  useEffect(() => {
    const getPeserta = async () => {
      //define the program info document path and get the document data
      const docRef = doc(db, "Program", programID.toString());
      const detail = await getDoc(docRef);
      setMula(detail.data().mula);
      setNama(detail.data().nama);
      setPenganjur(detail.data().penganjur);
      setMaksimumPeserta(detail.data().maksimumPeserta);
      setJumlahPeserta(detail.data().jumlahPeserta);
      setTamat(detail.data().tamat);
      setPesertaStatus(detail.data().pesertaStatus);
      setPesertaNama(detail.data().pesertaNama);
      setYuran(detail.data().yuran);
    };
    getPeserta();
  }, [reload]);

  return (
    <div className="app_box">
      <div className="semakdaftarheader">
        <button className="backbutton" onClick={() => navigate(-1)}>
          <img src={backicon} className="backicon" alt="It is a back icon." />
        </button>
        <h1 className="semakdaftaradmin">{nama}</h1>
        <div className="smallback">
          <NavLink to="/admin/home">LAMAN UTAMA</NavLink>/DATABASE
        </div>
      </div>
      {/* Program Information */}
      <div className="informasibox">
        <div className="informasiprogramtitle">INFORMASI PROGRAM</div>
        <div className="programtitle">
          <div className="informasiprogram">
            <label>Nama Penganjur</label>
            <p>:</p>
            <p className="informasicontent">{penganjur}</p>
          </div>
          <div className="informasiprogram">
            <label>Tempoh</label>
            <p>:</p>
            <p className="informasicontent">
              {mula} - {tamat}
            </p>
          </div>
          <div className="informasiprogram">
            <label>Tempoh</label>
            <p>:</p>
            <p className="informasicontent">{yuran}</p>
          </div>
          <div className="informasiprogram">
            <label>Maksimum Peserta</label>
            <p>:</p>
            <p className="informasicontent">{maksimumPeserta}</p>
          </div>
          <div className="informasiprogram">
            <label>Jumlah Peserta</label>
            <p>:</p>
            <p className="informasicontent">{jumlahPeserta}</p>
          </div>
        </div>
      </div>
      <div className="subtitle">SENARAI PESERTA</div>
      <div className="program">
        <table className="progtable">
          <thead>
            <tr>
              <th className="kehadiran">Index</th>
              <th className="nomykad">No. MyKad</th>
              <th className="pesertaname">Nama Peserta</th>
              <th className="kehadiran">Kehadiran</th>
              <th className="statussijil">Status</th>
              <th className="sijilaktiviti">Sijil</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(pesertaStatus).map(([key, value], index) => {
              return (
                <tr className="row2">
                  <td>{index}</td>
                  <td>{key}</td>
                  <td>{pesertaNama[key]}</td>
                  <td className="centerdata">80%</td>
                  <td className="centerdata">{`${value}`}</td>
                  {/* <td className='centerdata'><Sejarah title={`${value}`} /></td> */}
                  <td>
                    {`${value}` === "dicipta" ||
                    `${value}` === "dikemasKini" ? (
                      <button className="semakbutton" disabled={true}>
                        Cipta
                      </button>
                    ) : (
                      <NavLink
                        to={`/admin/cipta-sijil/${programID}/${key}`}
                        className="aktivititype"
                      >
                        Cipta
                      </NavLink>
                    )}

                    {`${value}` === "dipadam" || `${value}` === "-" ? (
                      <>
                        <button className="semakbutton" disabled={true}>
                          Kemaskini
                        </button>
                        <button className="semakbutton" disabled={true}>
                          Semak
                        </button>
                        <button className="semakbutton" disabled={true}>
                          Padam
                        </button>
                      </>
                    ) : (
                      <>
                        <NavLink
                          to={`/admin/edit-sijil/${programID}/${key}`}
                          className="aktivititype"
                        >
                          Kemaskini
                        </NavLink>
                        <button
                          className="semakbutton"
                          onClick={() => {
                            semakUser(key);
                          }}
                        >
                          Semak
                        </button>
                        <button
                          className="padambutton"
                          onClick={() => {
                            setCurrentUser(key);
                            setIsOpen(true);
                          }}
                        >
                          Padam
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* padam sijil peserta */}
      {isOpen && (
        <div className="semaksijil">
          <div className="contentdeletesijil">
            <div className="semaksijilbox">
              <div className="sejarahheader">
                <h2 className="sejarahtitle">Padam</h2>
                <button
                  className="closebutton"
                  onClick={() => {
                    setIsOpen(false);
                    setDeleteAlert(false);
                    setLoading(false);
                  }}
                >
                  <img
                    src={closeicon}
                    alt="This is a close icon."
                    className="closeicon"
                  />
                </button>
              </div>

              {!alertDelete ? (
                <div className="contentdelete">
                  <div>
                    <p>
                      Please be careful! Your action cannot be undo after you
                      clicked the <b>'Padam'</b> button
                    </p>
                  </div>
                  <div className="padamconfirmbutton">
                    {loading ? (
                      <div>
                        <center>
                          <div className="loading-spinner"></div>
                          <br></br>
                          <div>Kindly wait a momment...</div>
                          <br></br>
                          <div>
                            {" "}
                            This cert is erasing from blockchain and database
                            ...
                          </div>
                        </center>
                      </div>
                    ) : (
                      <Buttons
                        title="Padam"
                        onClick={async () => {
                          setLoading(true);
                          // console.log('account', account);
                          // console.log('crntUser', currentUser);
                          console.log("account: ", account);
                          const userTxnId = await getUserTxn(currentUser);
                          let deleteId;
                          let appId;
                          const info = await checkTransactionAndFetchData(
                            userTxnId
                          );
                          if (info.isEther) {
                            
                            const { contractAddress } = info;
                            appId = contractAddress;
                            deleteId = await invalidateCertificate(contractAddress);
                          } else {
                            //obtain the app id for the particular user cert in the program

                            // console.log("TxnID" , userTxnId);
                            const info = await indexerClient
                              .lookupTransactionByID(userTxnId)
                              .do();
                            appId = await info.transaction[
                              "application-transaction"
                            ]["application-id"];
                            // console.log('appID', appId);

                            //delete the cert at algorand blockchain
                            deleteId = await deleteProductAction(
                              appId,
                              account
                            );
                            // console.log(deleteId);
                          }

                          //delete the cert in firebase
                          deleteCert(deleteId, appId);

                          // const transId=payContract(deleteId);
                          setDeleteAlert(true);
                          // const transId=payContract(deleteId);
                          setDeleteAlert(true);
                        }}
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div className="contentdelete">
                  <div>
                    <p>
                      This cert was successfully deleted in the algorand
                      blockchain!!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Semak;
