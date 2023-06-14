import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "../../css/map.css";
const Dashboard = () => {
	const initialPosition = [27.69202, 84.43701];

	return (
		<>
			<div>
				<div className="mapContainer">
					<h1>My Map</h1>
					<MapContainer
						center={initialPosition}
						zoom={10}
						scrollWheelZoom={false}
						className="mapContainer"
					>
						<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
						<Marker position={initialPosition}>
							<Popup>
								Birendra Multiple Campus <br /> Naubigha Bhawan.
							</Popup>
						</Marker>
					</MapContainer>
				</div>
				<div>
					<button>Share</button>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
