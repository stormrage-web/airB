import React, { useState } from "react";
import styles from "./TaskTwo.module.scss";
import { CustomSelect } from "../../../widgets/CustomSelect/CustomSelect";
import { Area, AreaChart, Brush, ReferenceArea, XAxis, YAxis } from "recharts";
import { Option } from "../../../widgets/CustomSelect/CustomOption/CustomOption";
import { graph1 } from "../../../shared/mocks/graph1";

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

const data = graph1;

const TaskTwo = () => {
	const [selectedClass, setSelectedClass] = useState<string | null>(null);
	const selectedValue =
		classes.find((item) => item.value === selectedClass) || null;

	return (
		<div>
			<div className={styles.filters}>
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
			<AreaChart width={750} height={300} data={data}>
				<XAxis dataKey="date" stroke="#4082F4" />
				<YAxis dataKey="value" />
				<ReferenceArea
					x1={"07.06.2018"}
					x2={"24.07.2018"}
					y1={0}
					y2={45}
					fill="#000"
					fillOpacity={0.3}
					label="zone 1"
				/>
				<ReferenceArea
					x1={"24.07.2018"}
					x2={"24.09.2018"}
					y1={0}
					y2={30}
					fill="#421"
					fillOpacity={0.3}
					label="zone 2"
				/>

				<Area
					type="monotone"
					dataKey="value"
					stroke="#4082F4"
					fill="#4082F4"
					fillOpacity={0.5}
					activeDot={{ r: 8 }}
				/>
				<Brush dataKey="date" height={40} stroke="#4082F4" />
			</AreaChart>
		</div>
	);
};

export default TaskTwo;
