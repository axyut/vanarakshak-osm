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

const AddPlant = () => {
	const [markerPosition, setMarkerPosition] = useState([0, 0]);
	const [locationName, setLocationName] = useState("");

	const [plant, setPlant] = useState({
		plantName: "",
		plantStatus: "",
		PlantType: "",
		nickName: "",
		privacy: "",
	});
	const { plantName, plantType, plantStatus, nickName, privacy } = plant;

	const [garden, setGarden] = useState({
		gardenName: "",
		gardenStatus: "",
		gardenPlantType: "",
		plantsCount: "",
		gardenPrivacy: "",
		radius: 0,
	});
	const {
		gardenName,
		gardenPlantType,
		gardenStatus,
		plantsCount,
		gardenPrivacy,
		radius,
	} = garden;

	const handleInputs = (event) => {
		const { name, value } = event.target;
		setPlant({ ...plant, [name]: value });
	};

	const handleGardenInputs = (event) => {
		const { name, value } = event.target;
		setGarden({ ...garden, [name]: value });
	};

	const addPlant = async () => {
		const area = {
			place: locationName,
			location: [markerPosition[0], markerPosition[1]],
		};

		if (!plantName || !plantType || !plantStatus || !nickName || !area) {
			toast.info("Please fill all the fields");
			return;
		}

		console.log(plantName, plantType, plantStatus, nickName, area);

		let postData = {
			plantName,
			plantType,
			status: plantStatus,
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

	const addGarden = async () => {
		const area = {
			place: locationName,
			radius: radius,
			location: [markerPosition[0], markerPosition[1]],
		};
		if (
			!plantsCount ||
			!gardenName ||
			!gardenPlantType ||
			!gardenStatus ||
			!area
		) {
			toast.info("Please fill all the fields");
			return;
		}

		console.log(
			gardenName,
			gardenPlantType,
			gardenStatus,
			plantsCount,
			gardenPrivacy,
			area
		);

		let postData = {
			plantsCount,
			gardenName,
			plantType: gardenPlantType,
			status: gardenStatus,
			//gardenPrivacy,
			area,
		};
		AXIOS.post(API.PLANT.MANY, postData)
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

	// MAP related

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
			<div>
				<div>
					<h1>Add Plant</h1>
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
								placeholder="Status"
								type="text"
								name="plantStatus"
								autoComplete="off"
								value={plantStatus}
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
					<div className="mapDiv">
						<MapContainer
							center={initialPosition}
							zoom={13}
							scrollWheelZoom={true}
							className="mapContainer"
							zoomControl={false}
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
				</div>
				<div>
					<h1>Add a Garden</h1>
					<form>
						<div>
							<input
								placeholder="Garden name"
								type="text"
								name="gardenName"
								autoComplete="off"
								value={gardenName}
								onChange={handleGardenInputs}
							></input>
							<input
								placeholder="Plant Type"
								type="text"
								name="gardenPlantType"
								autoComplete="off"
								value={gardenPlantType}
								onChange={handleGardenInputs}
							></input>

							<input
								placeholder="Status"
								type="text"
								name="gardenStatus"
								autoComplete="off"
								value={gardenStatus}
								onChange={handleGardenInputs}
							></input>
							<input
								placeholder="No. of Plants"
								type="text"
								name="plantsCount"
								autoComplete="off"
								value={plantsCount}
								onChange={handleGardenInputs}
							></input>
							<input
								placeholder="Public or Private"
								type="text"
								name="gardenPrivacy"
								autoComplete="off"
								value={gardenPrivacy}
								onChange={handleGardenInputs}
							></input>
							<input
								placeholder="Radius of garden"
								type="text"
								name="radius"
								autoComplete="off"
								value={radius}
								onChange={handleGardenInputs}
							></input>

							<button onClick={addGarden} type="button">
								Plant
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

// Custom component to handle map events
const CustomMapEvents = ({ onClick }) => {
	useMapEvents({
		click: onClick,
	});

	return null;
};

export default AddPlant;
