import React,{useState,useEffect,useContext} from 'react'
import {FormDataContext} from './FormDataContext'
import './GeneratedCV.css'

const EducationCV = () => {
  
    const {formData} = useContext(FormDataContext)
    const [aboutMyselfText,setAboutMyselfText] = useState([{index: 0,text: ''}])

    const handleTextWrap = (i) => {
        const value = formData.educations[i].description
        if(value.length >= 90) {
            if(value.length % 90 === 0) {
                const updatedTextArray = [...aboutMyselfText]
                if(updatedTextArray[i]) {
                    updatedTextArray[i].text = updatedTextArray[i].text + '\n'
                }
                setAboutMyselfText((prevAboutMyselfText) => updatedTextArray)
                
            } else {
                const ind = value.length - (value.length % 90)
                if(aboutMyselfText[i]) {
                    const prevText = aboutMyselfText[i].text.substring(0,ind)
                    const updatedTextArray = [...aboutMyselfText]
                    updatedTextArray[i].text = prevText + value.substring(ind)
                    setAboutMyselfText((prevAboutMyselfText) => updatedTextArray)
                }
            }
        } else {
            const updatedTextArray = [...aboutMyselfText]
            if(updatedTextArray[i]) {
                updatedTextArray[i].text = value
            } else {
                updatedTextArray.push({index: i,text: value})
            }
            setAboutMyselfText((prevAboutMyselfText) => updatedTextArray)
        }
    }

    useEffect(() => {
        formData.educations.map((experience,ind) => {
            if(ind >= aboutMyselfText.length) {
                setAboutMyselfText((prevAboutMyselfText) => [...prevAboutMyselfText,{index: aboutMyselfText.length,text:experience.description}])
            }
        })
        formData.educations.forEach((experience,ind) => {
            handleTextWrap(ind)
        })

    },[formData.educations])

    return (
    <div className="cv--education">
        {formData.educations[0].institute && (<h3 className='cv--about--myself'>განათლება</h3>)}
        {formData.educations.map((form,ind) => {
            return (
                <div key={ind}>
                    {form.institute && (<p className='cv--position'>{form.institute}{form?.degree !== "" ? `, ${form.degree}` : ''}</p>)}
                    {form.due_date && (<p className='cv--dates'>{form.due_date}</p>)}
                    {aboutMyselfText[ind] && (<p className='about--myself--content'>{aboutMyselfText[ind].text}</p>)}
                </div>
            )
        })}
        {formData.educations[0].institute && (<div className='experiences-cv--line'></div>)}
    </div>
  )
}

export default EducationCV
