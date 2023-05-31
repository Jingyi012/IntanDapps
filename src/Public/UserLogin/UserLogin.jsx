import { React, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { db } from '../../Backend/firebase/firebase-config'
import { getDoc, doc } from 'firebase/firestore'
import './UserLogin.css';

function UserLogin() {
  const navigate = useNavigate();
  const [mykad, setMykad] = useState("");
  const [password, setPassword] = useState("");

  //after login, direct user to user home page (program list), set the role as USER
  const userLogin = async (e) => {
    e.preventDefault();
    const regex = /[0-9][0-9][0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9][0-9][0-9]/;
    if (!regex.test(mykad)) {
      alert('Sila masukan ic dengan format "123456-12-1234"');
      return;
    }

    //checking whether the user input ic document data is exist or not
    const docRef = doc(db, "User", mykad);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && password == docSnap.data().kataLaluan) {
      sessionStorage.setItem("user", JSON.stringify({ role: "USER" }));
      sessionStorage.setItem("userID", mykad);
      sessionStorage.setItem("userNama", docSnap.data().nama);
      navigate("/user/senarai-program-sedia-ada");
    } else {
      // docSnap.data() will be undefined in this case
      alert("Salah IC atau Kata Laluan!, Sila Masukan Semula !");
    }


  }

  return (
    <>
      <div className='loginPage'>
        <div className='loginContainer'>
          <div className='titleLogin'>
            <h1>Daftar Masuk</h1>
            <p>Sebagai User</p>
          </div>
          {/*User login form */}
          <form className='loginForm' action="senarai-program-sedia-ada" onSubmit={userLogin}>
            <label htmlFor='LoginMyKad'>No. MyKad:
              <input id='LoginMyKad' name='LoginMyKad' type='text' placeholder='No. MyKad' minLength='14' maxLength='14' onChange={(event) => {
                setMykad(event.target.value)
              }} />
            </label>
            <br></br>
            <label htmlFor='LoginMyKad'>Password:
              <input id='LoginMyKad' name='LoginMyKad' type='password' placeholder='Password' onChange={(event) => {
                setPassword(event.target.value)
              }} />
            </label>
            <button className='login' type='Submit'>Masuk</button>
          </form>
          <div className='otherLinks'>
            <NavLink className='otherlink' to='/register'>Tidak mempunyai akaun? Daftar akaun</NavLink>
            <NavLink className='otherlink' to='/admin-login'>Log masuk sebagai Admin</NavLink>
          </div>

        </div>
      </div>
    </>
  )
}

export default UserLogin;