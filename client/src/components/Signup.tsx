import { Link } from "react-router-dom";

export function Signup (){
    return(
        <div className="login-container">
            <div className="login-entry-container">
                <div className="login-head-container">
                    <h1>OTHER</h1>
                    <h1 id="side">SIDE</h1>
                </div>
                <div className="login-entry">
                    <input type="text" className="login-input" placeholder="username"/>
                    <input type="password" className="login-input" placeholder="password"/>
                <button className="login-btn">LOGIN</button>
                <p className="sign-up-text">Already a user? <Link to="/" className="link-text">Login</Link></p>
                </div>
            </div>
        </div>
    )
}