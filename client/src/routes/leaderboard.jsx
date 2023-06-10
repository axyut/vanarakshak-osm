import React from "react";
import { Routes, Route } from "react-router-dom";
import Leader from "../pages/LeaderBoard/Leader";
import Community from "../pages/LeaderBoard/Community";

const leaderboard = () => {
  return (
    <Routes>
      <Route path="leader" element={<Leader />} />
      <Route path="community" element={<Community />} />
    </Routes>
  );
};

export default leaderboard;
