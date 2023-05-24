import React from "react";
import styles from "./App.module.scss";
import MainTab from "./pages/MainTab/MainTab";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import FlightTab from "./pages/FlightTab/FlightTab";
import FlightsWrapper from "./widgets/FlightsWrapper/FlightsWrapper";
import { flights } from "./shared/mocks/flights";

const App = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.tabsBlock}>
				<BrowserRouter>
					<Routes>
						<Route path="/main" element={<MainTab />} />
						<Route path="/flight/" element={<FlightsWrapper />}>
							{flights.map((flight) => (
								<Route
									key={flight.id}
									path={flight.id + "/*"}
									element={<FlightTab />}
								/>
							))}
						</Route>
						<Route path="*" element={<Navigate to="/main" />} />
					</Routes>
				</BrowserRouter>
			</div>
		</div>
	);
};

export default App;
