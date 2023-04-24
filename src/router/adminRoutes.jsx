import React from "react";

import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
	//get user from localstorage, if there exist user means the user had logged in
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

const AdminRoutes = () => {
	const { auth, role } = useAuth();
	{/* If user is authenticated and the role is ADMIN, the user can access the admin pages, else direct to login page */}
	if (auth) {
		return role === "ADMIN" ? (
			<>
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
