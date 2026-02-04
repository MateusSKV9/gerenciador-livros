import type { BookType } from "../../../../types/book";
import styles from "./Select.module.css";
import type { ReactNode } from "react";

type SelectProps = {
	id: string;
	name: keyof BookType;
	label: string;
	children: ReactNode;
	value: string | number;
	onChange: (name: keyof BookType, value: string | number) => void;
};
export const Select = ({ id, name, label, value, children, onChange }: SelectProps) => {
	return (
		<div className={styles.form_controll}>
			<label className={styles.label} htmlFor={id}>
				{label}
			</label>
			<select
				onChange={(e) => onChange(name, e.target.value)}
				value={value}
				className={styles.select}
				name={name}
				id={id}
			>
				<option value="">Selecione uma categoria</option>
				{children}
			</select>
		</div>
	);
};
