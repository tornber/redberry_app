import {useState, useEffect, useContext} from 'react'
import './main.css'
import SuccessLogo from './img/SuccessLogo.png'
import WarningLogo from './img/WarningLogo.png'
import {FormDataContext} from './FormDataContext'

const EducationForm = ({index}) => {

    const {formData,setFormData} = useContext(FormDataContext)
    const [formValid,setFormValid] = useState({
        institute: 0,
        degree: 0,
        due_date: 0,
        description: 0,
    });
    const [degrees,setDegrees] = useState([])

    const handleFormChange = (e) => {
        const prevName = e.target.name
        const firstDigitIndex = prevName.search(/\d/)

        const name = e.target.name.slice(0,firstDigitIndex)
        const objIndex =  parseInt(e.target.name.slice(firstDigitIndex))
        const value = e.target.value

        const educationsArray = formData.educations.map((obj,ind) => {
            if(ind === objIndex) {
                return {...obj,[name]:value}
            }
            return obj 
        })
        setFormData(prevFormData => ({...prevFormData,educations: educationsArray}))
        if(name === 'institute') {
            checkIfValid(name,value)
        }
    }

    const checkIfValid = (name,value) => {
        if(value.trim().length < 2) {
            setFormValid(prevFormValid => ({...prevFormValid,[name]: -1}))
        } else {
            setFormValid(prevFormValid => ({...prevFormValid,[name]: 1}))
        }
        
    }

    const fetchDegrees = () => {
        fetch("https://resume.redberryinternship.ge/api/degrees")
            .then(response => response.json())
            .then(res => setDegrees(res))
        }

    useEffect(() => {
        fetchDegrees()
    },[])


  return (
    <form className='form'>
        <div className='container contact'>
            <label htmlFor="institute" className='label-font-style'>სასწავლებელი</label>
            <input type="text" id="institute" name={"institute" + index} placeholder='სასწავლებელი' value={formData.educations[index].institute}
             onChange={(e) => handleFormChange(e)} className={formValid?.institute === -1 ? 'error' : formValid.institute === 1 ? 'success' : ''} min="2" required/>
            {formValid.institute === 1 && (<img className="success--logo"src={SuccessLogo} alt="success logo"/>)}
            {formValid.institute === -1 && <img className="warning--logo minus--1percent"src={WarningLogo} alt="warning logo"/>}
            <p className='validation--message'>მინიმუმ 2 სიმბოლო</p>
        </div>
        <div className='name--surname'>
            <div className='container name'>
                <label htmlFor="degree" className='label-font-style'>ხარისხი</label>
                <select  id="degree" name={"degree" + index} placeholder='აირჩიეთ ხარისხი' onChange={(e) => handleFormChange(e)}
                    className={formValid?.degree === -1 ? 'error' : formValid.degree === 1 ? 'success' : ''}  value={formData.educations[index].degree} required >
                <option aria-selected hidden className='default--option'>აირჩიეთ ხარისხი</option>
                {degrees.map(degree => (
                    <option key={degree.id} value={degree.id}>{degree.title}</option>
                    ))}
                </select>
            </div>
            <div className='container name'>
                <label htmlFor="due_date" className='label-font-style'>დამთავრების რიცხვი</label>
                <input type="date" id="due_date"  name={"due_date" + index} placeholder='mm /dd / yyyy' onChange={(e) => handleFormChange(e)}
                    className={formValid?.due_date === -1 ? 'error' : formValid.due_date === 1 ? 'success' : ''} value={formData.educations[index].due_date} required />
            </div>
        </div>
        <div className='container about--myself'>
            <label htmlFor="description" className='label-font-style'>აღწერა</label>
            <textarea id='description' name={'description' + index} rows='10' cols="70" wrap="hard"  required 
                onChange={(e) => handleFormChange(e)} value={formData.educations[index].description} placeholder='განათლების აღწერა'></textarea>
        </div>
        <div className='experience--line'></div>
    </form>
  )
}

export default EducationForm
