import React,{useContext,useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom';
import {FormDataContext} from './FormDataContext'
import './GeneratedCV.css'
import PhoneIcon from './img/phone.png'
import MailIcon from './img/mail.png'
import Logo from './img/CVLogo.png'
import ExperienceCV from './ExperienceCV'
import EducationCV from './EducationCV'

const FinalCV = () => {

    const [formData,setFormData] = useState({})
    const [isFirstRender,seIsFirstRender] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        if (typeof localStorage.getItem('data') === 'undefined')
        {
            navigate('/education')
        }
        setFormData(JSON.parse(localStorage.getItem('data')))
        seIsFirstRender(false)
    },[])

    return (
        <div className='finalCV'>
            {formData.image && (<img className='cv--image' src={formData.image} />)}
            <h1 className='cv--name'>{`${formData.name} ${formData.surname}`}</h1>
            {formData.email && (<h3 className='cv--email'><img src={MailIcon} alt="mail icon"/> {formData.email}</h3>)}
            {formData.phone_number && (<h3 className='cv--phone'><img src={PhoneIcon} alt="telephone icon"/> {formData.phone_number}</h3>)}
            {formData.about_me && (
            <div>
                <h3 className='cv--about--myself'>ჩემს შესახებ</h3>
                <p className='about--myself--content'>{formData.about_me}</p>
            </div>
            )}
            {formData.name && (<div className='cv--line'></div>)}
            <img className='cv--logo ml-80' src={Logo} alt="cv star logo"/>
            
            {!isFirstRender ?  (<div><div className="cv--experience">
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
            
            <div className="cv--education">
                {formData.educations[0].institute && (<h3 className='cv--about--myself'>განათლება</h3>)}
                {formData.educations.map((form,ind) => {
                    return (
                        <div key={ind}>
                            {form.institute && (<p className='cv--position'>{form.institute}{form?.degree !== "" ? `, ${form.degree}` : ''}</p>)}
                            {form.due_date && (<p className='cv--dates'>{form.due_date}</p>)}
                            {form.description && (<p className='about--myself--content'>{form.description}</p>)}
                        </div>
                    )
                })}
                {formData.educations[0].institute && (<div className='experiences-cv--line'></div>)}
            </div></div>) : (<div>Loading...</div>)}

        </div>
    )
}

export default FinalCV
