import { React, useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './AdminLogin.css';
import MyAlgo from '@randlabs/myalgo-connect';
import { PeraWalletConnect } from "@perawallet/connect";
import AppContext, { AppContextProvider } from "../../Context/AppContext";
import { db } from '../../Backend/firebase/firebase-config'
import { getDoc, doc } from 'firebase/firestore'

function AdminLogin() {
  const navigate = useNavigate();
  const [mykad, setMykad] = useState("");
  const myAlgoWallet = new MyAlgo();
  const {
    account,
    setAccount,
  } = useContext(AppContext);

  const connectMyAlgoWallet = async () => {
    let account = "";
    try {
      await myAlgoWallet.connect().then(((value) => {
        console.log('account', value[0]);
        account = value[0].address;
        setAccount(value[0].address);
      }));

    } catch (err) {
      console.error('Error connecting to wallet:', err);
    }
    return account;
  }
  const connectPeraAlgoWallet = async () => {
    let account = "";
    const peraConnect = new PeraWalletConnect({
      shouldShowSignTxnToast: false
    });
    await peraConnect.connect()
      .then((value) => {
        setAccount(value);
        account = value;
        console.log('Connected with Pera Wallet. Account address:', value);
      })
      .catch((err) => {
        console.error('Error connecting with Pera Wallet:', err);
      });
    return account;
  }

  //after login, direct admin to admin home page (program list), set the role as ADMIN
  const adminLogin = async (e) => {
    e.preventDefault();
    const regex = /[0-9][0-9][0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9][0-9][0-9]/;
    if (!regex.test(mykad)) {
      alert('Sila masukan ic dengan format "123456-12-1234"');
      return;
    }
    const docRef = doc(db, "Admin", mykad);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      if (docSnap.data().acc == account) {
        localStorage.setItem("user", JSON.stringify({ role: "ADMIN" }));
        localStorage.setItem("databaseID", mykad);
        navigate("/admin/home");
        window.location.reload();
      } else {
        alert("Salah Wallet Account !, Sila Masukan Semula !");
      }

    } else {
      // docSnap.data() will be undefined in this case
      alert("Salah IC !, Sila Masukan Semula !");
    }

  }

  return (
    <>
      <div className='adminLoginPage'>
        <div className='adminLoginContainer'>
          <div className='titleAdminLogin'>
            <h1>Daftar Masuk</h1>
            <p>Sebagai Admin</p>
          </div>
          {/*Amin login form */}
          <form className='adminLoginForm' method="post" action="/admin/home" onSubmit={adminLogin}>
            <label htmlFor='LoginMykad'>No. MyKad:
              <input id='LoginMykad' name='LoginMykad' type='text' placeholder='No. MyKad' minLength='14' maxLength='14' onChange={(event) => {
                setMykad(event.target.value)
              }} />
            </label>

            <div>Sila log masuk dengan salah satu algorand wallet untuk dapatkan algorand akaun</div>
            <br></br>
            <button type="button" onClick={connectPeraAlgoWallet}>Connect to Pera Algo Wallet</button>
            <button type="button" onClick={connectMyAlgoWallet}>Connect to MyAlgo Wallet</button>
            <div>Your Login Account: </div>
            <div className='displayAcc'>
              <div>{account}</div>
            </div>
            <button type='Submit'>Daftar Masuk</button>

          </form>
          <div className='otherLinks'>
            <NavLink className='otherlink' to='/login'>Log masuk sebagai user</NavLink>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminLogin;