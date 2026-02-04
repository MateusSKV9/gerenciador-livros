import type { BookType } from "../../../../types/book";
import styles from "./Input.module.css";

type Props = {
	id: string;
	name: keyof BookType;
	type: string;
	label: string;
	placeholder?: string;
	value: string | number;
	onChange: (name: keyof BookType, value: string | number) => void;
};

export const Input = ({ id, name, value, type, label, placeholder, onChange }: Props) => {
	return (
		<div className={styles.form_controll}>
			<label className={styles.label} htmlFor={id}>
				{label}
			</label>
			<input
				onChange={(e) => onChange(name, e.target.value)}
				className={styles.input}
				type={type}
				name={name}
				value={value}
				id={id}
				placeholder={placeholder}
			/>
		</div>
	);
};
