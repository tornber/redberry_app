import React,{useRef} from 'react'
import FinalCV from './FinalCV'
import {Link} from 'react-router-dom'
import BackVector from'./img/Vector.png'
import CloseIcon from './img/close.png'
import './main.css'

const Resume = () => {

  const popUpRef = useRef(null)
    
  const closePopUp = () => {
    popUpRef.current.style.display = "none"
  }

  return (
    <div className='resume'>
      <Link to='/' className='back--vector p-ab'>
        <img src={BackVector} alt='back to first page' />
      </Link>
      <FinalCV />
       <div className='pop--up' ref={popUpRef}><h1>რეზიუმე წარმატებით გაიგზავნა</h1><img onClick={() => closePopUp()} src={CloseIcon} /></div>
    </div>
  )
}

export default Resume