import React, { useState } from "react";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMapEvents,
} from "react-leaflet";

import { toast } from "react-toastify";

import AXIOS from "../../axios/custom_axios";
import { API } from "../../api/api_constants";
import "../../css/map.css";

import L from "leaflet";
import markerIcon from "../../Assets/Icons/seed.svg";
import axios from "axios";

const initialPosition = [27.69202, 84.43701];
// Custom component to handle map events
const CustomMapEvents = ({ onClick }) => {
	useMapEvents({
		click: onClick,
	});

	return null;
};

const Contribute = () => {
	const [markerPosition, setMarkerPosition] = useState([0, 0]);
	const [locationName, setLocationName] = useState("");

	const [plant, setPlant] = useState({
		plantName: "",

		PlantType: "",
		nickName: "",
		privacy: "",
	});
	const { plantName, plantType, nickName, privacy } = plant;

	const handleInputs = (event) => {
		const { name, value } = event.target;
		setPlant({ ...plant, [name]: value });
	};

	const addPlant = async () => {
		const area = {
			place: locationName,
			location: [markerPosition[0], markerPosition[1]],
		};

		if (!plantName || !plantType || !nickName || !area) {
			toast.info("Please fill all the fields");
			return;
		}

		console.log(plantName, plantType, nickName, area);

		let postData = {
			plantName,
			plantType,
			status: "OKAY",
			nickName,
			area,
		};
		AXIOS.post(API.PLANT.ONE, postData)
			.then((res) => {
				toast.success(`${res.data.msg}`);
			})
			.catch((error) => {
				console.log(error);
				toast.warn(
					error.response.data.msg ||
						error.message ||
						error.name ||
						"Something Went wrong!"
				);
			});
	};

	const handleMapClick = (e) => {
		const { lat, lng } = e.latlng;
		setMarkerPosition([lat, lng]);

		const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

		axios
			.get(url)
			.then((res) => {
				const data = res.data;
				if (data && data.display_name) {
					setLocationName(data.display_name);
				}
			})
			.catch((error) => {
				console.error("Error retrieving location information:", error);
			});
	};

	const customMarkerIcon = L.icon({
		iconUrl: markerIcon,
		iconSize: [25, 25],
		iconAnchor: [15, 30],
	});

	return (
		<>
			<div style={{ margin: "20px" }}>
				<h2>Donate a tree, Contribute to the world</h2>
				<p>
					Team Vanarakshak will plant a tree, plant of your choice,
					your name, at your desired location. <br /> It can a memory,
					gift as well as a tribute to your beloved person.{" "}
				</p>
			</div>
			<div>
				<h1>Add Plant</h1>
				<div className="mapDiv">
					<MapContainer
						center={initialPosition}
						zoom={13}
						scrollWheelZoom={true}
						className="mapContainer"
					>
						<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
						<CustomMapEvents onClick={handleMapClick} />
						<Marker
							position={markerPosition}
							icon={customMarkerIcon}
						>
							<Popup>
								Latitude: {markerPosition[0]}
								<br />
								Longitude: {markerPosition[1]}
							</Popup>
						</Marker>
					</MapContainer>
				</div>
				<form>
					<div>
						<input
							placeholder="Plant name"
							type="text"
							name="plantName"
							autoComplete="off"
							value={plantName}
							onChange={handleInputs}
						></input>
						<input
							placeholder="Plant Type"
							type="text"
							name="plantType"
							autoComplete="off"
							value={plantType}
							onChange={handleInputs}
						></input>

						<input
							placeholder="Nick name"
							type="text"
							name="nickName"
							autoComplete="off"
							value={nickName}
							onChange={handleInputs}
						></input>
						<input
							placeholder="Public or Private"
							type="text"
							name="privacy"
							autoComplete="off"
							value={privacy}
							onChange={handleInputs}
						></input>

						<button onClick={addPlant} type="button">
							Plant
						</button>
					</div>
				</form>
				<div>
					<h3>
						Location: {locationName} <br />
						Latitude: {markerPosition[0]} <br />
						Longitude: {markerPosition[1]}
					</h3>
				</div>
			</div>
		</>
	);
};

export default Contribute;
