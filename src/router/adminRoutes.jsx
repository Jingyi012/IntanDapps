import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import HeaderUser from "../Component/header/HeaderUser";

const useAuth = () => {
	//get item from localstorage
	let user;
	const _user = localStorage.getItem("user");

	if (_user) {
		user = JSON.parse(_user);
		console.log("user", user);
	}
	if (user) {
		return {
			auth: true,
			role: user.role,
		};
	} else {
		return {
			auth: false,
			role: null,
		};
	}
};

const AdminRoutes = (props) => {
	const { auth, role } = useAuth();

	if (auth) {
		return role === "ADMIN" ? (
			<>
				<HeaderUser />
				<Outlet />
			</>
		) : (
			<Navigate to="/login" />
		);
	} else {
		return <Navigate to="/login" />;
	}
};

export default AdminRoutes;
