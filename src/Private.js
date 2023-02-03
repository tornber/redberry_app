import React,{useState} from 'react'
import './Private.css'
import ProgressBar from './ProgressBar'
import { Link } from 'react-router-dom'
import SuccessLogo from './img/SuccessLogo.png'
import WarningLogo from './img/WarningLogo.png'

const Private = () => {

    const [formData,setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        phone: ''
    });
    const [formValid,setFormValid] = useState({
        name: 0,
        surname: 0,
        email: 0,
        phone: 0
    });

    const handleFormChange = (e) => {
        const name = e.target.name 
        const value = e.target.value
        setFormData(prevFormData => ({...prevFormData,[name]: value}))
        checkIfValid(name,value)
    }

    const checkIfValid = (name,value) => {
        if(name === 'name' || name === 'surname') {
            const regex = /^[ა-ჰ]+$/
            if(value.length < 2 || !regex.test(value)) {
                setFormValid(prevFormValid => ({...prevFormValid,[name]: -1}))
            } else {
                setFormValid(prevFormValid => ({...prevFormValid,[name]: 1}))
            }
        }

    }

    return (
        <div className='private'>
            <div className='left'>
                <ProgressBar progress={"1"}/>
                <form className='form'>
                    <div className='name--surname'>
                        <div className='container name'>
                            <label for="name" className='label-font-style'>სახელი </label>
                            <input type="text" id="name" name="name" placeholder='ანზორ' onChange={handleFormChange}
                             className={formValid?.name === -1 ? 'error' : formValid.name === 1 ? 'success' : ''}  value={formData.name} />
                                {formValid.name === 1 && (<img className="success--logo"src={SuccessLogo} alt="success logo"/>)}
                                {formValid.name === -1 && <img className="warning--logo"src={WarningLogo} alt="warning logo"/>}
                            <p className='validation--message'>მინიმუმ 2 ასო, ქართული ასოები</p>
                        </div>
                        <div className='container name'>
                            <label for="surname" className='label-font-style'>გვარი </label>
                            <input type="text" id="surname"  name="surname" placeholder='მუმლაძე' onChange={handleFormChange}
                             className={formValid?.surname === -1 ? 'error' : formValid.name === 1 ? 'success' : ''} value={formData.surname} />
                                {formValid.surname === 1 && (<img className="success--logo"src={SuccessLogo} alt="success logo"/>)}
                                {formValid.surname === -1 && <img className="warning--logo"src={WarningLogo} alt="warning logo"/>}
                            <p className='validation--message'>მინიმუმ 2 ასო, ქართული ასოები</p>
                        </div>
                    </div>
                    <label className='photo--upload'>პირადი ფოტოს ატვირთვა <input type='image' id='photo' name='photo' alt='ატვირთვა' required/></label>
                    <div className='container about--myself'>
                        <label for="aboutMyself" className='label-font-style'>ჩემს შესახებ (არასავალდებულო) </label>
                        <textarea id='aboutMyself' name='aboutMyself' rows='4' cols="70" placeholder='ზოგადი ინფო შენს შესახებ'></textarea>
                    </div>
                    <div className='container contact'>
                        <label for="email" className='label-font-style'>ელ.ფოსტა </label>
                        <input type="email" id="email" name="email" placeholder='anzor777@redberry.com' value={formData.email}
                         className={formValid?.email === -1 ? 'error' : formValid.email === 1 ? 'success' : ''} required/>
                        <p className='validation--message'>უნდა მთავრდებოდეს @redberry.ge-ით</p>
                    </div>
                    <div className='container contact'>
                        <label for="phone" className='label-font-style'>მობილურის ნომერი </label>
                        <input type="text" id="phone" name="phone" placeholder='+995 551 12 34 56' value={formData.phone}
                         className={formValid?.phone === -1 ? 'error' : formValid.phone === 1 ? 'success' : ''} required/>
                        <p className='validation--message'>უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს</p>
                    </div>
                    <div className='next--btn--container'>
                        <Link to='/experience' className='next--btn'>შემდეგი</Link>
                    </div>
                </form>
            </div>
            <div className='right'></div>
        </div>
    )
}

export default Private
