import { React } from "react";
import "./App.css";
import Router from "./router/router";
import Footer from './Component/footer/Footer'

function App() {
	return (
		<div className="App">
			<div className="body">
				<Router />
			</div>
			<Footer />
		</div>
	);
}

export default App;
