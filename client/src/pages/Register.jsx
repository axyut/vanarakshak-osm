import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AXIOS from "../axios/custom_axios";
import { API } from "../api/api_constants";
import { useState } from "react";

import "../css/login_signup.css";
import Sapling from "../Assets/Images/Sapling.jpg";

const Register = () => {
	let navigate = useNavigate();
	const [user, setUser] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		password: "",
	});
	const { firstName, lastName, email, password, phone } = user;
	const handleInputs = (event) => {
		const { name, value } = event.target;
		setUser({ ...user, [name]: value });
	};

	const register = async () => {
		if (!firstName || !email || !password) {
			toast.info("Please fill all the fields");
			return;
		}

		let postData = { firstName, lastName, email, password };
		AXIOS.post(API.AUTH.REGISTER, postData)
			.then((res) => {
				toast.success(`Congratulations! ${firstName}. Please Log in.`);
				navigate("/login");
			})
			.catch((err) => {
				console.log(err);
				toast.warn("Something Went wrong!");
			});
	};

	return (
		<div>
			<div className="main">
				<div>
					<div className="container">
						<h3
							style={{
								display: "grid",
								justifyContent: "center",
							}}
						>
							Create an Account.
						</h3>
						<form>
							<div className="inputFields">
								<label>*First Name</label>
								<input
									type="text"
									name="firstName"
									autoComplete="off"
									value={firstName}
									onChange={handleInputs}
								/>
							</div>
							<div className="inputFields">
								<label>Last Name</label>
								<input
									type="text"
									name="lastName"
									autoComplete="off"
									value={lastName}
									onChange={handleInputs}
								/>
							</div>
							<div className="inputFields">
								<label>*Email</label>
								<input
									type="text"
									name="email"
									autoComplete="off"
									value={email}
									onChange={handleInputs}
								/>
							</div>
							<div className="inputFields">
								<label>Number</label>
								<input
									type="text"
									name="phone"
									autoComplete="off"
									value={phone}
									onChange={handleInputs}
								/>
							</div>
							<div className="inputFields">
								<label>*Password</label>
								<input
									type="password"
									name="password"
									autoComplete="off"
									value={password}
									onChange={handleInputs}
								/>
							</div>

							<div>
								<button
									className="active-btn"
									onClick={register}
									type="button"
								>
									<span>Register Account</span>
								</button>
							</div>
						</form>
						<span>
							Already have an account?
							<a
								onClick={() => {
									navigate("/login");
								}}
							>
								Login!
							</a>
						</span>
					</div>
				</div>

				<div className="container">
					<div className="container-div">
						<div>
							<h1>Vanarakshak</h1>
							<span>Open Sourcing with Nature!</span>

							<h3>
								Dedicated to mitigating the environmental impact
								of the IT sector by utilizing technology for
								nature conservation and promoting
								sustainability.
							</h3>
							<span>Join us!</span>
						</div>
						<div>
							<img alt="TreePlanting" src={Sapling} />
						</div>
					</div>
				</div>
			</div>
			<h1 style={{ paddingLeft: "40px" }}>About Us</h1>
			<div className="container">
				<h2>ABOUT THE PROJECT</h2>
				<span>
					We propose a comprehensive tree management platform that
					integrates OpenStreetMap (OSM) data. With a focus on tree
					conservation and urban greening, our platform empowers
					individuals, communities, and organizations to actively
					engage in tree planting campaigns, preserve trees in urban
					planning, and assess tree-based ecosystem services. Through
					advanced features such as tree inventory, mapping, and
					species identification, we provide the necessary tools to
					make a positive environmental impact. Our mission is to
					foster environmental sustainability, support social welfare
					programs, and create a greener future by using statistics
					tools to collect data and provide a way to reward
					contributors based on the number of trees they plant through
					a user-friendly application (web or mobile) that efficiently
					manages tree-related data. Join us in our journey to merge
					technology with environmental sustainability and contribute
					significantly to a resilient and sustainable future.
				</span>
				<h2>PROBELM YOU ARE SOLVING</h2>
				<span>
					The main problem with social welfare programs lies in
					people's lack of responsibility and their race to take
					ownership of contribution from the general mass. Yearly,
					thousands of trees and forests, cultivable land and tree
					canopy areas are being destroyed even with the efforts from
					countless NGOs INGOs which are not so open about what
					they’ve done and how they function as an organization. Our
					main objective is to maintain an online record of every
					plant in a region, plant people would like to grow, aiming
					to tackle major issues such as deforestation, forest fires,
					air pollution and features to provide solutions to minor
					issues related to farming and cultivation. Planting a few
					trees alone cannot purify the air, but by making it open
					source, we could encourage community-wide contributions to
					create a larger impact. What we’re trying to accomplish is
					not just open source as in technical statements but a
					community effort that can pave ways to green future for the
					next generation.
				</span>
				<h2> USE OF OSM</h2>
				<span>
					OpenStreetMap (OSM) can be utilized in this project by
					evaluating geolocation information and transforming it based
					on plants and trees data. This integration would
					significantly enhance worldwide surveys and data collection
					efforts, allowing for a comprehensive assessment of tree
					distribution and characteristics across different regions.
					To ensure privacy and respect land ownership, it is
					essential to map trees in public spaces or obtain the
					landowner's permission. Furthermore, OSM can be utilized to
					calculate the percentage of land covered by green areas,
					analyze the distribution of green spaces in various regions,
					and assess the proximity of green spaces to specific
					locations. By incorporating OSM data, it becomes possible to
					quantify the ecosystem services provided by trees, such as
					carbon sequestration and stormwater management. This
					information is valuable for decision-making processes,
					impact assessments, and advocacy efforts, as it can be
					integrated with other environmental factors such as air
					quality and water bodies. Lastly, visualizing the positive
					impact of trees through OSM helps effectively communicate
					their benefits to users.
				</span>
				<h2>ABOUT TEAM</h2>
				<span>
					We are a team of four IT students with a wide range of
					skills ranging from backend development, frontend
					development, UI/UX designing and database implementation. We
					are passionate about innovation and are eager to showcase
					our talents. We have been working hard to prepare for the
					upcoming hackathon and are confident that we have what it
					takes to create a winning project. We are a team of
					innovators, collaborators, and problem-solvers who are
					excited to work together to create something truly special.
					We are determined to succeed and are ready to pave our path
					to Kathmandu valley.
				</span>
			</div>
		</div>
	);
};

export default Register;
