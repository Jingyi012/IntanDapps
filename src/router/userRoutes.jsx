import React from "react"

import {Navigate, Outlet, useLocation} from "react-router-dom"
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
		}
	} else {
		return {
			auth: false,
			role: null,
		}
	}
}

const UserRoutes = (props) => {
    const location=useLocation();
	const {auth, role} = useAuth()
	if(auth){
        return (role === "USER") ? <> <HeaderUser/><Outlet /> </> : <Navigate to="/login" />
    }
    else{
        return <Navigate to="/login" state={{from: location}} replace />
    }
}

export default UserRoutes