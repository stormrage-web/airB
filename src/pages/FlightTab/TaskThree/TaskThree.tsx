import React, { useEffect } from "react";
import styles from "./TaskThree.module.scss";
import { CustomSelect } from "../../../widgets/CustomSelect/CustomSelect";
import {
	Area,
	AreaChart,
	Brush,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { Option } from "../../../widgets/CustomSelect/CustomOption/CustomOption";
import CustomCheckbox from "../../../widgets/CustomCheckbox/CustomCheckbox";
import { useTaskThreeLogic } from "./TaskThree.logic";
import Skeleton from "react-loading-skeleton";

interface TaskThreeProps {
	classes: Option[];
	flight: string;
}

const profileParams = [
	{
		label: "Отдых",
		dataKey: "отдых",
		color: "#E38048",
	},
	{
		label: "Бизнес/командировки",
		dataKey: "бизнес/командировки",
		color: "#4082F4",
	},
	{
		label: "Спонтанное",
		dataKey: "спонтанное",
		color: "#E3485B",
	},
	{
		label: "Заранее \u00A0 запланированное",
		dataKey: "заранее запланированное",
		color: "#33B15E",
	},
];

const TaskThree = ({ classes, flight }: TaskThreeProps) => {
	const {
		tabParams,
		handleChangeClass,
		handleChangeProfile,
		maxTitle,
		graph,
		fetchFlightHandler,
	} = useTaskThreeLogic({ flight });

	useEffect(() => {
		fetchFlightHandler({
			tab: 3,
			data: {
				flight: flight,
				tabParams: {
					class: classes[0].title,
					date: undefined,
					type: undefined,
					profiles: [false, false, false, false],
				},
			},
		});
	}, []);

	return (
		<div>
			<div className={styles.filters}>
				<div>
					<p className={styles.filters__selectTitle}>
						Класс бронирования
					</p>
					<CustomSelect
						selected={
							classes.find(
								(item) => item.title === tabParams.class,
							) || null
						}
						options={classes}
						onChange={(e) =>
							handleChangeClass(
								classes.find((item) => item.value === e)
									?.title || "",
							)
						}
					/>
				</div>
				<div>
					<p className={styles.filters__selectTitle}>
						Профили спроса
					</p>
					<div className={styles.filters__checkboxesWrapper}>
						{profileParams.map((checkbox, index) => (
							<CustomCheckbox
								key={checkbox.label}
								active={(tabParams?.profiles || [])[index]}
								setActive={handleChangeProfile(index)}
								color={checkbox.color}
							>
								{checkbox.label}
							</CustomCheckbox>
						))}
					</div>
				</div>
			</div>
			{!(graph || []).length ? (
				<div className={styles.noData}>
					<Skeleton height="100%" enableAnimation />
				</div>
			) : (
				<ResponsiveContainer width="100%" height={400}>
					<LineChart data={graph}>
						<XAxis dataKey="date" stroke="#4082F4" />
						<YAxis dataKey={maxTitle.title} max={maxTitle.value} />
						<Tooltip />
						{profileParams.map((profile, index) => (
							<Line
								key={profile.dataKey}
								type="monotone"
								dataKey={tabParams?.profiles && tabParams?.profiles[index] ? profile.dataKey : undefined}
								stroke={profile.color}
								activeDot={{ r: 5 }}
								dot={{ r: 0 }}
								isAnimationActive={false}
							/>
						))}
						<Brush dataKey="date" height={40} stroke="#4082F4">
							<AreaChart data={graph}>
								<Area
									type="monotone"
									dataKey="отдых"
									fill="#CADFF5"
									fillOpacity={1}
									strokeOpacity={0}
								/>
							</AreaChart>
						</Brush>
					</LineChart>
				</ResponsiveContainer>
			)}
		</div>
	);
};

export default TaskThree;
