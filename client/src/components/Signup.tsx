import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators, State } from '../state';
import { bindActionCreators } from "redux"
import axios from "axios";
import { useState } from "react";

export function Signup (){
    let url = 'http://localhost:3001';
    let history = useNavigate();
    
    const dispatch = useDispatch();
    const {enterPassword, enterUsername, enterProfilePicture} = bindActionCreators(actionCreators, dispatch);
    const userInput = useSelector((state: State)=> state.user);
    const userPass = useSelector((state: State)=> state.pass);
    
    const [ logon, setLogon ] = useState(false);


    const createUser = () =>{
        const signUpData = {
            username: userInput,
            password: userPass
        }   
        axios.post(`${url}/users`, signUpData).then(response => {
            // history("/dashboard")
            console.log(response)
            setLogon(true)
        })
    }   
    if(logon){
        axios.get(`${url}/users/${userInput}`).then(response =>{
            console.log(response)
        })
    }
    return(
        <div className="login-container">
            <div className="login-entry-container">
                <div className="login-head-container">
                    <h1>OTHER</h1>
                    <h1 id="side">SIDE</h1>
                </div>
                <div className="login-entry">
                    <input 
                        type="text" 
                        className="login-input" 
                        placeholder="username"
                        onChange={(e) =>{ enterUsername(e.target.value)}}
                        />
                    <input 
                        type="password" 
                        className="login-input" 
                        placeholder="password"
                        onChange={(e) =>{ enterPassword(e.target.value)}}
                        />
                <button className="login-btn" onClick={()=> createUser()}>SIGN UP</button>
                <p className="sign-up-text">Already a user? <Link to="/" className="link-text">Login</Link></p>
                </div>
            </div>
        </div>
    )
}