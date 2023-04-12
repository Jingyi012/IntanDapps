import React, { useState } from 'react';
import notFoundPic from "../assets/notfound.png";

function SijilNotFound() {
    const style={
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '90vh',
        width: '100%',
        marginTop: '10vh',
        gap: '3rem'
    }

    return ( 
        <div style={style}>
            <h1>SIJIL TIDAK DIJUMPAI</h1>
            <img src={notFoundPic} alt='not found' height={300} width ={300}/>
        </div>
     );
}

export default SijilNotFound;