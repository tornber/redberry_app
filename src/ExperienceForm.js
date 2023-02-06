import {useState, useContext} from 'react'
import './main.css'
import SuccessLogo from './img/SuccessLogo.png'
import WarningLogo from './img/WarningLogo.png'
import {FormDataContext} from './FormDataContext'

const ExperienceForm = ({index}) => {

    const {formData,setFormData} = useContext(FormDataContext)
    const [formValid,setFormValid] = useState({
        position: 0,
        employer: 0,
        start_date: 0,
        due_date: 0,
        description: 0,
    });

    const handleFormChange = (e) => {
        const prevName = e.target.name
        const firstDigitIndex = prevName.search(/\d/)

        const name = e.target.name.slice(0,firstDigitIndex)
        const objIndex =  parseInt(e.target.name.slice(firstDigitIndex))
        const value = e.target.value

        const experiencesArray = formData.experiences.map((obj,ind) => {
            if(ind === objIndex) {
                return {...obj,[name]:value}
            }
            return obj 
        })
        setFormData(prevFormData => ({...prevFormData,experiences: experiencesArray}))
        checkIfValid(name,value)
    }

    const checkIfValid = (name,value) => {
        if(name === 'position' || name === 'employer') {
            if(value.length < 2) {
                setFormValid(prevFormValid => ({...prevFormValid,[name]: -1}))
            } else {
                setFormValid(prevFormValid => ({...prevFormValid,[name]: 1}))
            }
        }
        
    }


  return (
    <form className='form'>
        <div className='container contact'>
            <label htmlFor="position" className='label-font-style'>თანამდებობა </label>
            <input type="text" id="position" name={"position" + index} placeholder='დეველოპერი, დიზაინერი და ა.შ.' value={formData.experiences[index].position}
             onChange={(e) => handleFormChange(e)} className={formValid?.position === -1 ? 'error' : formValid.position === 1 ? 'success' : ''} min="2" required/>
            {formValid.position === 1 && (<img className="success--logo"src={SuccessLogo} alt="success logo"/>)}
            {formValid.position === -1 && <img className="warning--logo minus--1percent"src={WarningLogo} alt="warning logo"/>}
            <p className='validation--message'>მინიმუმ 2 სიმბოლო</p>
        </div>
        <div className='container contact'>
            <label htmlFor="employer" className='label-font-style'>დამსაქმებელი</label>
            <input type="text" id="employer" name={"employer" + index} placeholder='დამსაქმებელი' value={formData.experiences[index].employer} onChange={(e) => handleFormChange(e)}
             className={formValid?.employer === -1 ? 'error' : formValid.employer === 1 ? 'success' : ''} required/>
            {formValid.employer === 1 && (<img className="success--logo"src={SuccessLogo} alt="success logo"/>)}
            {formValid.employer === -1 && <img className="warning--logo minus--1percent"src={WarningLogo} alt="warning logo"/>}
            <p className='validation--message'>მინიმუმ 2 სიმბოლო</p>
        </div>
        <div className='name--surname'>
            <div className='container name'>
                <label htmlFor="start_date" className='label-font-style'>დაწყების რიცხვი</label>
                <input type="date" id="start_date" name={"start_date" + index} placeholder='mm /dd / yyyy' min={2}  onChange={(e) => handleFormChange(e)}
                    className={formValid?.start_date === -1 ? 'error' : formValid.start_date === 1 ? 'success' : ''}  value={formData.experiences[index].start_date} required />
            </div>
            <div className='container name'>
                <label htmlFor="due_date" className='label-font-style'>დამთავრების რიცხვი</label>
                <input type="date" id="due_date"  name={"due_date" + index} placeholder='mm /dd / yyyy' min={2} onChange={(e) => handleFormChange(e)}
                    className={formValid?.due_date === -1 ? 'error' : formValid.due_date === 1 ? 'success' : ''} value={formData.experiences[index].due_date} required />
            </div>
        </div>
        <div className='container about--myself'>
            <label htmlFor="description" className='label-font-style'>აღწერა</label>
            <textarea id='description' name={'description' + index} rows='5' cols="70" wrap="hard"  required 
                onChange={(e) => handleFormChange(e)} value={formData.experiences[index].description} placeholder='როლი თანამდებობაზე და ზოგადი აღწერა'></textarea>
        </div>
        <div className='experience--line'></div>
    </form>
  )
}

export default ExperienceForm
