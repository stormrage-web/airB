import React, { useEffect, useState } from "react";
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
import { useTabsLogic } from "../../../hooks/useFlight.logic";
import { useAppSelector } from "../../../hooks/redux";
import { TabThreeItem } from "../../../models/flights.interface";

interface TaskThreeProps {
	classes: Option[];
	flight: string;
}

const TaskThree = ({ classes, flight }: TaskThreeProps) => {
	const { fetchFlightHandler } = useTabsLogic();
	const { tabInfo, tabParams } = useAppSelector(
		(state) => state.flightReducer,
	);
	const [graph, setGraph] = useState<any[]>();
	const [maxTitle, setMaxTitle] = useState({title: "отдых", value: 0});

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

	useEffect(() => {
		const result: any[] = [];
		((tabInfo as TabThreeItem[])?.length ? (tabInfo as TabThreeItem[]) || [] : []).forEach((profile) => {
			(profile.data || []).forEach((item) => {
				const buf = result.findIndex(
					(resultItem) => resultItem.x === item.x,
				);
				if (buf !== -1) {
					result[buf][profile.title] = item.y;
					if (item.y >= maxTitle.value) {
						setMaxTitle({title: profile.title, value: item.y});
					}
				} else {
					const obj = { x: item.x };
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					obj[profile.title] = item.y;
					if (item.y >= maxTitle.value) {
						setMaxTitle({title: profile.title, value: item.y});
					}
					result.push(obj);
				}
			});
		});
		setGraph(result);
	}, [tabInfo]);

	const handleChangeClass = (x: string) => {
		fetchFlightHandler({
			tab: 3,
			data: {
				flight: flight,
				tabParams: {
					profiles: tabParams.profiles,
					class: x,
				},
			},
		});
	};

	const handleChangeProfile = (n: number) => (x: boolean) => {
		const profiles = [...(tabParams.profiles || [])];
		profiles[n] = x;
		fetchFlightHandler({
			tab: 3,
			data: {
				flight: flight,
				tabParams: {
					profiles: profiles,
					class: tabParams.class,
				},
			},
		});
	};

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
						<CustomCheckbox
							active={(tabParams?.profiles || [])[0]}
							setActive={handleChangeProfile(0)}
							color={"#E38048"}
						>
							Отдых
						</CustomCheckbox>
						<CustomCheckbox
							active={(tabParams?.profiles || [])[1]}
							setActive={handleChangeProfile(1)}
							color={"#4082F4"}
						>
							Бизнес/командировки
						</CustomCheckbox>
						<CustomCheckbox
							active={(tabParams?.profiles || [])[2]}
							setActive={handleChangeProfile(2)}
							color={"#E3485B"}
						>
							Спонтанное
						</CustomCheckbox>
						<CustomCheckbox
							active={(tabParams?.profiles || [])[3]}
							setActive={handleChangeProfile(3)}
							color={"#33B15E"}
						>
							Заранее&nbsp;запланированное
						</CustomCheckbox>
					</div>
				</div>
			</div>
			{!(graph || []).length ? (
				<div className={styles.noData}>
					Нет данных для рейса с заданными параметрами
				</div>
			) : (
				<ResponsiveContainer width="100%" height={300}>
					<LineChart data={graph}>
						<XAxis dataKey="date" stroke="#4082F4" />
						<YAxis dataKey={maxTitle.title} max={maxTitle.value} />
						<Tooltip />
						<Line
							type="monotone"
							dataKey={"отдых"}
							stroke="#E38048"
							activeDot={{ r: 5 }}
							dot={{r: 0}}
							isAnimationActive={false}
						/>
						<Line
							type="monotone"
							dataKey={"бизнес/командировки"}
							stroke="#4082F4"
							activeDot={{ r: 5 }}
							dot={{r: 0}}
							isAnimationActive={false}
						/>
						<Line
							type="monotone"
							dataKey={"спонтанное"}
							stroke="#E3485B"
							activeDot={{ r: 5 }}
							dot={{r: 0}}
							isAnimationActive={false}
						/>
						<Line
							type="monotone"
							dataKey={"заранее запланированное"}
							stroke="#33B15E"
							activeDot={{ r: 5 }}
							dot={{r: 0}}
							isAnimationActive={false}
						/>
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
