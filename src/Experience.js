import {useState, useContext} from 'react'
import './main.css'
import ProgressBar from './ProgressBar'
import { Link } from 'react-router-dom'
import {FormDataContext} from './FormDataContext'
import GeneratedCV from './GeneratedCV';
import ExperienceForm from './ExperienceForm';

const Experience = () => {
        
    const {formData,setFormData} = useContext(FormDataContext)
    const [formIndex,setFormIndex] = useState(1)
    const [forms,setForms] = useState([<ExperienceForm index={0}/>])

    const addForm = () => {
        const experiencesArray = [...formData.experiences,{
            position: '',
        }]
        setFormData(prevFormData => ({...prevFormData,experiences: experiencesArray}))
        setForms([...forms,<ExperienceForm index={formIndex}/>])
        setFormIndex((ind) => ind+1)
        }

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
                    <Link to='/education' className='navigation--btn next--btn m-0'>შემდეგი</Link>
                </div>
            </div>
            <GeneratedCV index={formIndex}/>
        </div>
    )
}

export default Experience
