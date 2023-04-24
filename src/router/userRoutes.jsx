import React from "react"

import {Navigate, Outlet, useLocation} from "react-router-dom";

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
		}
	} else {
		return {
			auth: false,
			role: null,
		}
	}
}

const UserRoutes = () => {
    const location=useLocation();
	const {auth, role} = useAuth()
	{/* If user is authenticated and the role is USER, the user can access the user pages, else the user will be directed to login page */}
	if(auth){
        return (role === "USER") ? <> <Outlet /> </> : <Navigate to="/login" />
    }
    else{
        return <Navigate to="/login" state={{from: location}} replace />
    }
}

export default UserRoutes;