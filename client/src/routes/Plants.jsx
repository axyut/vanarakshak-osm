import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Plants/Dashboard";
import Community from "../pages/Plants/Community";
import AddPlant from "../pages/Plants/AddPlant";
import Report from "../pages/Plants/Report";
import Other from "../pages/Plants/Other";

const PlantRoute = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="community" element={<Community />} />
      <Route path="add_plants" element={<AddPlant />} />
      <Route path="report" element={<Report />} />
      <Route path="others" element={<Other />} />
    </Routes>
  );
};

export default PlantRoute;
