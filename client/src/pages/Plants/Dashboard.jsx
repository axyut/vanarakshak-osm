import React, { useEffect, useState } from "react";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMapEvents,
	Tooltip,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AXIOS from "../../axios/custom_axios";
import { API } from "../../api/api_constants";
import "../../css/map.css";

import L from "leaflet";
import plantIcon from "../../Assets/Icons/tree-solid.svg";
import gardenIcon from "../../Assets/Icons/forest.svg";

const Dashboard = () => {
	const initialPosition = [27.69202, 84.43701];

	const [userStats, setUserStats] = useState({});
	const [userData, setUserData] = useState({
		plantsCount: null,
		user: "",
		plants: [],
		gardens: [],
	});

	const display = async () => {
		try {
			const { data } = await AXIOS.get(API.PLANT.ALLPLANTS);
			const response = await AXIOS.get(API.LEADERBOARD.MYRANK);

			setUserData(data);
			setUserStats(response.data.userRank);
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

	const plantsIcon = L.icon({
		iconUrl: plantIcon,
		iconSize: [15, 15],
		iconAnchor: [15, 30],
	});
	const gardensIcon = L.icon({
		iconUrl: gardenIcon,
		iconSize: [20, 20],
		iconAnchor: [15, 30],
	});

	return (
		<>
			<div>
				<div className="mapContainer">
					<h1>Plants Count: {userData.plantsCount} </h1>
					<MapContainer
						center={initialPosition}
						zoom={14}
						scrollWheelZoom={true}
						className="mapContainer"
					>
						<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
						{userData.plants.map((user, index) => (
							<Marker
								icon={plantsIcon}
								position={user.area.location}
								key={index}
							>
								<Tooltip>
									Given name: {user.nickName} <br />
									Plant name: {user.plantName}
									<br />
									Plant type: {user.plantType}
									<br />
									Status: {user.status}
								</Tooltip>
							</Marker>
						))}
						{userData.gardens.map((user, index) => (
							<Marker
								icon={gardensIcon}
								position={user.area.location}
								key={index}
							>
								<Tooltip>
									{user.plantsCount} plants in{" "}
									{user.gardenName} garden. <br />
									Plant type: {user.plantType}
									<br />
									Status: {user.status} <br />
									Radius : {user.area.radius}
								</Tooltip>
							</Marker>
						))}
					</MapContainer>
				</div>

				<div>
					<h2>{userStats.leaderName}</h2>

					<h3>
						Your plants will decrease {userStats.carbon} Kgs of
						Carbon per year.
					</h3>
					<h3>
						Your reduced {userStats.temperature}°c temperature in
						your immediate vicinity.
					</h3>
					<h3>
						Your Plants will release {userStats.oxygen} Kgs of
						Oxygen per year.
					</h3>
					<h3>
						You helped your surrounding AQI improve by{" "}
						{userStats.aqi}%
					</h3>
				</div>
				<div>
					<button>Share</button>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
