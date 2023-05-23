import React, { useState } from "react";
import styles from "./FlightTab.module.scss";
import cx from "classnames";
import { NavLink } from "react-router-dom";
import { CustomSelect } from "../../widgets/CustomSelect/CustomSelect";
import { Option } from "../../widgets/CustomSelect/CustomOption/CustomOption";
import { BarChart, Tooltip, YAxis, XAxis, CartesianGrid, Bar } from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const data = [
	{ name: "10.01.2019", count: 400 },
	{ name: "11.01.2019", count: 500 },
	{ name: "12.01.2019", count: 600 },
	{ name: "13.01.2019", count: 400 },
];

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

	const [startDate, setStartDate] = useState<Date | null>(new Date());
	const [endDate, setEndDate] = useState<Date | null>(new Date());
	const ReactDatePickerInput = React.forwardRef<
		HTMLInputElement,
		React.DetailedHTMLProps<
			React.InputHTMLAttributes<HTMLInputElement>,
			HTMLInputElement
		>
	>((props, ref) => <input ref={ref} {...props} />);

	ReactDatePickerInput.displayName = "ReactDatePickerInput";

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
					<p className={styles.filters__selectTitle}>
						Класс бронирования
					</p>
					<CustomSelect
						selected={selectedValue}
						options={classes}
						onChange={(e) => setSelectedClass(e)}
					/>
				</div>
				<BarChart width={600} height={300} data={data}>
					<XAxis dataKey="name" stroke="#8884d8" />
					<YAxis />
					<Tooltip
						wrapperStyle={{ width: 100, backgroundColor: "#ccc" }}
					/>
					<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
					<Bar dataKey="count" fill="#8884d8" barSize={30} />
				</BarChart>
				<div className={styles.dates}>
					<DatePicker
						selected={startDate}
						customInput={<ReactDatePickerInput className={styles.dates__input} />}
						onChange={(date: Date | null) => setStartDate(date)}
						wrapperClassName={styles.dates__item}
					/>
					<DatePicker
						selected={endDate}
						customInput={<ReactDatePickerInput className={styles.dates__input} />}
						onChange={(date: Date | null) => setEndDate(date)}
						wrapperClassName={styles.dates__item}
					/>
				</div>
			</div>
		</div>
	);
};

export default FlightTab;
