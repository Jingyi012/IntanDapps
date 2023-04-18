import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import Header from "../Component/header/Header";
import HeaderUser from "../Component/header/HeaderUser";
const useAuth = () => {
	const user = localStorage.getItem("user");
	if (user) {
		return true;
	} else {
		return false;
	}
};

const PublicRoutes = (props) => {
	const auth = useAuth();
	return auth ? (
		<>
			<HeaderUser />
			<Outlet />
		</>
	) : (
		<>
			<Header />
			<Outlet />
		</>
	);
};

export default PublicRoutes;
