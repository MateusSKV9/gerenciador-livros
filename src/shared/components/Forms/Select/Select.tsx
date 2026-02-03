import styles from "./Select.module.css";
import type { ReactNode } from "react";

type SelectProps = {
	id: string;
	name: string;
	label: string;
	children: ReactNode;
};
export const Select = ({ id, name, label, children }: SelectProps) => {
	return (
		<div className={styles.form_controll}>
			<label className={styles.label} htmlFor={id}>
				{label}
			</label>
			<select className={styles.select} name={name} id={id}>
				<option value="">Selecione uma categoria</option>
				{children}
			</select>
		</div>
	);
};
