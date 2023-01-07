import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, State } from "../state";
import { bindActionCreators } from "redux";
import axios from "axios";
import { useEffect, useState } from "react";

export function Signup() {
  let url = "https://other-side.herokuapp.com";
  let history = useNavigate();

  const dispatch = useDispatch();
  const { enterPassword, enterUsername, enterProfilePicture } =
    bindActionCreators(actionCreators, dispatch);
  const userInput = useSelector((state: State) => state.user);
  const userPass = useSelector((state: State) => state.pass);

  const [logon, setLogon] = useState(false);

  const createUser = () => {
    const signUpData = {
      username: userInput,
      password: userPass,
      profile_picture: "default_nlfrji",
    };
    if (signUpData.username === "" || signUpData.password === "") {
      alert("username or password cannot be blank");
      return history("/signup");
    }
    if (signUpData.username < 8 || signUpData.password < 8) {
      alert("username and password must be longer than 8 characters");
      return history("/signup");
    }
    axios.post(`${url}/users`, signUpData).then((response) => {
      window.setTimeout(getLoggedInUser, 1000);
    });
  };
  const getLoggedInUser = () => {
    const loginData = {
      username: userInput,
      password: userPass,
    };
    axios.post(`${url}/users/login`, loginData).then((response) => {
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("profile_picture", response.data.profile_picture);

      history("/dashboard");
    });
  };
  // useEffect(()=>{
  //     const getLoggedInUser = () =>{
  //         axios.get(`${url}/users/${userInput}`).then(response =>{
  //             console.log(response);
  //         });
  //     }
  //     getLoggedInUser();
  // }, [logon])
  return (
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
            onChange={(e) => {
              enterUsername(e.target.value);
            }}
          />
          <input
            type="password"
            className="login-input"
            placeholder="password"
            onChange={(e) => {
              enterPassword(e.target.value);
            }}
          />
          <button className="login-btn" onClick={() => createUser()}>
            SIGN UP
          </button>
          <p className="sign-up-text">
            Already a user?{" "}
            <Link to="/" className="link-text">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
