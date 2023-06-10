import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AXIOS from "../axios/custom_axios";
import { API } from "../api/api_constants";
import { useState } from "react";

import "../css/login_signup.css";

const SignUp = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const { firstName, lastName, email, password, phone } = user;
  const handleInputs = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const register = async () => {
    if (!firstName || !email || !password) {
      toast.info("Please fill all the fields");
      return;
    }

    let postData = { firstName, lastName, email, password };
    AXIOS.post(API.AUTH.REGISTER, postData)
      .then((res) => {
        console.log("Res", res);

        toast.success(`Congratulations! ${firstName}. Please Log in.`);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        toast.warn("Something Went wrong!");
      });
  };

  return (
    <div className="main">
      <div>
        <div className="container">
          <h3 style={{ display: "grid", justifyContent: "center" }}>
            Create an Account.
          </h3>
          <form>
            <div className="inputFields">
              <label>*First Name</label>
              <input
                type="text"
                name="firstName"
                autoComplete="off"
                value={firstName}
                onChange={handleInputs}
              />
            </div>
            <div className="inputFields">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                autoComplete="off"
                value={lastName}
                onChange={handleInputs}
              />
            </div>
            <div className="inputFields">
              <label>*Email</label>
              <input
                type="text"
                name="email"
                autoComplete="off"
                value={email}
                onChange={handleInputs}
              />
            </div>
            <div className="inputFields">
              <label>Number</label>
              <input
                type="text"
                name="phone"
                autoComplete="off"
                value={phone}
                onChange={handleInputs}
              />
            </div>
            <div className="inputFields">
              <label>*Password</label>
              <input
                type="password"
                name="password"
                autoComplete="off"
                value={password}
                onChange={handleInputs}
              />
            </div>

            <div>
              <button className="active-btn" onClick={register} type="button">
                <span>Register Account</span>
              </button>
            </div>
          </form>
          <span>
            Already have an account?
            <a
              onClick={() => {
                navigate("/login");
              }}
            >
              Login!
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
  );
};

export default SignUp;
