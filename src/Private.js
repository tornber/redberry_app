import {useState, useEffect, useRef, useContext} from 'react'
import './main.css'
import ProgressBar from './ProgressBar'
import { useNavigate } from 'react-router-dom'
import SuccessLogo from './img/SuccessLogo.png'
import WarningLogo from './img/WarningLogo.png'
import {FormDataContext} from './FormDataContext'
import GeneratedCV from './GeneratedCV';

const Private = () => {

    const {formData,setFormData} = useContext(FormDataContext)
    const [formValid,setFormValid] = useState({
        name: 0,
        surname: 0,
        email: 0,
        phone: 0,
        photo: 0,
        aboutMyself: 0
    });
    const imageRef = useRef(null)
    const navigate = useNavigate()

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
                return false
            } else {
                setFormValid(prevFormValid => ({...prevFormValid,[name]: 1}))
            }
        }

        if(name === 'email') {
            if(value.endsWith("@redberry.ge")) {
                setFormValid(prevFormValid => ({...prevFormValid,[name]: 1}))
            } else {
                setFormValid(prevFormValid => ({...prevFormValid,[name]: -1}))
                return false
            }
        }
        if(name === "phone") {
            const regex = /^\+9955[0-9]{8}$/
            if(regex.test(value)) {
                setFormValid(prevFormValid => ({...prevFormValid,[name]: 1}))
            } else {
                setFormValid(prevFormValid => ({...prevFormValid,[name]: -1}))
                return false
            }
        }

        if(name === "aboutMyself") {
            if(value) {
                setFormValid(prevFormValid => ({...prevFormValid,[name]: 1}))
                console.log(value)
            } else {
                setFormValid(prevFormValid => ({...prevFormValid,[name]: -1}))
                return false
            }
        }

        return true
        
    }

    const handleImageUpload = () => {
        imageRef.current.click()
    }

    const saveImage = (e) => {
        setFormData({...formData,image: URL.createObjectURL(e.target.files[0])})
        setFormValid((prevFormValid) => ({...prevFormValid,photo: 1}))
    }

    const handleNextBtn = () => {
        let isValid = true
        const values = Object.values(formValid)
        values.forEach((value,ind) => {
            if(value !== 1 && ind !== 5) {
                isValid = false
                return 
            }
        })
        if(isValid) {
            navigate('/experience')
        }
    }

    useEffect(() => {
        const formNames = Object.keys(formData)
        const formValues = Object.values(formData)
        for(let i = 0;i < formNames.length;i++) {
            checkIfValid(formNames[i],formValues[i])
        }
        if(formData.image !== '') {
            setFormValid((prevFormValid) => ({...prevFormValid,photo: 1}))
        }
    },[formData])

    return (
        <div className='main'>
            <div className='left'>
                <ProgressBar title="პირადი ინფო" progress={"1"}/>
                <form className='form'>
                    <div className='name--surname'>
                        <div className='container name'>
                            <label htmlFor="name" className='label-font-style'>სახელი </label>
                            <input type="text" id="name" name="name" placeholder='ანზორ'min={2}  onChange={(e) => handleFormChange(e)}
                             className={formValid?.name === -1 ? 'error' : formValid.name === 1 ? 'success' : ''}  value={formData.name} required/>
                                {formValid.name === 1 && (<img className="success--logo"src={SuccessLogo} alt="success logo"/>)}
                                {formValid.name === -1 && <img className="warning--logo"src={WarningLogo} alt="warning logo"/>}
                            <p className='validation--message'>მინიმუმ 2 ასო, ქართული ასოები</p>
                        </div>
                        <div className='container name'>
                            <label htmlFor="surname" className='label-font-style'>გვარი </label>
                            <input type="text" id="surname"  name="surname" placeholder='მუმლაძე' min={2} onChange={(e) => handleFormChange(e)}
                             className={formValid?.surname === -1 ? 'error' : formValid.name === 1 ? 'success' : ''} value={formData.surname} required />
                                {formValid.surname === 1 && <img className="success--logo"src={SuccessLogo} alt="success logo"/>}
                                {formValid.surname === -1 && <img className="warning--logo"src={WarningLogo} alt="warning logo"/>}
                            <p className='validation--message'>მინიმუმ 2 ასო, ქართული ასოები</p>
                        </div>
                    </div>
                    <label htmlFor="photo" className='photo--upload'>პირადი ფოტოს ატვირთვა <button onClick={() => handleImageUpload()} className='upload--btn'>ატვირთვა</button></label>
                    <input type='file' id='photo' name='photo' alt='ატვირთვა' accept='image/*' className='hidden' onChange={(e) => saveImage(e)} ref={imageRef} required/>
                    <div className='container about--myself'>
                        <label htmlFor="aboutMyself" className='label-font-style'>ჩემს შესახებ (არასავალდებულო) </label>
                        <textarea id='aboutMyself' name='aboutMyself' rows='4' cols="70" wrap="hard"
                         className={formValid?.aboutMyself === -1 ? 'error' : formValid.aboutMyself === 1 ? 'success' : ''}
                         onChange={(e) => handleFormChange(e)} value={formData.aboutMyself} placeholder='ზოგადი ინფო შენს შესახებ'></textarea>
                    </div>
                    <div className='container contact'>
                        <label htmlFor="email" className='label-font-style'>ელ.ფოსტა </label>
                        <input type="email" id="email" name="email" placeholder='anzor777@redberry.com' value={formData.email} onChange={(e) => handleFormChange(e)}
                         className={formValid?.email === -1 ? 'error' : formValid.email === 1 ? 'success' : ''} required/>
                        {formValid.email === 1 && (<img className="success--logo"src={SuccessLogo} alt="success logo"/>)}
                        {formValid.email === -1 && <img className="warning--logo minus--1percent"src={WarningLogo} alt="warning logo"/>}
                        <p className='validation--message'>უნდა მთავრდებოდეს @redberry.ge-ით</p>
                    </div>
                    <div className='container contact'>
                        <label htmlFor="phone" className='label-font-style'>მობილურის ნომერი </label>
                        <input type="text" id="phone" name="phone" placeholder='+995 551 12 34 56' value={formData.phone} onChange={(e) => handleFormChange(e)}
                         className={formValid?.phone === -1 ? 'error' : formValid.phone === 1 ? 'success' : ''} required/>
                        {formValid.phone === 1 && (<img className="success--logo"src={SuccessLogo} alt="success logo"/>)}
                        {formValid.phone === -1 && <img className="warning--logo minus--1percent"src={WarningLogo} alt="warning logo"/>}
                        <p className='validation--message'>უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს</p>
                    </div>
                    <div className='next--btn--container'>
                        <button type='button' onClick={() => handleNextBtn()} className='navigation--btn'>შემდეგი</button>
                    </div>
                </form>
            </div>
            <GeneratedCV />
        </div>
    )
}

export default Private
