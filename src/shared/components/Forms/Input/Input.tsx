import styles from "./Input.module.css";

type Props = {
	id: string;
	name: string;
	type: string;
	label: string;
	placeholder?: string;
};

export const Input = ({ id, name, type, label, placeholder }: Props) => {
	return (
		<div className={styles.form_controll}>
			<label className={styles.label} htmlFor={id}>
				{label}
			</label>
			<input className={styles.input} type={type} name={name} id={id} placeholder={placeholder} />
		</div>
	);
};
