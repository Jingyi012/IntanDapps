import React from 'react'
import '../button/buttons.css'

const Buttons = ({title, onClick}) => {
  return (
    <button type='submit' className='daftarbutton' onClick={onClick}><b>{title}</b></button>
    )
}

export default Buttons
