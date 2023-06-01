import React, { useState, useEffect } from 'react';
import ErrorPage from './ErrorPage';
import './ErrorPage.css';
import image from '../../img/error-image.jpg';
import {useParams ,useLocation} from 'react-router-dom';
const InformasiErrorPage = () => {
  const appid= useParams();
  const location = useLocation();
  console.log(appid);
  return (
    <div className="error-container">
    <h1>Oops!</h1>
    <h2>😓</h2>
    <br></br>
    <p>Terdapat sesuatu yang tidak kena.</p>
    <p>App Id, {appid['appid']} yang dicarikan {location.state.message}</p>
    <a href="/semaksijil" className="button">Kembali ke halaman semak sijil</a>
  </div>
  );
};

export default InformasiErrorPage;