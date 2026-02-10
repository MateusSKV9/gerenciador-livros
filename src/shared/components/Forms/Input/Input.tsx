import styles from "./Input.module.css";

type InputProps<T> = {
	id: string;
	name: keyof T;
	type: string;
	label: string;
	placeholder?: string;
	value: string | number;
	required?: boolean;
	onChange: (name: keyof T, value: string | number) => void;
};

export function Input<T>({ id, name, value, type, label, placeholder, required, onChange }: InputProps<T>) {
	return (
		<div className={styles.form_controll}>
			<label className={styles.label} htmlFor={id}>
				{label}
			</label>
			<input
				onChange={(e) => onChange(name, e.target.value)}
				className={styles.input}
				type={type}
				name={String(name)}
				value={value}
				id={id}
				placeholder={placeholder}
				required={required}
				maxLength={45}
			/>
		</div>
	);
}
