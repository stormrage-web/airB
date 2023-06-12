import React, { useState } from "react";
import styles from "./MainTab.module.scss";
import { CustomSelect } from "../../widgets/CustomSelect/CustomSelect";
import { CustomInput } from "../../widgets/CustomInput/CustomInput";
import FlightsTable from "../../widgets/FlightsTable/FlightsTable";
import { Flight } from "../../shared/mocks/flights";
import { optionsList } from "../../models/flights.interface";

interface MainTabProps {
	flights: Flight[];
}

const MainTab = ({flights}: MainTabProps) => {
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
			<FlightsTable search={searchValue} direction={selectedValue?.title || ""} flights={flights}/>
		</div>
	);
};

export default MainTab;
