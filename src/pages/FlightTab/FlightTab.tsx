import React, { useState } from "react";
import styles from "./FlightTab.module.scss";
import cx from "classnames";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import CustomDatepicker from "../../widgets/CustomDatepicker/CustomDatepicker";
import TaskOne from "./TaskOne/TaskOne";
import TaskTwo from "./TaskTwo/TaskTwo";
import TaskThree from "./TaskThree/TaskThree";



const FlightTab = () => {
	const tabStyles = ({ isActive }: { isActive: boolean }) =>
		isActive
			? cx(styles.navigation__tab, styles.navigation__tab_active)
			: styles.navigation__tab;

	const [startDate, setStartDate] = useState<Date | null>(new Date());
	const [endDate, setEndDate] = useState<Date | null>(new Date());

	return (
		<div className={styles.tabWrapper}>
			<NavLink to="/" className={styles.breadcrumbs}>{"< Главная"}</NavLink>
			<nav className={styles.navigation}>
				<NavLink to="task-1" className={tabStyles}>
					Динамика бронирования
				</NavLink>
				<NavLink to="task-2" className={tabStyles}>
					Сезоны
				</NavLink>
				<NavLink to="task-3" className={tabStyles}>
					Профиль спроса
				</NavLink>
				<NavLink to="task-4" className={tabStyles}>
					Прогнозирование
				</NavLink>
			</nav>
			<div className={styles.wrapper}>
				<div className={styles.header}>
					<h2 className={styles.header__title}>Рейс SU 0019</h2>
					<h2 className={styles.header__destination}>
						Москва - Сочи
					</h2>
				</div>
				<Routes>
					<Route path="/task-1" element={<TaskOne/>}/>
					<Route path="/task-2" element={<TaskTwo/>}/>
					<Route path="/task-3" element={<TaskThree/>}/>
					<Route path="/task-4" element={<TaskOne/>}/>
					<Route path="*" element={<Navigate to="task-1"/>}/>
				</Routes>
				<div className={styles.dates}>
					<CustomDatepicker
						date={startDate}
						setDate={setStartDate}
						maxDate={endDate}
					/>
					<CustomDatepicker
						date={endDate}
						setDate={setEndDate}
						minDate={startDate}
					/>
				</div>
			</div>
		</div>
	);
};

export default FlightTab;
