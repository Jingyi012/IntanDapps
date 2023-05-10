import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menuheader } from '../../Component'
import '../Peserta/peserta.css'
import filterpic from '../../img/filter.png'
import searchpic from '../../img/search.png'
import { db } from '../../Backend/firebase/firebase-config'
import { collection, getDocs, deleteDoc, doc, } from 'firebase/firestore'

const Peserta = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [searchValue, setSearchValue] = useState("");
  const [filteredValue, setFilteredValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [users, setUsers] = useState([]);

  const userCollectionRef = collection(db, "User")//crud 1,collection(reference, collectionName)

  useEffect(() => {
    const getUser = async () => {
      const data = await getDocs(userCollectionRef);//read 2
      console.log(data);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));//read 3
    }
    getUser().then(console.log(users));
  },[])

  const data=[{nomykad:"020923105888",name:"Tan Zeng Chai",aktiviti:"Semak"},
  {nomykad:"010230505450",name:"Tee Zeng Chai",aktiviti:"Semak"}
  ]


  const nomykadfilter = () => {
      const sorted = data.sort((a, b) => a.nomykad - b.nomykad);
      setSearchValue(sorted)}

  const namefilter = () => {
      const sorted = data.sort((a, b) => a.name.localeCompare(b.name));
      setSearchValue(sorted)}

    const handleSelectChange = (event) => {
      const selectedOption = event.target.options[event.target.selectedIndex];
      const displayValue = selectedOption.getAttribute('data-display-value');
      selectedOption.textContent = displayValue;
      
      if (selectedOption.value === "None"){
        selectedOption.value = "Susunan";
      }
      setSelectedValue(selectedOption.value);
      if (selectedOption.value === "No.MyKad"){nomykadfilter();}
      else if (selectedOption.value === "Nama"){namefilter();}
      else if (selectedOption.value === "Susunan"){setSearchValue(data)}


    };

    const handleSubmit = async () => {
      if (isSearching) {
        return;
      }
      setIsSearching(true);
      try{
        if(!isNaN(filteredValue)){
      const filtered = data.filter(item => item.nomykad.toString().startsWith(filteredValue));
      setSearchValue(filtered);
      }
      else{
    const filtered = data.filter(item => item.name.toLowerCase().includes(filteredValue.toLowerCase()));
    setSearchValue(filtered);
    }
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
        SENARAI PESERTA
        </h1>
        <div className='features'>
            <form className='filter'>
                <div className='filtericon'>
                    <img src={filterpic} alt='This is a filter icon.' className="filterpic"/>
                </div>
                <div className='dropdownbox'>
                <select value={selectedValue} className='dropdown' onChange={handleSelectChange}  >
                    <option value="Susunan" data-display-value="Susunan" hidden>Susunan</option>
                    <option value="None" data-display-value="None">None</option>
                    <option value="No.MyKad" data-display-value="No.MyKad">No.MyKad</option>
                    <option value="Nama" data-display-value="Nama">Nama</option>
                </select>
                </div>
            </form>
            <form className='search'>
                <div className='searchbox'>
                    <input value={filteredValue} type="text" placeholder="No. Mykad / Nama peserta" className='searchtype' onChange={e => setFilteredValue(e.target.value)}/>
                </div>
                <div className='filtericon'>
                    <button className="searchbutton" onClick={handleSubmit} disabled={isSearching}>
                        <img src={searchpic} alt='This is a search button.' className="searchpic" />
                    </button>
                </div>
            </form>
        </div>
    </div>
      <div className='program'>
      <table className='progtable'>
        <thead>
            <tr>
              <th className='nomykad'>No. MyKad</th>
              <th className='pesertaname'>Nama</th>
              <th className='pesertaaktiviti'>Aktiviti</th>
            </tr>
        </thead>
      {searchValue===""?(
        <tbody>
        {users.map((item,index)=>(
          <tr key={index} className={index % 2 === 0 ? "row2" : "row1"}>
            <td>{item.ic}</td>
            <td>{item.nama}</td>
            <td>
              <NavLink to={`/admin/peserta-semak/${item.ic}`} className='aktiviti'>Semak</NavLink>
            </td>
      </tr>
        ))}
        </tbody>
      ):(
        <tbody>
        {searchValue.map((item,index)=>(
          <tr key={index} className={index % 2 === 0 ? "row2" : "row1"}>
          <td>{item.nomykad}</td>
          <td>{item.name}</td>
          <td>
            <NavLink to='/admin/peserta-semak' className='aktiviti'>Semak</NavLink>
          </td>
      </tr>
        ))}
        </tbody>
      )}
      </table>
      </div>
    
    </div>
  )
}

export default Peserta
