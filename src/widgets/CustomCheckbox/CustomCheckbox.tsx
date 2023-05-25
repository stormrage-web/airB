import React, { useState } from "react";
import styles from "./CustomCheckbox.module.scss";

const CustomCheckbox: React.FC<{ children: string }> = ({ children }) => {
	const [active, setActive] = useState(false);

	return (
		<div onClick={() => setActive(!active)} className={styles.wrapper}>
			<input
				checked={active}
				type="checkbox"
				className={styles.customCheckbox}
			/>
			<label className={styles.label}>{children}</label>
		</div>
	);
};

export default CustomCheckbox;
