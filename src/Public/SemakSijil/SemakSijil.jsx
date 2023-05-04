import { React, useEffect, useState, useRef } from 'react';
import './SemakSijil.css';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

export default function SemakSijil() {
  const navigate = useNavigate();
  const params = useParams();
  const [transId, setTransId] = useState(params.transId || '');
  
  
  useEffect(() => {
    console.log(sessionStorage.getItem("navigatingBack"));
    if (transId && sessionStorage.getItem("navigatingBack") !== "true") {
      navigate(`/informasi-sijil/${transId}`);
    }
    // Reset the sessionStorage flag when the component is unmounted
    return () => {
      sessionStorage.removeItem("navigatingBack");
    };
  }, []);
  


  //navigate to informasi sijil page after submit
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/informasi-sijil/${transId}`);
  };

  return (
    <>
      <div className="semakSijilContainer">
        <h1 className="searchBar-title">Semak Sijil</h1>

        {/* Search Bar */}
        <form className="searchBar" method="get" onSubmit={handleSubmit}>
          <input
            id="search-id"
            name="search-id"
            type="text"
            placeholder="Sijil Id"
            value={transId}
            onChange={(e) => setTransId(e.target.value)}
          />
          <button type="Submit">
            <i className="bi bi-search"></i>Semak
          </button>
        </form>
      </div>
    </>
  );
}
