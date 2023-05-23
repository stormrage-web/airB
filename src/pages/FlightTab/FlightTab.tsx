import React, { useState } from "react";
import styles from "./FlightTab.module.scss";
import cx from "classnames";
import { NavLink } from "react-router-dom";
import { CustomSelect } from "../../widgets/CustomSelect/CustomSelect";
import { Option } from "../../widgets/CustomSelect/CustomOption/CustomOption";
import { BarChart, Tooltip, YAxis, XAxis, CartesianGrid, Bar, Brush } from "recharts";
import "react-datepicker/dist/react-datepicker.css";
import { graph1 } from "../../shared/mocks/graph1";
import CustomDatepicker from "../../widgets/CustomDatepicker/CustomDatepicker";

const data = graph1;

const classes: Option[] = [
	{
		value: "0",
		title: "Эконом",
	},
	{
		value: "1",
		title: "Бизнес",
	},
];

const FlightTab = () => {
	const [selectedClass, setSelectedClass] = useState<string | null>(null);
	const tabStyles = ({ isActive }: { isActive: boolean }) =>
		isActive
			? cx(styles.navigation__tab, styles.navigation__tab_active)
			: styles.navigation__tab;

	const selectedValue =
		classes.find((item) => item.value === selectedClass) || null;

	const [flightDate, setFlightDate] = useState<Date | null>(new Date());
	const [startDate, setStartDate] = useState<Date | null>(new Date());
	const [endDate, setEndDate] = useState<Date | null>(new Date());

	return (
		<div className={styles.tabWrapper}>
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
				<div className={styles.filters}>
					<div>
						<p className={styles.filters__selectTitle}>
							Дата бронирования
						</p>
						<CustomDatepicker
							date={flightDate}
							setDate={setFlightDate}
						/>
					</div>
					<div>
						<p className={styles.filters__selectTitle}>
						Класс бронирования
						</p>
						<CustomSelect
							selected={selectedValue}
							options={classes}
							onChange={(e) => setSelectedClass(e)}
						/>
					</div>
				</div>
				<BarChart width={750} height={300} data={data}>
					<XAxis dataKey="date" stroke="#4082F4" />
					<YAxis />
					<Tooltip
						wrapperStyle={{ width: 100, backgroundColor: "#ccc" }}
					/>
					<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
					<Bar dataKey="value" fill="#4082F4" barSize={30} />
					<Brush dataKey="date" height={40} stroke="#4082F4" />
				</BarChart>
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
