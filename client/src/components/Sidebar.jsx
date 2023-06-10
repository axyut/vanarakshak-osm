import { NavLink } from "react-router-dom";
import "../css/sidebar.css";
import Logo from "../Assets/Images/Logo.png";

export default function Sidebar({ sidebarItems }) {
	return (
		<div className="sidebar_main">
			<aside className="sidebar">
				<div className="logo_bar">
					<img src={Logo} alt="Logo" />
					<h2>Vanrakshak</h2>
				</div>
				<ul>
					{sidebarItems?.map((i) => (
						<li key={i?.link}>
							<NavLink
								to={i?.link}
								state={{ parent: i?.parent }}
								className={({ isActive, isPending }) =>
									isActive ? "active" : "not_active"
								}
							>
								<p>
									<img src={i?.icon} alt={i?.label} />
								</p>
								<p>{i?.label}</p>
							</NavLink>
						</li>
					))}
				</ul>
			</aside>
		</div>
	);
}
