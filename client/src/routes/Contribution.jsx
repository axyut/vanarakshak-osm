import React from "react";
import { Routes, Route } from "react-router-dom";
import Events from "../pages/Contribution/Events";
import Report from "../pages/Contribution/Report";
import Contribute from "../pages/Contribution/Contribute";

const Contribution = () => {
	return (
		<Routes>
			<Route path="events" element={<Events />} />
			<Route path="report" element={<Report />} />
			<Route path="contribute" element={<Contribute />} />
		</Routes>
	);
};

export default Contribution;
