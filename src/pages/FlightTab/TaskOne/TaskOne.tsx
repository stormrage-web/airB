import React, { useState } from "react";
import styles from "./TaskOne.module.scss";
import CustomDatepicker from "../../../widgets/CustomDatepicker/CustomDatepicker";
import { CustomSelect } from "../../../widgets/CustomSelect/CustomSelect";
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	Brush,
	CartesianGrid, ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from "recharts";
import { graph1 } from "../../../shared/mocks/graph1";
import { Option } from "../../../widgets/CustomSelect/CustomOption/CustomOption";
import ToggleSwitch from "../../../widgets/ToggleSwitch/ToggleSwitch";

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

	const [isSeasonTypeActive, setIsSeasonTypeActive] = useState(true);
	const handleTypeChange = (x: boolean) => setIsSeasonTypeActive(x);

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
				<div>
					<p className={styles.filters__selectTitle}>Вид графика</p>
					<ToggleSwitch
						leftLabel={"Динамика\xa0бронирования"}
						rightLabel={"Динамика\xa0роста"}
						leftActive={isSeasonTypeActive}
						onChange={handleTypeChange}
					/>
				</div>
			</div>
			<ResponsiveContainer width="100%" height={300}>
				<BarChart data={data}>
					<XAxis dataKey="date" stroke="#4082F4" />
					<YAxis />
					<Tooltip
						wrapperStyle={{ width: 100, backgroundColor: "#ccc" }}
					/>
					<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
					<Bar dataKey="value" fill="#4082F4" barSize={30} />
					<Brush dataKey="date" height={40}>
						<AreaChart data={data}>
							<Area
								type="monotone"
								dataKey="value"
								fill="#CADFF5"
								fillOpacity={1}
								strokeOpacity={0}
								activeDot={{ r: 8 }}
							/>
						</AreaChart>
					</Brush>
				</BarChart>
			</ResponsiveContainer>
		</>
	);
};

export default TaskOne;
