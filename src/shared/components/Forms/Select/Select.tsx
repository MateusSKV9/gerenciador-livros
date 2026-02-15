import { forwardRef, type SelectHTMLAttributes } from "react";
import type { CategoryType } from "../../../../types/category";
import styles from "./Select.module.css";

type SelectProps = {
	label: string;
	options: CategoryType[];
} & SelectHTMLAttributes<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ label, options, ...props }: SelectProps, ref) => {
	return (
		<div className={styles.form_controll}>
			<label className={styles.label} htmlFor={props.id}>
				{label}
			</label>
			<select ref={ref} className={styles.select} {...props}>
				<option value="">Selecione uma categoria</option>
				{options.map((option: CategoryType) => (
					<option key={option.id} value={option.id}>
						{option.name}
					</option>
				))}
			</select>
		</div>
	);
});

Select.displayName = "Select";
