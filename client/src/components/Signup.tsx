import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators, State } from '../state';
import { bindActionCreators } from "redux"
import { useState } from "react";

export function Signup (){
    const dispatch = useDispatch();
    const {enterPassword, enterUsername, enterProfilePicture} = bindActionCreators(actionCreators, dispatch);
    const userInput = useSelector((state: State)=> state.user);

    const [ userUsername, setUserUsername ] = useState();

    const createUser = (userUsername: string) =>{
        enterUsername(userUsername);
    }   
    return(
        <div className="login-container">
            <h1>{userInput}</h1>
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
                        onChange={(e) =>{ createUser(e.target.value)}}
                        />
                    <input 
                        type="password" 
                        className="login-input" 
                        placeholder="password"/>
                <button className="login-btn">SIGN UP</button>
                <p className="sign-up-text">Already a user? <Link to="/" className="link-text">Login</Link></p>
                </div>
            </div>
        </div>
    )
}