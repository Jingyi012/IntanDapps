import React, { useState, useEffect } from 'react';
import ErrorPage from './ErrorPage';
import { useParams } from 'react-router-dom';

const InformasiErrorPage = () => {
  return (
    <div>
    <h1>Error 404</h1>
    <p>
      This cert with the this app id had already been removed from by an admin !!
    </p>
    </div>
  );
};

export default InformasiErrorPage;