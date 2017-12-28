import React from 'react'
import './modal.css'

const Modal = (props) => {
  return (
    <div className="Modal">
      Esto es un modal
      { props.children }
      <button className="Modal-close" onClick={ props.handleClick } />
    </div>
  )
}

export default Modal