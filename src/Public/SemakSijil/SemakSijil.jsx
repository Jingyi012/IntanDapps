import { React, useEffect, useState } from 'react';
import './SemakSijil.css';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../Backend/firebase/firebase-config';
import { getDoc, doc } from 'firebase/firestore';

export default function SemakSijil() {
  const navigate = useNavigate();
  const params = useParams();
  const [appId, setappId] = useState(params.appId || '');
  const [txnId, setTxnInfo] = useState(params.transId ||'');
  
  useEffect(() => {
    console.log(sessionStorage.getItem("navigatingBack"));
    if (txnId && sessionStorage.getItem("navigatingBack") !== "true") {
      navigate(`/informasi-sijil/${txnId}`);
    }
    // Reset the sessionStorage flag when the component is unmounted
    return () => {
      sessionStorage.removeItem("navigatingBack");
    };
  }, []);
  
  //navigate to informasi sijil page after submit
  const handleSubmit = (transId) => {
    console.log(transId);
    console.log(appId);
    navigate(`/informasi-sijil/${transId}`);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    try {
      //get the latest transaction id from the firestore database using app id
      console.log(appId);
      const sijilRef = doc(db, "Sijil", appId);
      const docSnap = await getDoc(sijilRef);
      const transId = docSnap.data().txnId;
      const status = docSnap.data().action;
      setTxnInfo(transId);
      console.log(status);
      if(status !== 'Delete')
        handleSubmit(transId);
      else
        navigate(`/errorPage/${appId}`);

    } catch (error) {
      console.error("Error retrieving data:", error);
      // Handle the error appropriately, e.g., display an error message
    }
  };
  return (
    <>
      <div className="semakSijilContainer">
        <h1 className="searchBar-title">Semak Sijil</h1>

        {/* Search Bar */}
        <form className="searchBar" method="get" onSubmit={handleFormSubmit}>
          <input
            id="search-id"
            name="search-id"
            type="text"
            placeholder="Sijil App Id"
            value={appId}
            onChange={(e) => {
            setappId(e.target.value);
            }}
          />
          <button type="Submit">
            <i className="bi bi-search"></i>Semak
          </button>
        </form>
      </div>
    </>
  );
}
