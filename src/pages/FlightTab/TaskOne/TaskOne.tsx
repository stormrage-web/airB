import React, { useState } from "react";
import styles from "./TaskOne.module.scss";
import CustomDatepicker from "../../../widgets/CustomDatepicker/CustomDatepicker";
import { CustomSelect } from "../../../widgets/CustomSelect/CustomSelect";
import {
	Bar,
	BarChart,
	Brush,
	CartesianGrid,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { graph1 } from "../../../shared/mocks/graph1";
import { Option } from "../../../widgets/CustomSelect/CustomOption/CustomOption";

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

const TaskOne = () => {
	const [selectedClass, setSelectedClass] = useState<string | null>(null);
	const selectedValue =
		classes.find((item) => item.value === selectedClass) || null;

	const [flightDate, setFlightDate] = useState<Date | null>(new Date());

	return (
		<>
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
		</>
	);
};

export default TaskOne;
