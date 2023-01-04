import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, State } from "../state";
import { bindActionCreators } from "redux";
import axios from "axios";

export function Login() {
  let url = "https://other-side.herokuapp.com";
  let history = useNavigate();

  const dispatch = useDispatch();
  const { enterPassword, enterUsername, enterProfilePicture } =
    bindActionCreators(actionCreators, dispatch);
  const userInput = useSelector((state: State) => state.user);
  const userPass = useSelector((state: State) => state.pass);

  const getLoggedInUser = () => {
    const loginData = {
      username: userInput,
      password: userPass,
    };
    if (loginData.username === "" || loginData.password === "") {
      alert("username or password cannot be blank");
      return history("/");
    }
    console.log(loginData);
    axios.post(`${url}/users/login`, loginData).then((response) => {
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("username", response.data.username);
      console.log(response);
      if (response.data.error) {
        return alert(response.data.error);
      } else {
        history("/dashboard");
      }
    });
  };
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
          <button className="login-btn" onClick={() => getLoggedInUser()}>
            LOGIN
          </button>
          <p className="sign-up-text">
            Are you a new user?{" "}
            <Link to="/signup" className="link-text">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
