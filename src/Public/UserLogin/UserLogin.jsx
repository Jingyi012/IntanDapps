import { React, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { db } from '../../Backend/firebase/firebase-config'
import { getDoc, doc } from 'firebase/firestore'
import './UserLogin.css';

function UserLogin() {
  const navigate = useNavigate();
  const [mykad, setMykad] = useState("");

  //restrict the input only number
  // const onChangeMykad = (e) => {
  //   const regex = /^[0-9\b]+$/;
  //   if (e.target.value === "" || regex.test(e.target.value)) {
  //     setMykad(e.target.value);
  //   }
  // }

  //after login, direct user to user home page (program list), set the role as USER
  const userLogin = async (e) => {
    e.preventDefault();
    const regex = /[0-9][0-9][0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9][0-9][0-9]/;
    if (!regex.test(mykad)) {
      alert('Sila masukan ic dengan format "123456-12-1234"');
      return;
    }
    // localStorage.setItem("user", JSON.stringify({ role: "USER" }));
    // navigate("/user/senarai-program-sedia-ada");
    const docRef = doc(db, "User", mykad);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      localStorage.setItem("user", JSON.stringify({ role: "USER" }));
      localStorage.setItem("userID",mykad);
      localStorage.setItem("userNama",docSnap.data().nama);
      navigate("/user/senarai-program-sedia-ada");
      } else {
      // docSnap.data() will be undefined in this case
      alert("Salah IC !, Sila Masukan Semula !");
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
            <button className='login' type='Submit'>Daftar Masuk</button>
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