import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getLoginInfo } from "../utils/LoginInfo";
import {
  plantPages,
  contributionPages,
  leaderboardPages,
} from "../utils/MenuItems";
import "../css/navbar.css";
import Avatarr from "../Assets/Images/Avatarr.png";
import ArrowDown from "../Assets/Icons/arrowDown.svg";

const NavigationBar = ({ setSidebarItems }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [toggle, setToggle] = useState(false);

  const [loginInfo, setLoginInfo] = useState(getLoginInfo());

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.info("Logged Out!");
    navigate("/login");
  };

  let navbarArr = ["Plants", "Contribution", "Leaderboard"];
  const handleLinks = (title) => {
    if (title === "Plants") {
      setSidebarItems(plantPages);
      navigate("/dashboard/plants/dashboard", { state: { parent: "Plants" } });
    }
    if (title === "Contribution") {
      setSidebarItems(contributionPages);
      navigate("/dashboard/contribution/your_contribution", {
        state: { parent: "Contribution" },
      });
    }

    if (title === "Leaderboard") {
      setSidebarItems(leaderboardPages);
      navigate("/dashboard/leaderboard/leader", {
        state: { parent: "Leaderboard" },
      });
    }
  };

  useEffect(() => {
    window.addEventListener("click", () => setToggle(false));
    return () => window.removeEventListener("click", () => setToggle(false));
  }, []);

  return (
    <nav className="navbar">
      <div className="nav_container">
        <ul>
          {navbarArr?.map((item) => (
            <li
              key={item}
              onClick={() => handleLinks(item)}
              className={`${location.state?.parent === item ? "active" : ""}`}
            >
              {item}
            </li>
          ))}

          {/* <li onClick={handleLogout}>Logout</li> */}
        </ul>
        <div
          className="user_info"
          onClick={(e) => {
            e.stopPropagation();
            setToggle(!toggle);
          }}
        >
          <img src={Avatarr} alt="User" />
          <div className="title">{loginInfo?.firstName}</div>
          <img
            alt="Arrow"
            src={ArrowDown}
            style={{ flexShrink: 0, width: "23px", height: "23px" }}
          />
          <ul
            onClick={(e) => e.stopPropagation()}
            className="list"
            style={{
              opacity: toggle ? 1 : 0,
              top: toggle ? "70px" : "50px",
              visibility: toggle ? "visible" : "hidden",
            }}
          >
            <li
              onClick={() => {
                setToggle(false);
              }}
            >
              Setting
            </li>
            <li
              onClick={() => {
                setToggle(false);
                setTimeout(() => handleLogout(), 200);
              }}
            >
              Log Out
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
