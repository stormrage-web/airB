import React, { useState } from "react";
import cx from "classnames";
import "./App.scss";
import { CustomSelect } from "./widgets/CustomSelect/CustomSelect";
import { Option } from "./widgets/CustomSelect/CustomOption/CustomOption";
import CustomCheckbox from "./widgets/CustomCheckbox/CustomCheckbox";

const optionsList: Option[] = [
	{
		value: "0",
		title: "option 0",
	},
	{
		value: "1",
		title: "option 1",
	},
	{
		value: "2",
		title: "option 2",
	},
];

function App() {
	const [selectValue, setSelectedValue] = useState("");
	const handleValueSelect = (value: string) => setSelectedValue(value);

	const selectedValue = optionsList.find((item) => item.value === selectValue) || null;

	return (
		<div className={cx()}>
			<CustomSelect selected={selectedValue} options={optionsList} onChange={handleValueSelect}/>
			<CustomCheckbox>asd</CustomCheckbox>
		</div>
	);
}

export default App;
