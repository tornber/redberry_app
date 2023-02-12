import {useState, useContext} from 'react'
import {useNavigate} from 'react-router-dom';
import './main.css'
import ProgressBar from './ProgressBar'
import { Link } from 'react-router-dom'
import {FormDataContext} from './FormDataContext'
import GeneratedCV from './GeneratedCV';
import EducationForm from './EducationForm'
import axios from 'axios'

const Education = ({forms,setForms}) => {
        
    const {formData,setFormData} = useContext(FormDataContext)
    const [formIndex,setFormIndex] = useState(1)
    const navigate = useNavigate()

    const addForm = () => {
        const educationsArray = [...formData.educations,{
            institute: '',
            degree: '',
            due_date: '',
            description: '',
        }]
        setFormData((prevFormData) => ({...prevFormData,educations: educationsArray}))
        setForms([...forms,<EducationForm index={formIndex}/>])
        setFormIndex((ind) => ind+1)
        }

    const generateCV = async () => {
        const blobImage = await fetch(formData.image).then(r => r.blob())
        // const imageFile  = new File([blobImage],'image',{type: blobImage.type})
        // const fr = new FileReader()
        // fr.readAsBinaryString(imageFile)
        // // let imageURL = ''
        // fr.addEventListener('load',() => {
        //     imageURL = fr.result
        // })
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
        const experiencesArray = formData.experiences.map((experience) => {
            return {...experience,start_date: experience.start_date.replaceAll('-','/'),due_date: experience.due_date.replaceAll('-','/')}
        })
        const educationsArray = formData.educations.map((education) => {
            return {...education,due_date: education.due_date.replaceAll('-','/'),degree_id: parseInt(education.degree)}
        })
        const data = {
            ...formData,
            phone_number: formData.phone,
            experiences: experiencesArray,
            educations: educationsArray,
            about_me: formData.aboutMyself,
            image: blobImage
        }
        const res = await axios.post('https://resume.redberryinternship.ge/api/cvs',data,{headers})
        window.URL.revokeObjectURL(formData.image)
        localStorage.setItem('data',JSON.stringify(res.data))
        console.log(res.data) 
        window.sessionStorage.removeItem("data")
        navigate('/resume')
    }

    return (
        <div className='main'>
            <div className='left'>
                <ProgressBar title="განათლება" progress={"3"}/>
                {forms.map((form) => {
                    return form
                })}
                <button onClick={() => addForm()} className='add--experience--btn'>სხვა სასწავლებლის დამატება</button>
                <div className='navigation--container'>
                    <Link to='/experience' className='navigation--btn back--btn m-0'>უკან</Link>
                    <button onClick={() => generateCV()} to='/resume' className='navigation--btn next--btn m-0'>დასრულება</button>
                </div>
            </div>
            <GeneratedCV />
        </div>
    )
}

export default Education
