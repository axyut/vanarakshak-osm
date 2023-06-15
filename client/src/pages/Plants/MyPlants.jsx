import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AXIOS from "../../axios/custom_axios";
import { API } from "../../api/api_constants";
import "../../css/map.css";

import plantIcon from "../../Assets/Icons/tree-solid.svg";
import gardenIcon from "../../Assets/Icons/forest.svg";

const MyPlants = () => {
	const [userData, setUserData] = useState({
		plantsCount: 0,
		user: "",
		plants: [],
		gardens: [],
	});

	const display = async () => {
		try {
			const token = localStorage.getItem("token");
			const bearerToken = `Bearer ${token}`;

			const { data } = await AXIOS.get(API.PLANT.ALLPLANTS, {
				headers: { Authorization: bearerToken },
			});
			const response = await AXIOS.get(API.LEADERBOARD.MYRANK, {
				headers: { Authorization: bearerToken },
			});

			setUserData(data);
		} catch (error) {
			console.log(error);
			toast.info(
				error.response.data.msg ||
					error.message ||
					error.name ||
					"Error! Please try again"
			);
		}
	};
	useEffect(() => {
		display();
	}, []);

	return (
		<>
			<div>
				<div>
					<h1>
						{userData.user}'s Plants Count: {userData.plantsCount}{" "}
					</h1>
					{userData.plants.map((user, index) => (
						<div>
							<h3>Name:{user.nickName}</h3>
							<h3>Age:{user.createdAt}</h3>
							<h3>Status:{user.nickName}</h3>
							<button>Edit</button>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default MyPlants;
