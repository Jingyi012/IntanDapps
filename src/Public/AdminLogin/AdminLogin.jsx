import {React, useState, useContext} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import './AdminLogin.css';
import MyAlgo from '@randlabs/myalgo-connect';
import {PeraWalletConnect} from "@perawallet/connect";
import AppContext, { AppContextProvider } from "../../Context/AppContext";
function AdminLogin(){
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
  const connectPeraAlgoWallet = async () =>{
    let account="";
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

  //restrict the input only number
  const onChangeMykad = (e) =>{
    const regex = /^[0-9\b]+$/;
    if(e.target.value === "" || regex.test(e.target.value)){
      setMykad(e.target.value);
    }
  }
  //after login, direct admin to admin home page (program list), set the role as ADMIN
  const adminLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify({role: "ADMIN"}));
    navigate("/admin/home");
    window.location.reload();
  }

    return(
      <>
        <div className='adminLoginPage'>
          <div className='adminLoginContainer'>
            <div className='titleAdminLogin'>
              <h1>Daftar Masuk</h1>
              <p>Sebagai Admin</p>
            </div>
            {/*Amin login form */}
            <form className='adminLoginForm' method="post"  action="/admin/home" onSubmit={adminLogin}>
              <label htmlFor='LoginMykad'>No. MyKad: 
                <input id='LoginMykad' name='LoginMykad' type='text' placeholder='No. MyKad' minLength='12' maxLength='12' onChange={onChangeMykad} value={mykad}/>
              </label>

              <button type="button" onClick={connectMyAlgoWallet}>Connect to MyAlgo Wallet</button>
              <button type="button" onClick={connectPeraAlgoWallet}>Connect to Pera Algo Wallet</button>
              {<text>{account}</text>}

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