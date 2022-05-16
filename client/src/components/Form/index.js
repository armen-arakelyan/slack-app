import React, { useState } from 'react'
import Login from '../Login'
import Register from '../Register'
import './style.css'

const Form = () => {
    const [currentForm, setCurrentForm] = useState('Login')
    return (
        <div className="login">
            <div className='login-screen'>
                    <h1>{currentForm}</h1>
                    { currentForm === 'Login' ? <Login /> : <Register />  }
                <div className="action">
                    <button id={currentForm === 'Register' ? 'active' : ''} onClick={() => setCurrentForm('Register')}>Register</button>
                    <button id={currentForm === 'Login' ? 'active' : ''} onClick={() => setCurrentForm('Login')}>Sign in</button>
                </div>
            </div>
        </div>
    )
}

export default Form
