import React from "react";
import styles from "./FlightsTable.module.scss";
import FlightRow from "./FlightRow/FlightRow";
import { flights } from "../../shared/mocks/flights";


const FlightsTable = () => {
	return (
		<table className={styles.wrapper}>
			<tr className={styles.tableHead}>
				<th>Время вылета</th>
				<th>Номер рейса</th>
				<th />
			</tr>
			{flights.map((row) => (
				<FlightRow key={row.id} id={row.id} title={row.title} time={row.time} />
			))}
		</table>
	);
};

export default FlightsTable;
