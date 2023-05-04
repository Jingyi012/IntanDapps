import { React, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Penyemak.css';
import { collection, addDoc} from 'firebase/firestore'
import { db } from '../../Backend/firebase/firebase-config'

export default function Penyemak() {
  const [mykad, setMykad] = useState("");
  const [nama, setNama] = useState("");
  const [organisasi, setOrganisasi] = useState("");
  const navigate = useNavigate();
  const { transId } = useParams();
  //restrict input only number

  //navigate to semak sijil page after submit the penyemak details
  const handleSubmit = async (e) => {
    e.preventDefault();
    const regex = /[0-9][0-9][0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9][0-9][0-9]/;
    if (!regex.test(mykad)) {
      alert('Sila masukan ic dengan format "123456-12-1234"');
      return;
    }
    const userCollectionRef = collection(db, "Penyemak")//crud 1,collection(reference, collectionName)
    await addDoc(userCollectionRef, {// create 2
      ic: mykad,
      nama: nama,
      organisasi: organisasi,
    });//create 2 end

    if (transId === undefined) {
      navigate(`/semaksijil`);
      return;
    }
    
    navigate(`/semaksijil/${transId}`);
  }

  return (
    <>
      <div className='penyemakPage'>
        <div className='penyemakContainer'>
          <div className='titlePenyemak'>
            <h1>Maklumat Penyemak</h1>
          </div>
          {/*penyemak information form  method need change later*/}
          <form className='maklumatPenyemak' method='get' onSubmit={handleSubmit}>

            <label htmlFor='namaPenyemak'>Nama:
              <input id='namaPenyemak' name='namaPenyemak' type='text' placeholder='Nama' onChange={(event) => {
                setNama(event.target.value)
              }}
              />
            </label>

            <label htmlFor='myKadPenyemak'>No. MyKad:
              <input id='myKadPenyemak' name='myKadPenyemak' type='text' placeholder='No. MyKad' minLength='14' maxLength='14' onChange={(event) => {
                setMykad(event.target.value)
              }} />
            </label>

            <label htmlFor='organisasiPenyemak'>Nama Organisasi:
              <input id='organisasiPenyemak' name='organisasiPenyemak' type='text' placeholder='Organisasi' onChange={(event) => {
                setNama(event.target.value)
              }} />
            </label>

            <button type='Submit'>Masuk</button>

          </form>
        </div>
      </div>
    </>
  )
}