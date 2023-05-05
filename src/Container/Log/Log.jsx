import React, { useState } from 'react'
import { Menuheader } from '../../Component'
import filterpic from '../../img/filter.png'
import searchpic from '../../img/search.png'
import '../Log/log.css'

const Log = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [searchValue, setSearchValue] = useState("");
  const [filteredValue, setFilteredValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const data=[{tarikh:"10 May 2023 04:00 PM",name:"Admin z",aktiviti:"Add the admin"},
  {tarikh:"20 May 2023 04:00 PM",name:"Admin C",aktiviti:"Delete the admin"}
  ]

  // sort by using tarikh
  const tarikhfilter = () => {
      const sorted = data.sort((a, b) => a.tarikh - b.tarikh);
      setSearchValue(sorted)}

  // sort by using name
  const namefilter = () => {
      const sorted = data.sort((a, b) => a.name.localeCompare(b.name));
      setSearchValue(sorted)}
    
    const handleSelectChange = (event) => {
      const selectedOption = event.target.options[event.target.selectedIndex];
      const displayValue = selectedOption.getAttribute('data-display-value');
      selectedOption.textContent = displayValue;
      
      // By default the display value should be Susunan to indicate this is for the susunan filter function
      // There don't have any "Susunan" in the list instead of "None" to indicate that they are filtering nothing
      if (selectedOption.value === "None"){
        selectedOption.value = "Susunan";
      }
      setSelectedValue(selectedOption.value);
      if (selectedOption.value === "Tarikh&Masa"){tarikhfilter();}
      else if (selectedOption.value === "NamaAdmin"){namefilter();}
      else if (selectedOption.value === "Susunan"){setSearchValue(data)}


    };

    const handleSubmit = async () => {
      if (isSearching) {
        return;
      }
      setIsSearching(true);
      try{
        // Search by using the value that they input
    const filtered = data.filter(item => item.name.toLowerCase().includes(filteredValue.toLowerCase()));
    setSearchValue(filtered);
      await new Promise((resolve) => setTimeout(resolve, 2000));}
      catch (error) {
        console.error('Search failed:', error);
      } finally {
        // Set the isSearching flag back to false to indicate search is completed
        setIsSearching(false);
      }
    }
  
  return (
    <div className='app_box'>
      <Menuheader/>
      <div className='programsec'>
        <h1 className='title'>
        LOG AKTIVITI
        </h1>
        <div className='features'>
            <form className='filter'>
                <div className='filtericon'>
                    <img src={filterpic} alt='This is a filter icon.' className="filterpic"/>
                </div>
                <div className='dropdownbox'>
                <select value={selectedValue} className='dropdown' onChange={handleSelectChange} >
                    <option value="Susunan" data-display-value="Susunan" hidden>Susunan</option>
                    <option value="None" data-display-value="None">None</option>
                    <option value="Tarikh&Masa" data-display-value="Tarikh & Masa">Tarikh & Masa</option>
                    <option value="NamaAdmin" data-display-value="Nama Admin">Nama Admin</option>
                </select>
                </div>
            </form>
            <form className='search'>
                <div className='searchbox'>
                    <input value={filteredValue} type="text" placeholder="Nama Admin" className='searchtype' onChange={e => setFilteredValue(e.target.value)}/>
                </div>
                <div className='filtericon'>
                    <button className="searchbutton" onClick={handleSubmit} disabled={isSearching}>
                        <img src={searchpic} alt='This is a search button.' className="searchpic"/>
                    </button>
                </div>
            </form>
        </div>
    </div>
      <div className='program'>
      <table className='progtable'>
        <thead>
            <tr>
              <th className='tarikhmasa'>Tarikh & Masa</th>
              <th className='namaadmin'>Nama Admin</th>
              <th className='colaktiviti'>Aktiviti</th>
            </tr>
        </thead>
      {searchValue===""?(
        <tbody>
        {data.map((item,index)=>(
          <tr key={index} className={index % 2 === 0 ? "row2" : "row1"}>
            <td>{item.tarikh}</td>
            <td>{item.name}</td>
            <td>{item.aktiviti}</td>
      </tr>
        ))}
        </tbody>):(
        <tbody>
        {searchValue.map((item,index)=>(
          <tr key={index} className={index % 2 === 0 ? "row2" : "row1"}>
          <td>{item.tarikh}</td>
          <td>{item.name}</td>
          <td>{item.aktiviti}</td>
      </tr>
        ))}
        </tbody>
    )}
      </table>
    </div>
    </div>
  )
}

export default Log
