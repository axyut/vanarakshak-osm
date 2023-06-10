import React from "react";
import { Routes, Route } from "react-router-dom";
import YourContribution from "../pages/Contribution/YourContribution";
import CommunityContribution from "../pages/Contribution/CommunityContribution";

const Contribution = () => {
  return (
    <Routes>
      <Route path="your_contribution" element={<YourContribution />} />
      <Route
        path="community_contributiion"
        element={<CommunityContribution />}
      />
    </Routes>
  );
};

export default Contribution;
