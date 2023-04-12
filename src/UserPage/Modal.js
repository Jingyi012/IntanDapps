import React from 'react'

export default function Modal({isOpen, children, onClose }) {
    if (!isOpen) return null
  
    return (
      <>
        <div/>
        <div>
          
          {children}
        </div>
      </>
    )
}