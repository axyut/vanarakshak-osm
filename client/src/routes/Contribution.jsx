import React from "react";
import { Routes, Route } from "react-router-dom";
import Events from "../pages/Contribution/Events";
import Report from "../pages/Contribution/Report";
import Donate from "../pages/Contribution/Donate";

const Contribution = () => {
	return (
		<Routes>
			<Route path="events" element={<Events />} />
			<Route path="report" element={<Report />} />
			<Route path="donate" element={<Donate />} />
		</Routes>
	);
};

export default Contribution;
