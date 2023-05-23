import React, { useState } from "react";
import styles from "./FlightTab.module.scss";
import cx from "classnames";
import { NavLink } from "react-router-dom";
import { CustomSelect } from "../../widgets/CustomSelect/CustomSelect";
import { Option } from "../../widgets/CustomSelect/CustomOption/CustomOption";

const classes: Option[] = [
	{
		value: "0",
		title: "Эконом",
	},
	{
		value: "1",
		title: "Бизнес",
	}
];

const FlightTab = () => {
	const [selectedClass, setSelectedClass] = useState<string | null>(null);
	const tabStyles = ({ isActive }: { isActive: boolean }) =>
		isActive
			? cx(styles.navigation__tab, styles.navigation__tab_active)
			: styles.navigation__tab;

	const selectedValue =
		classes.find((item) => item.value === selectedClass) || null;

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
					<h2 className={styles.header__destination}>Москва - Сочи</h2>
				</div>
				<div className={styles.filters}>
					<p className={styles.filters__selectTitle}>Класс бронирования</p>
					<CustomSelect selected={selectedValue} options={classes} onChange={(e) => setSelectedClass(e)}/>
				</div>
			</div>
		</div>
	);
};

export default FlightTab;
