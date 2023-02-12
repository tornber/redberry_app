import React,{useState,useEffect} from 'react'
import './App.css';
import {Routes,Route,useLocation} from 'react-router-dom';
import Starter from './Starter';
import Private from './Private';
import {FormDataContext} from './FormDataContext'
import Experience from './Experience';
import Education from './Education';
import EducationForm from './EducationForm'
import ExperienceForm from './ExperienceForm';
import Resume from './Resume';

function App() {

  const [formData,setFormData] = useState({
      name: '',
      surname: '',
      image: '',
      aboutMyself: '',
      email: '',
      phone: '',
      experiences: [{
        position: '',
        employer: '',
        start_date: '',
        due_date: '',
        description: '',
      }],
      educations: [{
        institute: '',
        degree: '',
        due_date: '',
        description: '',
    }]
  });
  const [educationForms,setEducationForms] = useState([<EducationForm index={0}/>])
  const [experienceForms,setExperienceForms] = useState([<ExperienceForm index={0}/>])

  const [isFirstRender,seIsFirstRender] = useState(true)
  const [prevLocation,setPrevLocation] = useState("")
  const location = useLocation()
  useEffect(() => {
    if(isFirstRender) {
      const data = window.sessionStorage.getItem("data") || null
      if(data) {
        setFormData(JSON.parse(data))
      } else {
        window.sessionStorage.setItem("data",JSON.stringify(formData))
      }
      seIsFirstRender((prevIsFirstRender) => !prevIsFirstRender)
    } else {
        window.sessionStorage.setItem("data",JSON.stringify(formData))
    }
  },[formData])

  useEffect(() => {
    setPrevLocation(location.pathname)
    if(prevLocation === "/" || prevLocation === '/resume') {
      setFormData(() => {
        return {
            name: '',
            surname: '',
            image: '',
            aboutMyself: '',
            email: '',
            phone: '',
            experiences: [{
              position: '',
              employer: '',
              start_date: '',
              due_date: '',
              description: '',
            }],
            educations: [{
              institute: '',
              degree: '',
              due_date: '',
              description: '',
            }]
        }
      })
    }
  },[location])

  return (
    <div className="App">
      <FormDataContext.Provider value={{formData,setFormData}}>
        <Routes>
          <Route path='/' element={<Starter/>} />
          <Route path='/private' element={<Private/>} />
          <Route path='/experience' element={<Experience forms={experienceForms} setForms={setExperienceForms} />} />
          <Route path='/education' element={<Education forms={educationForms} setForms={setEducationForms}/>} />
          <Route path='/resume' element={<Resume />} />
        </Routes>
      </FormDataContext.Provider>
    </div>
  );
}

export default App;
