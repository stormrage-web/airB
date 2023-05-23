import React, { useState } from "react";
import styles from "./MainTab.module.scss";
import { CustomSelect } from "../../widgets/CustomSelect/CustomSelect";
import { Option } from "../../widgets/CustomSelect/CustomOption/CustomOption";
import { CustomInput } from "../../widgets/CustomInput/CustomInput";
import FlightsTable from "../../widgets/FlightsTable/FlightsTable";

const optionsList: Option[] = [
	{
		value: "0",
		title: "Москва – Сочи",
	},
	{
		value: "1",
		title: "Сочи – Москва",
	},
	{
		value: "3",
		title: "Москва – Астрахань",
	},
	{
		value: "4",
		title: "Астрахань – Москва",
	},
];

const MainTab = () => {
	const [selectValue, setSelectedValue] = useState("");
	const [searchValue, setSearchValue] = useState("");
	const handleValueSelect = (value: string) => setSelectedValue(value);

	const selectedValue =
		optionsList.find((item) => item.value === selectValue) || null;

	return (
		<div className={styles.wrapper}>
			<div className={styles.filters}>
				<CustomSelect
					selected={selectedValue}
					options={optionsList}
					onChange={handleValueSelect}
					placeholder="Не выбрано"
				/>
				<CustomInput value={searchValue} onChange={setSearchValue} placeholder="Поиск по рейсу"/>
			</div>
			<FlightsTable/>
		</div>
	);
};

export default MainTab;
