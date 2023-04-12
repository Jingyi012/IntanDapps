import React, { useState } from 'react'
import '../Sejarah/sejarah.css'
import closeicon from '../../img/close.png'

const Sejarah = ({title}) => {
    const [isOpen,setIsOpen]= useState(false);
  return (
    <div>
        <button className="statusbutton" onClick={()=>setIsOpen(true)}>{title}</button>
        {isOpen && (
        <div className='semaksijil'>
           <div className='contentsemaksijil'>
            <div className='semaksijilbox'>
              <div className='sejarahheader'>
              <h2 className='sejarahtitle'>Sejarah</h2>
              <button className='closebutton' onClick={() => setIsOpen(false)}><img src={closeicon} className='closeicon'/></button>
              </div>
              <div className='sejarahcontent'>
                  <div className='sejarahtime'>12/02/2023</div>
                  <div className='sejarahmain'>
                    <div>Dicipta</div>
                    <div>www.sdadsdasd</div>
                  </div>
              </div>
            </div>
            </div>
        </div>
        )}
    </div>
  )
}

export default Sejarah
