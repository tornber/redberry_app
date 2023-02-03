import React from 'react'
import {Link} from 'react-router-dom'
import './Starter.css'
import RedberryLogo from './img/LOGO-023.png'
import Logo from './img/LOGO-401.png'

const Starter = () => {
  return (
    <div className='starter'>
        <img className='redberry--logo' src={RedberryLogo} alt="redberry logo" />
        <div className='line' />
        <img src={Logo} alt='logo' className='logo'/>
        <Link to='/private' className='resume--btn'>რეზიუმეს დამატება</Link>
    </div>
  )
}

export default Starter
