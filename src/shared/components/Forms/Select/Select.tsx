import type { BookType } from "../../../../types/book";
import type { CategoryType } from "../../../../types/category";
import styles from "./Select.module.css";

type SelectProps = {
	id: string;
	name: keyof BookType;
	label: string;
	value: string | number;
	options: CategoryType[];
	onChange: (name: keyof BookType, value: string | number) => void;
};

export const Select = ({ id, name, label, value, options, onChange }: SelectProps) => {
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
				{options.map((option: CategoryType) => (
					<option key={option.id} value={option.id}>
						{option.name}
					</option>
				))}
			</select>
		</div>
	);
};
