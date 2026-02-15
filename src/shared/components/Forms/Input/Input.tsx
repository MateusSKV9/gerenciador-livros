import { forwardRef, type InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

type InputProps = {
	label: string;
	error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, ...props }: InputProps, ref) => {
	return (
		<div className={styles.form_controll}>
			<label className={styles.label} htmlFor={props.id}>
				{label}
			</label>
			<input ref={ref} className={styles.input} {...props} />
			{error && (
				<span>
					<span className={styles.error}>*</span> {error}
				</span>
			)}
		</div>
	);
});

Input.displayName = "Input";
