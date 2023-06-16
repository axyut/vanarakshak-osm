import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import AXIOS from "../../axios/custom_axios";
import { API } from "../../api/api_constants";

const Leader = () => {
	const [userData, setUserData] = useState({}); // we are getting back an object from our api
	const [top10, setTop10] = useState([]);

	const display = async () => {
		try {
			const token = localStorage.getItem("token");
			const bearerToken = `Bearer ${token}`;

			const { data } = await AXIOS.get(API.LEADERBOARD.MYRANK, {
				headers: { Authorization: bearerToken },
			});
			const response = await AXIOS.get(API.LEADERBOARD.TOPTEN);

			setUserData(data.userRank);
			setTop10(response.data.topTenRanks);
		} catch (error) {
			console.log(error);
			toast.info(error.response.data.msg || error.message || error.name);
		}
	};
	useEffect(() => {
		display();
	}, []);

	return (
		<>
			<div style={{ margin: "20px" }}>
				<h3>Top 10 Leaders</h3>
				{top10.map((userData) => (
					<div key={userData.leaderId}>
						<p>Rank: {userData.rank}</p>
						<p>Name: {userData.leaderName}</p>
						<p>PlantsCount: {userData.plantsCount}</p>
						<p>Carbon reduction: {userData.carbon}</p>
						<p>temperature: {userData.temperature}</p>
						<p>oxygen: {userData.oxygen}</p>
						<p>aqi: {userData.aqi}</p>
					</div>
				))}
			</div>
			<div style={{ margin: "20px" }}>
				<h3>My rank</h3>
				<p>Rank: {userData.rank}</p>
				<p>Name: {userData.leaderName}</p>
				<p>PlantsCount: {userData.plantsCount}</p>
				<p>Carbon reduction: {userData.carbon}</p>
				<p>temperature: {userData.temperature}</p>
				<p>oxygen: {userData.oxygen}</p>
				<p>aqi: {userData.aqi}</p>
			</div>
		</>
	);
};

export default Leader;
