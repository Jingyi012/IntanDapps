import { React } from "react";
import "./App.css";
import Router from "./router/router";
import Footer from './Component/footer/Footer';
import Header from './Component/header/Header';

function App() {
	return (
		<div className="App">
			<Header />
			<div className="body">
				<Router />
			</div>
			<Footer />
		</div>
	);
}

export default App;
