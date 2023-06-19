import React, {useState} from "react";
import styles from "./App.module.scss";
import MainTab from "./pages/MainTab/MainTab";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import FlightTab from "./pages/FlightTab/FlightTab";
import FlightsWrapper from "./widgets/FlightsWrapper/FlightsWrapper";
import {Flight, flightsMock} from "./shared/mocks/flights";
import "react-loading-skeleton/dist/skeleton.css";

const App = () => {
    const [flights] = useState<Flight[]>(flightsMock);

    return (
        <div className={styles.wrapper}>
            <div className={styles.tabsBlock}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MainTab flights={flights}/>}/>
                        <Route path="/flight/" element={<FlightsWrapper/>}>
                            {flights.map((flight) => (
                                <Route
                                    key={flight.title + flight.time}
                                    path={flight.title + flight.time + "/*"}
                                    element={<FlightTab flight={flight.title} direction={flight.direction}
                                                        classes={flight.classes}/>}
                                />
                            ))}
                        </Route>
                        <Route path="*" element={<Navigate to="/"/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
};

export default App;
