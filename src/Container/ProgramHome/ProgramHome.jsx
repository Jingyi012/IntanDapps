import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Program,Menuheader, Buttons } from '../../Component'
import '../ProgramHome/ProgramHome.css'
import filterpic from '../../img/filter.png'
import searchpic from '../../img/search.png'
import addicon from '../../img/add.png'
import closeicon from '../../img/close.png'

const ProgramHome = () => {
  const [isOpen,setIsOpen]= useState(false);
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
      <NavLink to='/admin/add-course'><button className='addbutton'><img src={addicon} alt="This is an add icon." className='addicon'/></button></NavLink>
      <div className='programsec'>
        <h1 className='title'>
            SENARAI PROGRAM
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
                    <input type="text" placeholder="Kod / Nama Kursus" className='searchtype'/>
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
              <th className='programkod'>Kod</th>
              <th className='programname'>Nama Kursus</th>
              <th className='tarikh'>Tarikh Mula</th>
              <th className='tarikh'>Tarikh Tamat</th>
              <th className='programaktiviti'>Aktiviti</th>
            </tr>
        </thead>
        <tbody>
          <tr className='row1'>
              <td>SECK0233</td>
              <td>s</td>
              <td className='tarikh'>12/04/2023</td>
              <td className='tarikh'>12/04/2023</td>
              <td className='aktivitioption'>
                <NavLink to='/admin/semak' className="aktivititype">Semak</NavLink>
                <NavLink to='/admin/edit-program' className="aktivititype">Edit</NavLink>
                <button className="padambutton" onClick={()=>setIsOpen(true)}>Padam</button>
              </td>
          </tr>
        </tbody>
      </table>
    </div>
    {isOpen && (
        <div className='semaksijil'>
           <div className='contentdeletesijil'>
            <div className='semaksijilbox'>
              <div className='sejarahheader'>
              <h2 className='sejarahtitle'>Padam</h2>
              <button className='closebutton' onClick={() => setIsOpen(false)}><img src={closeicon} alt="This is a close icon." className='closeicon'/></button>
              </div>
              <div className='contentdelete'>
              <div><p>
                  Please be careful! Your action cannot be undo after you clicked the <b>'Padam'</b> button
                </p></div>
                <div className='padamconfirmbutton'><Buttons title="Padam"/></div>
              </div>
            </div>
            </div>
        </div>
        )}
    </div>
  )
}

export default ProgramHome
