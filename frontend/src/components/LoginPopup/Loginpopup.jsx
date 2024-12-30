import React, { useState } from 'react'
import './Loginpopup.css'
import { assets } from '../../assets/assets'

const loginpopup = ({setShowLogin}) => {
    const [currState, setCurrentState] = useState("Login")
  return (
    <div className='login-popup'>
        <form className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon}/>
            </div>
            <div className="login-popup-inputs">
                {currState==="Login"?<></>:<input type='text' placeholder='Your Name' required/>}
                <input type='text' placeholder='Your Email' required></input>
                <input type='text' placeholder='Password' required></input>
            </div>
            <button>{currState==="Sign Up"? "Create Account":"Login" }</button>
            <div className="login-popup-condition">
                <input type='checkbox' required/>
                <p>By continuing, i agree to the terms of use & privacy policy.</p>
            </div>
            {currState === "Login"
            ?<p>Create a new account?<span onClick={()=> setCurrentState("Sign Up")}> Click Here</span></p>
            :<p>Already have an account?<span onClick={()=> setCurrentState("Login")}> Login Here</span></p>
            }
        </form>
    </div>
  )
}

export default loginpopup