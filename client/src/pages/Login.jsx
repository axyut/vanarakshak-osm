import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AXIOS from "../axios/custom_axios";
import { API } from "../api/api_constants";
import { getLoginInfo } from "../utils/LoginInfo";

import "../css/login_signup.css";

const Login = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  const loginApp = async () => {
    const { email, password } = user;
    if (email == "" || password == "") {
      toast.info("Please fill the information");
      return;
    }
    try {
      const response = await AXIOS.post(API.AUTH.LOGIN, {
        email,
        password,
      });
      // Setting Up recieved token for the user
      localStorage.setItem("token", response.data.token);
      dispatchEvent(new Event("storage"));
      const firstName = getLoginInfo()?.firstName;
      toast.success(`Welcome Back! ${firstName}`);
      navigate("/dashboard/plants/dashboard", { state: { parent: "Plants" } });
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
      toast.warn(error.response.data.msg || "Login Failed");
    }
  };
  return (
    <>
      <div className="main">
        <div>
          <div className="container">
            <h3
              style={{
                display: "grid",
                justifyContent: "center",
              }}
            >
              Account Login.
            </h3>
            <form>
              <div className="inputFields">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="chad@mail.com"
                />
              </div>
              <div className="inputFields">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="********"
                />
              </div>
              <div>
                <button className="active-btn" onClick={loginApp} type="button">
                  <span>Login</span>
                </button>
              </div>
            </form>
            <span>
              Haven't Registered Yet?
              <a onClick={() => navigate("/signUp")}>Sign Up!</a>
            </span>

            <span>
              <a href="https://github.com/axyut/osm" target="_blank">
                About?
              </a>
            </span>
            <span>
              <a href={import.meta.env.VITE_BACKEND + "/api"} target="_blank">
                API?
              </a>
            </span>
          </div>
        </div>
        <div className="container">
          <h1>OSM Hackfest Project Means planting the trees</h1>
          <h2>About the project</h2>
          <h3>Vision</h3>
          <span>Mission</span>
          <label>Idea</label>
          <p>OSM Hackfest Project</p>
        </div>
      </div>
      {/* <div>
				<h1>About the Project</h1>
			</div> */}
    </>
  );
};

export default Login;
