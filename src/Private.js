import React,{useState} from 'react'
import './Private.css'
import ProgressBar from './ProgressBar'
import { Link } from 'react-router-dom'

const Private = () => {

    const [formData,setFormData] = useState({
        name: '',
        surname: '' 
    });

    return (
        <div className='private'>
            <div className='left'>
                <ProgressBar progress={"1"}/>
                <form className='form'>
                    <div className='name--surname'>
                        <div className='container name'>
                            <label for="name" className='label-font-style'>სახელი </label>
                            <input type="text" id="name" name="name" placeholder='ანზორ' required/>
                            <p className='validation--message'>მინიმუმ 2 ასო, ქართული ასოები</p>
                        </div>
                        <div className='container name'>
                            <label for="surname" className='label-font-style'>სახელი </label>
                            <input type="text" id="surname"  name="surname" placeholder='მუმლაძე' required/>
                            <p className='validation--message'>მინიმუმ 2 ასო, ქართული ასოები</p>
                        </div>
                    </div>
                    <label className='photo--upload'>პირადი ფოტოს ატვირთვა <input type='file' id='photo' name='photo' placeholder='ატვირთვა' required/></label>
                    <div className='container about--myself'>
                        <label for="aboutMyself" className='label-font-style'>ჩემს შესახებ (არასავალდებულო) </label>
                        <textarea id='aboutMyself' name='aboutMyself' rows='4' cols="70" placeholder='ზოგადი ინფო შენს შესახებ'></textarea>
                    </div>
                    <div className='container contact'>
                        <label for="mail" className='label-font-style'>ელ.ფოსტა </label>
                        <input type="mail" id="mail" name="mail" placeholder='anzor777@redberry.com' required/>
                        <p className='validation--message'>უნდა მთავრდებოდეს @redberry.ge-ით</p>
                    </div>
                    <div className='container contact'>
                        <label for="phoneNumber" className='label-font-style'>მობილურის ნომერი </label>
                        <input type="text" id="phoneNumber" name="phoneNumber" placeholder='+995 551 12 34 56' required/>
                        <p className='validation--message'>უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს</p>
                    </div>
                    <div className='next--btn--container'>
                        <Link to='/experience' className='next--btn'>შემდეგი</Link>
                    </div>
                </form>
            </div>
            <div className='right'></div>
        </div>
    )
}

export default Private
