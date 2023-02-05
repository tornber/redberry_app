import React,{useState,useEffect} from 'react'
import './App.css';
import {Routes,Route,useLocation} from 'react-router-dom';
import Starter from './Starter';
import Private from './Private';
import {FormDataContext} from './FormDataContext'

function App() {

  const [formData,setFormData] = useState({
      name: '',
      surname: '',
      aboutMyself: '',
      email: '',
      phone: ''
  });
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
    if(prevLocation == "/") {
      setFormData(() => {
        return {
            name: '',
            surname: '',
            aboutMyself: '',
            email: '',
            phone: ''
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
        </Routes>
      </FormDataContext.Provider>
    </div>
  );
}

export default App;
