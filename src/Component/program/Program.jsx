import React, { useEffect, useState } from 'react'
import dropdown from '../../img/dropdown-2.png'
import filterpic from '../../img/filter.png'
import searchpic from '../../img/search.png'
import '../program/program.css'

const Program = ({bigtitle,searching}) => {
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
    <div className='section'>
    <div className='programsec'>
        <h1 className='title'>
            {bigtitle}
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
                    <option value="KodKursus" label="Kod Kursus" data-display-value="Kod Kursus">Kod Kursus</option>
                    <option value="TarikhMula" label="Tarikh Mula" data-display-value="Tarikh Mula">Tarikh Mula</option>
                    <option value="TarikhTamat" label="Tarikh Tamat" data-display-value="Tarikh Tamat">Tarikh Tamat</option>
                </select>
                </div>
            </form>
            <form className='search'>
                <div className='searchbox'>
                    <input type="text" placeholder={searching} className='searchtype'/>
                </div>
                <div className='filtericon'>
                    <button type="button" className="searchbutton">
                        <img src={searchpic} alt='This is a search button.' type="submit" className="searchpic"/>
                    </button>
                </div>
            </form>
        </div>
    </div>
    </div>
  )
}

export default Program
