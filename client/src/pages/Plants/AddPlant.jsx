import React, { useState } from "react";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMapEvents,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AXIOS from "../../axios/custom_axios";
import { API } from "../../api/api_constants";
import "../../css/map.css";

import L from "leaflet";
import markerIcon from "../../Assets/Icons/seed.svg";

const initialPosition = [27.69202, 84.43701];

const AddPlant = () => {
	let navigate = useNavigate();
	const [markerPosition, setMarkerPosition] = useState(initialPosition);

	const [plant, setPlant] = useState({
		plantName: "",
		plantStatus: "",
		PlantType: "",
		nickName: "",
	});
	const { plantName, plantType, plantStatus, nickName } = plant;

	const handleInputs = (event) => {
		const { name, value } = event.target;
		setPlant({ ...plant, [name]: value });
	};

	const addPlant = async () => {
		const location = [markerPosition[0], markerPosition[1]];
		if (
			!plantName ||
			!plantType ||
			!plantStatus ||
			!nickName ||
			!location
		) {
			toast.info("Please fill all the fields");
			return;
		}

		const token = localStorage.getItem("token");
		const bearerToken = `Bearer ${token}`;

		console.log(plantName, plantType, plantStatus, nickName, location);

		let postData = {
			plantName,
			plantType,
			status: plantStatus,
			nickName,
			location,
		};
		AXIOS.post(API.PLANT.ONE, postData, {
			headers: { Authorization: bearerToken },
		})
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
		console.log(markerPosition);
	};

	const customMarkerIcon = L.icon({
		iconUrl: markerIcon,
		iconSize: [25, 25],
		iconAnchor: [15, 30],
	});

	return (
		<>
			<div>
				<h1>Add Plant</h1>
				<div>
					<form>
						<div>
							<input
								placeholder="Plant Type"
								type="text"
								name="plantType"
								autoComplete="off"
								value={plantType}
								onChange={handleInputs}
							></input>
							<input
								placeholder="Plant name"
								type="text"
								name="plantName"
								autoComplete="off"
								value={plantName}
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
							<p>
								Tree Location: Latitude: {markerPosition[0]}
								Longitude: {markerPosition[1]}
							</p>
							<button onClick={addPlant} type="button">
								Plant
							</button>
						</div>
					</form>
					<div className="mapDiv">
						<MapContainer
							center={initialPosition}
							zoom={13}
							scrollWheelZoom={false}
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
