import { NavLink } from "react-router-dom";
import React from "react";
import "./NavbarU.css";

function NavbarU() {
	return (
		<div className="userNav">
			<ul className="userNav-container">
				<li className="bar">
					<NavLink className="uNavMenu" to="/user/senerai-program-sedia-ada">
						Senarai Program Sedia Ada
					</NavLink>
				</li>
				<li className="bar">
					<NavLink className="uNavMenu" to="/user/rekod-permohonan">
						Rekod Permohonan
					</NavLink>
				</li>
				<li>
					<NavLink className="uNavMenu" to="/user/profile">Profile</NavLink>
				</li>
			</ul>
		</div>
	);
}

export default NavbarU;
