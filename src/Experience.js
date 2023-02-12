import {useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import './main.css'
import ProgressBar from './ProgressBar'
import { Link } from 'react-router-dom'
import {FormDataContext} from './FormDataContext'
import GeneratedCV from './GeneratedCV';
import ExperienceForm from './ExperienceForm';

const Experience = ({forms,setForms}) => {
        
    const {formData,setFormData} = useContext(FormDataContext)
    const [formIndex,setFormIndex] = useState(1)
    const [formValid,setFormValid] = useState({
        position: 0,
        employer: 0,
        start_date: 0,
        due_date: 0,
        description: 0,
    });
    const navigate = useNavigate()

    const addForm = () => {
        const experiencesArray = [...formData.experiences,{
            position: '',
            employer: '',
            start_date: '',
            due_date: '',
            description: '',
        }]
        setFormData((prevFormData) => ({...prevFormData,experiences: experiencesArray}))
        setForms([...forms,<ExperienceForm index={formIndex}/>])
        setFormIndex((ind) => ind+1)
    }

    const checkValid = (name,value) => {
        if(name === 'position' || name === 'employer') {
            if(value.trim().length < 2) {
                setFormValid(prevFormValid => ({...prevFormValid,[name]: -1}))
            } else {
                setFormValid(prevFormValid => ({...prevFormValid,[name]: 1}))
            }
        }
        if(name === 'start_date' || name === 'due_date' || name === 'description') {
            if(value !== '') {
                setFormValid(prevFormValid => ({...prevFormValid,[name]: 1}))
            } else {
                setFormValid(prevFormValid => ({...prevFormValid,[name]: -1}))
            }
        }
        
    }

    const handleNextBtn = () => {
        let isValid = true
        const values = Object.values(formValid)
        values.forEach((value) => {
            if(value !== 1) {
                isValid = false
                return 
            }
        })
        if(isValid) {
            navigate('/education')
        }
    }

    useEffect(() => {
        for(let i = 0;i < formData.experiences.length;i++) {
            const formNames = Object.keys(formData.experiences[i])
            const formValues = Object.values(formData.experiences[i])
            for(let i = 0;i < formNames.length;i++) {
                checkValid(formNames[i],formValues[i])
            }
        }
    },[formData.experiences])


    return (
        <div className='main'>
            <div className='left'>
                <ProgressBar title="გამოცდილება" progress={"2"}/>
                {forms.map((form) => {
                    return form
                })}
                <button onClick={() => addForm()} className='add--experience--btn'>მეტი გამოცდილების დამატება</button>
                <div className='navigation--container'>
                    <Link to='/private' className='navigation--btn back--btn m-0'>უკან</Link>
                    <button type='button' onClick={() => handleNextBtn()} className='navigation--btn next--btn m-0'>შემდეგი</button>
                </div>
            </div>
            <GeneratedCV />
        </div>
    )
}

export default Experience
