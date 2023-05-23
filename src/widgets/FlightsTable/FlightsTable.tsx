import React from "react";
import styles from "./FlightsTable.module.scss";
import FlightRow from "./FlightRow/FlightRow";

const rowList = [
	{
		id: 0,
		title: "SU 0019",
		time: "11:11",
	},
	{
		id: 1,
		title: "SU 0019",
		time: "11:11",
	},
	{
		id: 2,
		title: "SU 0019",
		time: "11:11",
	},
	{
		id: 3,
		title: "SU 0019",
		time: "11:11",
	},
];

const FlightsTable = () => {
	return (
		<table className={styles.wrapper}>
			<tr className={styles.tableHead}>
				<th>Время вылета</th>
				<th>Номер рейса</th>
				<th />
			</tr>
			{rowList.map((row) => (
				<FlightRow key={row.id} id={row.id} title={row.title} time={row.time} />
			))}
		</table>
	);
};

export default FlightsTable;
