import React, { useState, useEffect } from 'react'
import { Menuheader } from '../../Component'
import filterpic from '../../img/filter.png'
import searchpic from '../../img/search.png'
import '../AdminList/adminList.css'
import { db } from '../../Backend/firebase/firebase-config'
import { collection, getDocs, orderBy, query, doc, deleteDoc} from 'firebase/firestore'

const AdminList = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [searchValue, setSearchValue] = useState([]);
  const [filteredValue, setFilteredValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [adminList, setAdminList] = useState([])
  const [reload,setReload] = useState(0);

  //document path of the ActionLog collection
  const userCollectionRef = collection(db, "Admin")

  useEffect(() => {
    const getAdminList = async () => {
      //get all the document data in the ActionLog collection
      const data = await getDocs(userCollectionRef);
      console.log(data);
      setAdminList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    getAdminList().then(console.log(adminList));
  }, [reload])


  // sort by using tarikh
  const tarikhfilter = () => {
    const sorted = adminList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setSearchValue(sorted)
  }

  // sort by using name
  const namefilter = () => {
    console.log(adminList);
    const sorted = adminList.sort((a, b) => new String(a.name).localeCompare(new String(b.name)));
    setSearchValue(sorted)
  }

  const handleSelectChange = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const displayValue = selectedOption.getAttribute('data-display-value');
    selectedOption.textContent = displayValue;
    // By default the display value should be Susunan to indicate this is for the susunan filter function
    // There don't have any "Susunan" in the list instead of "None" to indicate that they are filtering nothing
    if (selectedOption.value === "None") {
      selectedOption.value = "Susunan";
    }
    setSelectedValue(selectedOption.value);
    if (selectedOption.value === "Tarikh&Masa") { tarikhfilter(); }
    else if (selectedOption.value === "NamaAdmin") { namefilter(); }
    else if (selectedOption.value === "Susunan") { setSearchValue(adminList) }


  };

  const handleSubmit = async () => {
    if (isSearching) {
      return;
    }
    setIsSearching(true);
    //    try {
    // Search by using the value that they input
    const filtered = adminList.filter(obj =>
      Object.values(obj).some(value =>
        new String(value).toLowerCase().includes(new String(filteredValue.toLowerCase())) || new String(value).toLowerCase() === new String(filteredValue.toLowerCase())
      )
    );
    // const filtered = adminList.find((item) => new String(item.name).toLowerCase().includes(new String(filteredValue.toLowerCase())));
    console.log(filtered);
    setSearchValue(filtered);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // }
    // catch (error) {
    //   alert('Search failed:', error);
    //   console.error('Search failed:', error);
    // } finally {
    //   // Set the isSearching flag back to false to indicate search is completed
    setIsSearching(false);
    // }
  }

  const onClickPadam = (id) =>{
    if(window.confirm("Adakah anda ingin mamadamkan akaun admin ini?")){
      deleteAccount(id);
    }else{
      return;
    }
  }

  const deleteAccount = async (id) =>{
    const accRef = doc(db, "Admin", id.toString());
    await deleteDoc(accRef).then(()=>{
      alert("Akaun Admin telah dipadam!!");
      setReload(reload+1);
    });
  }

  return (
    <div className='app_box'>
      <Menuheader />
      <div className='programsec'>
        <h1 className='title'>
          Senarai Admin
        </h1>
        <div className='features'>
          {/* Sorting */}
          {/* <form className='filter'>
            <div className='filtericon'>
              <img src={filterpic} alt='This is a filter icon.' className="filterpic" />
            </div>
            <div className='dropdownbox'>
              <select value={selectedValue} className='dropdown' onChange={handleSelectChange} >
                <option value="Susunan" data-display-value="Susunan" hidden>Susunan</option>
                <option value="None" data-display-value="None">None</option>
                <option value="Tarikh&Masa" data-display-value="Tarikh & Masa">Tarikh & Masa</option>
                <option value="NamaAdmin" data-display-value="Nama Admin">Nama Admin</option>
              </select>
            </div>
          </form> */}
          <form className='search'>
            <div className='searchbox'>
              <input value={filteredValue} type="text" placeholder="Nama Admin" className='searchtype' onChange={(e) => { setFilteredValue(e.target.value);handleSubmit() } } />
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
              <th className='tarikhmasa'>Index</th>
              <th className='namaadmin'>Nama Admin</th>
              <th className='namaadmin'>ID Admin</th>
              <th className='jenisTindakan'>Wallet Address</th>
              <th className='tranid'>Padam Account</th>
            </tr>
          </thead>
          {filteredValue == "" ? (
            <tbody>
              {adminList.map((admin, index) => {
                return (
                  <tr key={index} className={index % 2 === 0 ? "row2" : "row1"}>
                    <td>{index+1}</td>
                    <td>{admin.name}</td>
                    <td>{admin.id}</td>
                    <td>{admin.acc}</td>
                    <td><button onClick={(e) => onClickPadam(admin.id)}>Padam</button></td>
                  </tr>
                )
              })}
            </tbody>) : (
            <tbody>
              {searchValue.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? "row2" : "row1"}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.id}</td>
                  <td>{item.acc}</td>
                  <td><button onClick={(e)=>onClickPadam(item.id)}>Padam</button></td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  )
}

export default AdminList
