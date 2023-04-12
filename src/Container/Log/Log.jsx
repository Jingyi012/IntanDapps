import React, { useState } from 'react'
import { Program,Menuheader } from '../../Component'

import filterpic from '../../img/filter.png'
import searchpic from '../../img/search.png'
import '../Log/log.css'

const Log = () => {
  const [selectedValue, setSelectedValue] = useState('');
  
  const handleSelectChange = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const displayValue = selectedOption.getAttribute('data-display-value');
    selectedOption.textContent = displayValue;
    
    if (selectedOption.value === "None"){
      selectedOption.value = "Susunan";
    }
    setSelectedValue(selectedOption.value);
    
  };

  return (
    <div>
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
                    <input type="text" placeholder="Nama Admin" className='searchtype'/>
                </div>
                <div className='filtericon'>
                    <button type="button" className="searchbutton">
                        <img src={searchpic} alt='This is a search button.' type="submit" className="searchpic"/>
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
        <tbody>
          <tr className='row1'>
              <td>10 May 2023 04:00 PM</td>
              <td>Admin A</td>
              <td>sssssss</td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default Log
