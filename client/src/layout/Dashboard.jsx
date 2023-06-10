import React, { useState } from "react";
import NavigationBar from "../components/NavBar";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Home from "../pages/Home";
import { plantPages } from "../utils/MenuItems";
import Plants from "../routes/Plants";
import Contribution from "../routes/Contribution";
import Leaderboard from "../routes/leaderboard";

const Dashboard = () => {
  const [sidebarItems, setSidebarItems] = useState(plantPages);

  return (
    <div style={{ display: "flex", position: "relative" }}>
      <Sidebar sidebarItems={sidebarItems} />
      <div style={{ width: "100%" }}>
        <NavigationBar setSidebarItems={setSidebarItems} />
        <div style={{ padding: "20px" }}>
          <Routes>
            <Route path="plants/*" element={<Plants />} />
            <Route path="contribution/*" element={<Contribution />} />
            <Route path="leaderboard/*" element={<Leaderboard />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
