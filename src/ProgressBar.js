import React from 'react'
import './ProgressBar.css'
import BackVector from'./img/Vector.png'

const ProgressBar = ({progress}) => {
  return (
    <div className='progress--bar'>
        <div className='progress--container'>
            <div className='back--vector'>
                <img src={BackVector} alt='back to first page' />
            </div>
            <h1 className='progress--header'>პირადი ინფო</h1>
            <h2 className='progress--counter'>{progress}/3</h2>
        </div>
        <div className='progress--line'></div>
    </div>
  )
}

export default ProgressBar
