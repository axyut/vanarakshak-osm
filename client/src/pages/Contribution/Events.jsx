import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import AXIOS from "../../axios/custom_axios";
import { API } from "../../api/api_constants";

const Events = () => {
	return (
		<>
			<div style={{ margin: "20px" }}>
				<h2>Events</h2>
				<h3>Happening Right now!</h3>
				<h3>Future Events</h3>
				<h3>Past Events</h3>
			</div>
		</>
	);
};

export default Events;
