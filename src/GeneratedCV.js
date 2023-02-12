import React,{useContext,useEffect,useState} from 'react'
import {FormDataContext} from './FormDataContext'
import './GeneratedCV.css'
import PhoneIcon from './img/phone.png'
import MailIcon from './img/mail.png'
import Logo from './img/CVLogo.png'
import ExperienceCV from './ExperienceCV'
import EducationCV from './EducationCV'

const GeneratedCV = () => {

    const {formData} = useContext(FormDataContext)
    const [aboutMyselfText,setAboutMyselfText] = useState("")

    const handleTextWrap = () => {
        let value = formData.aboutMyself
        if(value.length >= 90) {
            if(value.length % 90 === 0) {
                setAboutMyselfText((prevAboutMyselfText) => prevAboutMyselfText + "\n")
            } else {
                const ind = value.length - (value.length % 90)
                const prevText = aboutMyselfText.substring(0,ind)
                setAboutMyselfText(() => prevText + value.substring(ind))
            }
        } else {
            setAboutMyselfText(() => value)
        }
    }

    useEffect(() => {
        handleTextWrap()
    },[formData.aboutMyself])

    return (
        <div className='generatedCV'>
            {formData.image && (<img className='cv--image' src={formData.image} />)}
            <h1 className='cv--name'>{`${formData.name} ${formData.surname}`}</h1>
            {formData.email && (<h3 className='cv--email'><img src={MailIcon} alt="mail icon"/> {formData.email}</h3>)}
            {formData.phone && (<h3 className='cv--phone'><img src={PhoneIcon} alt="telephone icon"/> {formData.phone}</h3>)}
            {formData.aboutMyself && (
            <div>
                <h3 className='cv--about--myself'>ჩემს შესახებ</h3>
                <p className='about--myself--content'>{aboutMyselfText}</p>
            </div>
            )}
            {formData.name && (<div className='cv--line'></div>)}
            
            <ExperienceCV />
            <EducationCV />
            
            <img className='cv--logo' src={Logo} alt="cv star logo"/>

        </div>
    )
}

export default GeneratedCV
