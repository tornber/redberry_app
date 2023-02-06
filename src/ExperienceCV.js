import React,{useContext} from 'react'
import {FormDataContext} from './FormDataContext'
import './GeneratedCV.css'

const ExperienceCV = () => {
  
    const {formData} = useContext(FormDataContext)

    return (
    <div className="cv--experience">
        {formData.experiences[0].position && (<h3 className='cv--about--myself'>გამოცდილება</h3>)}
        {formData.experiences.map((form,ind) => {
            return (
                <div key={ind}>
                    {form.position && (<p className='cv--position'>{form.position}{form?.employer !== "" ? `, ${form.employer}` : ''}</p>)}
                    {form.start_date && (<p className='cv--dates'>{form.start_date} - {form?.due_date}</p>)}
                    {form.description && (<p className='about--myself--content'>{form.description}</p>)}
                </div>
            )
        })}
        {formData.experiences[0].position && (<div className='experiences-cv--line'></div>)}
    </div>
  )
}

export default ExperienceCV
