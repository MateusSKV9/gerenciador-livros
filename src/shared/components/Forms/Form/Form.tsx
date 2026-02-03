import { SubmitButton } from "../SubmitButton/SubmitButton";
import styles from "./Form.module.css";
import type { ReactNode } from "react";

type FormProps = {
	children: ReactNode;
};

export const Form = ({ children }: FormProps) => {
	return (
		<form className={styles.form}>
			<div className={styles.body}>{children}</div>
			<SubmitButton text="Enviar" />
		</form>
	);
};
