import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getLoginInfo } from "../utils/LoginInfo";
import {
  plantPages,
  contributionPages,
  leaderboardPages,
} from "../utils/MenuItems";
import "../css/navbar.css";

const NavigationBar = ({ setSidebarItems }) => {
  const navigate = useNavigate();
  const location = useLocation();

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
        <div className="user_info">
          <div>{/* <img src={loginInfo} alt="User" /> */}</div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
