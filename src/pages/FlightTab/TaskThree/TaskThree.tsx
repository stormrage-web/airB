import React, { useState } from "react";
import styles from "./TaskThree.module.scss";
import { CustomSelect } from "../../../widgets/CustomSelect/CustomSelect";
import {
	Area,
	AreaChart,
	Brush,
	Line,
	LineChart,
	ReferenceArea,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { Option } from "../../../widgets/CustomSelect/CustomOption/CustomOption";
import { graph2 } from "../../../shared/mocks/graph2";
import CustomCheckbox from "../../../widgets/CustomCheckbox/CustomCheckbox";

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

const data = graph2;

const TaskThree = () => {
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
				<div>
					<p className={styles.filters__selectTitle}>Профили спроса</p>
					<div className={styles.filters__checkboxesWrapper}>
						<CustomCheckbox>Бизнес</CustomCheckbox>
						<CustomCheckbox>Отдых</CustomCheckbox>
						<CustomCheckbox>Профиль</CustomCheckbox>
						<CustomCheckbox>Профиль</CustomCheckbox>
					</div>
				</div>
			</div>
			<ResponsiveContainer width="100%" height={300}>
				<LineChart data={data}>
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
					<Tooltip />
					<Line
						type="monotone"
						dataKey="value"
						stroke="#4082F4"
						activeDot={{ r: 5 }}
					/>
					<Brush dataKey="date" height={40} stroke="#4082F4">
						<AreaChart data={data}>
							<Area
								type="monotone"
								dataKey="value"
								fill="#CADFF5"
								fillOpacity={1}
								strokeOpacity={0}
							/>
						</AreaChart>
					</Brush>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default TaskThree;
