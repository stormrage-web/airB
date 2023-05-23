import React from "react";
import styles from "./App.module.scss";
import CustomCheckbox from "./widgets/CustomCheckbox/CustomCheckbox";
import MainTab from "./pages/MainTab/MainTab";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import FlightTab from "./pages/FlightTab/FlightTab";

const App = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.tabsBlock}>
				<BrowserRouter>
					<Routes>
						<Route path="/main" element={<MainTab />} />
						<Route path="/flight/*" element={<FlightTab />} />
						<Route path="*" element={<Navigate to="/main" />} />
					</Routes>
				</BrowserRouter>
			</div>
			<CustomCheckbox>asd</CustomCheckbox>
		</div>
	);
};

export default App;
