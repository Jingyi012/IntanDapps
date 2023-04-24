import {React} from 'react';
import './SemakSijil.css'
import { useNavigate } from 'react-router-dom';

export default function SemakSijil(){
  const navigate = useNavigate();

  //navigate to informasi sijil page after submit
  const handleSubmit = (e) =>{
    e.preventDefault();
    navigate('/informasi-sijil');
  }
  
    return(
      <>
      <div className="semakSijilContainer">
        <h1 className='searchBar-title'>Semak Sijil</h1>
        
        {/* Search Bar */}
        <form className="searchBar" method="get" onSubmit={handleSubmit}>
          <input id="search-id" name="search-id" type="text" placeholder='Sijil Id'/>
          <button type='Submit' ><i className="bi bi-search"></i>Semak</button>
        </form>
        
      </div>
        
      </>  
    )
}