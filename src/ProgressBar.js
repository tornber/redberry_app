import React from 'react'
import './ProgressBar.css'
import BackVector from'./img/Vector.png'
import {Link} from 'react-router-dom'

const ProgressBar = ({progress}) => {

  const handleBackFirstPage = () => {
    window.sessionStorage.removeItem('data')
  }

  return (
    <div className='progress--bar'>
        <div className='progress--container'>
            <Link to='/' onClick={handleBackFirstPage} className='back--vector'>
                <img src={BackVector} alt='back to first page' />
            </Link>
            <h1 className='progress--header'>პირადი ინფო</h1>
            <h2 className='progress--counter'>{progress}/3</h2>
        </div>
        <div className='progress--line'></div>
    </div>
  )
}

export default ProgressBar
