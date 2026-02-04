import { SubmitButton } from "../SubmitButton/SubmitButton";
import styles from "./Form.module.css";
import type { ReactNode } from "react";

type FormProps = {
	children: ReactNode;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const Form = ({ children, onSubmit }: FormProps) => {
	return (
		<form onSubmit={onSubmit} className={styles.form}>
			<div className={styles.body}>{children}</div>
			<SubmitButton text="Enviar" />
		</form>
	);
};
