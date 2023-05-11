import React from 'react'
import '../button/buttons.css'

const SimpleButton = ({title, onClick}) => {
  return (
    <button type='button' className='simplebutton' onClick={onClick}><b>{title}</b></button>
    )
}

export default SimpleButton