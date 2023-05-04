import React, { useState,useContext,useEffect } from 'react'
import { NavLink, redirect,useNavigate } from 'react-router-dom'
import { Menuheader, Buttons } from '../../Component'
import '../ProgramHome/ProgramHome.css'
import filterpic from '../../img/filter.png'
import searchpic from '../../img/search.png'
import addicon from '../../img/add.png'
import closeicon from '../../img/close.png'
import AppContext,{ AppContextProvider } from '../../Context/AppContext'
import { db } from '../../Backend/firebase/firebase-config'
import { collection, getDocs, deleteDoc, doc,} from 'firebase/firestore'

const ProgramHome = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [searchValue, setSearchValue] = useState("");
  const [filteredValue, setFilteredValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen,setIsOpen]= useState(false);
  const { account, setAccount } = useContext(AppContext);
  console.log(account);
  const data=[{kod:"SECJ2023",name:"Databse",tarikhMula:"12/05/2023",tarikhTamat:"14/05/2023"},
  {kod:"SECK2023",name:"OOP",tarikhMula:"11/05/2023",tarikhTamat:"12/05/2023"}
  ]
  const [programs,setPrograms] = useState([]);
  const [programID,setProgramID] = useState("");
  const [reload,setReload] = useState(0);

  const userCollectionRef = collection(db, "Program")//crud 1,collection(reference, collectionName)
  useEffect(() => {
    const getProgram = async () => {
      const data = await getDocs(userCollectionRef);//read 2
      console.log(data);
      setPrograms(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));//read 3
    }
    getProgram().then(console.log(programs));
  }, [reload])


  const kodfilter = () => {
      const sorted = data.sort((a, b) => a.kod.localeCompare(b.kod));
      setSearchValue(sorted)}

  const tmfilter = () => {
      const sorted = data.sort((a, b) => a.tarikhMula.localeCompare(b.tarikhMula));
      setSearchValue(sorted)}

    const ttfilter = () => {
        const sorted = data.sort((a, b) => a.tarikhTamat.localeCompare(b.tarikhTamat));
        setSearchValue(sorted)}

    const handleSelectChange = (event) => {
      const selectedOption = event.target.options[event.target.selectedIndex];
      const displayValue = selectedOption.getAttribute('data-display-value');
      selectedOption.textContent = displayValue;
      
      if (selectedOption.value === "None"){
        selectedOption.value = "Susunan";
      }
      setSelectedValue(selectedOption.value);
      if (selectedOption.value === "KodKursus"){kodfilter();}
      else if (selectedOption.value === "TarikhMula"){tmfilter();}
      else if (selectedOption.value === "TarikhTamat"){ttfilter();}
      else if (selectedOption.value === "Susunan"){setSearchValue(data)}


    };

    const handleSubmit = async () => {
      if (isSearching) {
        return;
      }
      setIsSearching(true);
      try{
        if(!isNaN(filteredValue)){
      const filtered = data.filter(item => item.kod.toString().startsWith(filteredValue));
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

    const popOut = (e,id) =>{
      setProgramID(id);
      setIsOpen(true);
    }

    const deleteProg = async () => {
      const docRef = doc(db,"Program",programID)
      await deleteDoc(docRef).then(()=>{
        setIsOpen(false);
        alert("Program Deleted");
        setReload(reload+1);
      });
    };
  
  return (
    
    <div className='app_box'>
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
                    <input value={filteredValue} type="text" placeholder="Kod / Nama Kursus" className='searchtype' onChange={e => setFilteredValue(e.target.value)}/>
                </div>
                <div className='filtericon'>
                    <button className="searchbutton" onClick={handleSubmit} disabled={isSearching}>
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
        {searchValue===""?(
        <tbody>
        {programs.map((item,index)=>(
          <tr key={index} className={index % 2 === 0 ? "row2" : "row1"}>
            <td>{item.kod}</td>
            <td>{item.nama}</td>
            <td className='centerdata'>{item.mula}</td>
            <td className='centerdata'>{item.tamat}</td>
            <td>
                <NavLink to={`/admin/semak/${item.id}`} className="aktivititype">Semak</NavLink>
                <NavLink to={`/admin/edit-program/${item.id}`} className="aktivititype">Edit</NavLink>
                <button className="padambutton" onClick={(event)=>popOut(event,item.id)}>Padam</button>
            </td>
      </tr>
        ))}
        </tbody>
      ):(
        <tbody>
        {searchValue.map((item,index)=>(
          <tr key={index} className={index % 2 === 0 ? "row2" : "row1"}>
          <td>{item.kod}</td>
          <td>{item.name}</td>
          <td className='centerdata'>{item.tarikhMula}</td>
          <td className='centerdata'>{item.tarikhTamat}</td>
          <td>
              <NavLink to='/admin/semak' className="aktivititype">Semak</NavLink>
              <NavLink to='/admin/edit-program' className="aktivititype">Edit</NavLink>
              <button className="padambutton" onClick={()=>setIsOpen(true)}>Padam</button>
          </td>
      </tr>
        ))}
        </tbody>
      )}
               
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
                <div className='padamconfirmbutton'><Buttons title="Padam" onClick={() => deleteProg()}/></div>
              </div>
            </div>
            </div>
        </div>
        )}
    </div>
  )
}

export default ProgramHome
