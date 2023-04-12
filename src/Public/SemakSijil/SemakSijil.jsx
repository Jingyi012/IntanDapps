import {React, useState} from 'react';
import './SemakSijil.css'

export default function SemakSijil(){
  const [searchId, setSearchId] = useState("");
    return(
      <>
      <div className="semakSijilContainer">
        <h1 className='searchBar-title'>Semak Sijil</h1>
        {/* later need change */}
        <form className="searchBar" action="/informasi-sijil" method="get">
          <input id="search-id" name="search-id" type="text" placeholder='Sijil Id'/>
          <button type='Submit' ><i className="bi bi-search"></i>Semak</button>
        </form>
        
      </div>
        
      </>  
    )
}