import React from 'react'
import '../button/buttons.css'

const Buttons = props => {
  return (
    <button type='submit' className='daftarbutton'><b>{props.title}</b></button>
    )
}

export default Buttons
